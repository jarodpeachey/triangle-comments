/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-fragments */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
} from 'react-table';
import matchSorter from 'match-sorter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Create an editable cell renderer
const DefaultCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // if (!editable) {
  return `${initialValue}`;
  // }

  // return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  editable,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!editable) {
    return `${initialValue}`;
  }

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  const [showFilter, setShowFilter] = useState(true);

  if (showFilter) {
    return (
      <>
        <Input
          style={{
            width: 70,
          }}
          value={filterValue || ''}
          onChange={(e) => {
            setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          placeholder={`Filter ${count} results...`}
        />
        {/* <FontAwesomeIcon onClick={() => setShowFilter(false)} icon='cog' /> */}
      </>
    );
  }

  // return <FontAwesomeIcon onClick={() => setShowFilter(true)} icon='search' />;
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <SelectWrapper>
      <Select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value=''>All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type='range'
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </>
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <span
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type='number'
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </span>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Be sure to pass our updateMyData and the skipReset option
function CommentsTable({ columns, data, updateMyData, skipReset }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      Cell: DefaultCell,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex,
      pageSize,
      sortBy,
      groupBy,
      expanded,
      filters,
      selectedRowIds,
    },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // We also need to pass this so the page doesn't change
      // when we edit the data.
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <span>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </span>
            ),
            // The cell can use the inspanidual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <span>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </span>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map((headerGroup) => (
            <TR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TH {...column.getHeaderProps()}>
                  <span>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {/* {column.isGrouped ? '🛑 ' : '👊 '} */}
                      </span>
                    ) : null}
                    <span {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </span>
                  {/* Render the columns filter UI */}
                  <span>
                    {column.canFilter ? column.render('Filter') : null}
                  </span>
                </TH>
              ))}
            </TR>
          ))}
        </THead>
        <TBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TR {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TD {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell', { editable: false })} (
                          {row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell', { editable: true })
                      )}
                    </TD>
                  );
                })}
              </TR>
            );
          })}
        </TBody>
      </Table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <span className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </span>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
              sortBy,
              groupBy,
              expanded,
              filters,
              selectedRowIds,
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== 'number';

// This is a custom aggregator that
// takes in an array of leaf values and
// returns the rounded median
function roundedMedian(leafValues) {
  let min = leafValues[0] || 0;
  let max = leafValues[0] || 0;

  leafValues.forEach((value) => {
    min = Math.min(min, value);
    max = Math.max(max, value);
  });

  return Math.round((min + max) / 2);
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox>
          <input
            ref={resolvedRef}
            {...rest}
            className='checkbox'
            type='checkbox'
          />
          <span className='checkmark'>
            <div className='icon'>
              <FontAwesomeIcon icon='check' />
            </div>
          </span>
        </Checkbox>
      </>
    );
  }
);

const Select = styled.select`
  border: none;
  outline: none;
  font-weight: normal !important;
  cursor: pointer;
  border-radius: 50px;
  position: relative;
  padding: 2px 8px;
  background: ${(props) => props.theme.color.primary.backgroundDark};
  // -webkit-appearance: none;
  color: ${(props) => props.theme.color.primary.backgroundDark};
  font-size: 16px;
  line-height: 1;
  border: 0;
  width: auto;
  border-radius: 5px;
  height: 26px;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right ${(props) => props.theme.color.gray.three};
  -webkit-appearance: none;
  background-size: 12px;
  background-position-x: 90%;
  margin-top: 4px;
`;

const SelectWrapper = styled.span`
  position: relative;
  display: block;
  margin-left: auto;
  width: fit-content;
  // ::after {
  //   display: block;
  //   position: absolute;
  //   content: '';
  //   right: 9px;
  //   top: calc(50% - 2px);
  //   border: 4px solid transparent;
  //   border-top: 4px solid white;
  // }
`;

