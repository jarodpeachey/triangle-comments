import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { shortenText } from '../utils/shortenText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const KeyTable = ({ data }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [dataToShow, setDataToShow] = useState(data);

  const onCheck = (key, e) => {
    if (e.target.checked) {
      const newKeys = selectedKeys;
      newKeys.push(key);

      console.log(newKeys);
      setSelectedKeys(newKeys);
    } else if (selectedKeys.length > 0) {
      const newKeys = selectedKeys.filter((newKey) => newKey !== key);
      console.log(newKeys);
      setSelectedKeys(newKeys);
    }
  };

  const checkAll = (e) => {
    const allCheckboxes = document.querySelectorAll('.checkbox');
    const newKeys = [];

    if (e.target.checked) {
      console.log(allCheckboxes);
      allCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
        newKeys.push(checkbox.getAttribute('dataKey'));
      });
    } else {
      allCheckboxes.forEach((checkbox) => {
        checkbox.removeAttribute('checked');
        checkbox.checked = false;
      });
    }

    setSelectedKeys(newKeys);
  };

  console.log(selectedKeys);

  return (
    <span>
      {data && data.length ? (
        <Table>
          <TableHead>
            <HeaderColumn>
              <Checkbox>
                <input type='checkbox' onChange={checkAll} />
                <span className='checkmark'>
                  <div className='icon'>
                    <FontAwesomeIcon icon='check' />
                  </div>
                </span>
              </Checkbox>
            </HeaderColumn>
            <HeaderColumn className='second-child'>Key</HeaderColumn>
            <HeaderColumn className='second-child'>
              <Select>
                <option>User Keys</option>
                <option>Site Keys</option>
                <option>All Keys</option>
              </Select>
            </HeaderColumn>
            <HeaderColumn className='second-child'>Site</HeaderColumn>
          </TableHead>
          <TableBody>
            {data.map((key) => {
              return (
                <TableRow>
                  <BodyColumn>
                    <Checkbox>
                      <input
                        className='checkbox'
                        onChange={(e) => onCheck(key.key, e)}
                        type='checkbox'
                        dataKey={key.key}
                      />
                      <span className='checkmark'>
                        <div className='icon'>
                          <FontAwesomeIcon icon='check' />
                        </div>
                      </span>
                    </Checkbox>
                  </BodyColumn>
                  <BodyColumn className='second-child'>
                    {shortenText(key.key, 200)}
                  </BodyColumn>
                  <BodyColumn>{key.type}</BodyColumn>
                  <BodyColumn fullWidth>{key.site}</BodyColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <Card>No data.</Card>
      )}
    </span>
  );
};

const Select = styled.select`
  border: none;
  outline: none;
`;

const Checkbox = styled.div`
  display: block;
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
  input {
    position: absolute;
    opacity: 0;
    left: 0;
    cursor: pointer;
    z-index: 999;
    margin: 0;
    height: 100%;
    width: 100%;
  }
  .checkmark {
    height: 100%;
    width: 100%;
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
  border-spacing: 0px;
  margin-bottom: 36px;
`;
const TableHead = styled.thead`
  width: 100%;
  font-weight: 400 !important;
`;
const TableBody = styled.tbody``;
const TableRow = styled.tr`
  :nth-child(odd) {
    background: ${(props) => props.theme.color.primary.main}05;
  }
`;
const HeaderColumn = styled.th`
  padding: 12px 36px 12px 0px;
  width: fit-content;
  font-weight: 500;
  * {
    font-weight: 500 !important;
  }
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.four};
  text-align: right;
  margin: 0;
  &.second-child {
    padding-left: 12px;
    text-align: left;
  }
  :first-child {
    padding: 12px;
  }
  :last-child {
    padding-right: 12px;
  }
`;
const BodyColumn = styled.td`
  padding: 12px 36px 12px 0px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.four};
  text-align: right;
  &.second-child {
    padding-left: 12px;
    text-align: left;
  }
  :first-child {
    padding: 12px;
  }
  :last-child {
    padding-right: 12px;
  }
  width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
`;

export default KeyTable;