const Input = styled.input`
  border: none;
  outline: none;
  display: block;
  font-weight: normal !important;
  border-radius: 50px;
  position: relative;
  padding: 2px 8px;
  background: ${(props) => props.theme.color.gray.three};
  // -webkit-appearance: none;
  color: ${(props) => props.theme.color.primary.backgroundDark} !important;
  font-size: 16px;
  line-height: 1;
  border: 0;
  width: 100% !important;
  border-radius: 5px;
  height: 26px;
  margin-left: auto;
  // background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
  //   no-repeat right ${(props) => props.theme.color.gray.three};
  // -webkit-appearance: none;
  // background-size: 12px;
  // background-position-x: 90%;
  margin-top: 4px;
`;

const Checkbox = styled.div`
  display: block;
  position: relative;
  width: 19px;
  height: 19px;
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    left: 0;
    cursor: pointer;
    z-index: 999;
    margin: 0;
    height: 19px;
    width: 19px;
  }
  .checkmark {
    height: 19px;
    width: 19px;
    background-color: #eee;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #ffffff;
    transition: .1s ease-out;
  }
  input:checked ~ .checkmark {
    background: ${(props) => props.theme.color.primary.backgroundDark};
  }
  .icon {
    display: none;
  }
  // input:checked ~ .icon {
  //   display: block;
  // }
  input:checked ~ .checkmark > .icon {
    font-size: 11px;
    color: white;
    // color: ${(props) => props.theme.color.primary.main};
    top: .07em;
    position: relative;
    display: block;
    transition: .1s ease-out;
  }
`;

const Table = styled.table`
  // width: 100%;
  // margin: 0;
  table-layout: fixed;
  // display: table;
  border-spacing: 0px;
  margin-bottom: 24px;
`;

const THead = styled.thead`
  margin: 0;
`;

const TBody = styled.tbody`
  margin: 0;
`;

const TR = styled.tr`
  border-radius: 5px;
  // margin: 8px 0;
  width: 100%;
`;

const TH = styled.th`
  // border-top: 1px solid #e8e8e8 !important;
  border-bottom: 1px solid #e8e8e8 !important;
  span {
    font-weight: 600 !important;
  }
  padding: 4px 24px 4px 0;
  font-weight: 800 !important;
  text-align: left;
  margin: 0;
  width: fit-content;

  :first-child {
    text-align: center;
    padding: 12px;
    width: fit-content;
  }
  :nth-child(2) {
    text-align: left;
    padding-left: 12px;
  }
  :nth-child(3) {
    min-width: 15% !important;
    width: 70% !important;
    max-width: 250px !important;
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: pre-wrap; /* css-3 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
    word-break: break-all;
    white-space: normal;
  }
  :nth-child(4) {
    width: 70%;
  }
  :last-child {
    text-align: right;
    // width: auto;
    // min-width: 50%;
    // width: fit-content;
    // flex: 1 1 0;
    width: 100%;
    padding-right: 0;
  }
  width: 1px;
  white-space: nowrap;
`;

const TD = styled.td`
  // border-top: 1px solid #e8e8e8 !important;
  border-bottom: 1px solid #e8e8e8 !important;
  font-weight: 400;
  padding: 4px 24px 4px 0;
  font-weight: 500;
  text-align: left;
  margin: 0;
  // width: 100%;
  width: fit-content;
  :first-child {
    text-align: center;
    padding: 12px;
    width: fit-content;
  }
  :nth-child(2) {
    text-align: left;
    padding-left: 12px;
  }
  :nth-child(3) {
    min-width: 15% !important;
    width: 70% !important;
    max-width: 250px !important;
    white-space: -moz-pre-wrap !important; /* Mozilla, since 1999 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: pre-wrap; /* css-3 */
    word-wrap: break-word; /* Internet Explorer 5.5+ */
    white-space: -webkit-pre-wrap; /* Newer versions of Chrome/Safari*/
    word-break: break-all;
    white-space: normal;
  }
  :nth-child(4) {
    width: 70%;
  }
  :last-child {
    text-align: right;
    // width: auto;
    // min-width: 50%;
    // width: fit-content;
    // flex: 1 1 0;
    width: 100%;
    padding-right: 0;
  }
  width: 1px;
  white-space: nowrap;
`;

export default CommentsTable;
