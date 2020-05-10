import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { shortenText } from '../utils/shortenText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const KeyTable = ({ data }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [dataToShow, setDataToShow] = useState(data);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (data.length !== dataToShow.length) {
      setDataToShow(data);
    }
  }, [data]);

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

  const onSelectChange = (e) => {
    setSelectedType(e.target.value);

    if (e.target.value === 'user') {
      const newKeys = [...data];
      console.log(newKeys);
      setDataToShow(
        newKeys.filter((value) => value.type.toLowerCase() === e.target.value)
      );
    }

    if (e.target.value === 'all') {
      console.log(data);
      setDataToShow(data);
    } else {
      const newKeys = [...data];
      console.log(newKeys);
      setDataToShow(
        newKeys.filter((value) => value.type.toLowerCase() === e.target.value)
      );
    }
  };

  console.log(selectedKeys);

  return (
    <span>
      <Table>
        <TableHead>
          <HeaderColumn className='hide-on-mobile'>
            <Checkbox>
              <input type='checkbox' onChange={checkAll} />
              <span className='checkmark'>
                <div className='icon'>
                  <FontAwesomeIcon icon='check' />
                </div>
              </span>
            </Checkbox>
          </HeaderColumn>
          <HeaderColumn className='second-child hide-on-mobile'>
            Key
          </HeaderColumn>
          <HeaderColumn>
            <Select value={selectedType} onChange={onSelectChange}>
              <option value='user'>User Keys</option>
              <option value='site'>Site Keys</option>
              <option value='all'>All Keys</option>
            </Select>
          </HeaderColumn>
          <HeaderColumn className='hide-on-mobile'>Site</HeaderColumn>
        </TableHead>
        <TableBody>
          {dataToShow && dataToShow.length > 0 ? (
            <>
              {dataToShow.map((key) => {
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
                      <div className='label'>Key</div>
                      {shortenText(key.key, 35)}
                    </BodyColumn>
                    <BodyColumn>
                      <div className='label'>Type</div>
                      {key.type}
                    </BodyColumn>
                    <BodyColumn fullWidth>
                      <div className='label'>Site</div>
                      {key.site || 'None'}
                    </BodyColumn>
                  </TableRow>
                );
              })}
            </>
          ) : (
            <Card>No data.</Card>
          )}
        </TableBody>
      </Table>
    </span>
  );
};

const Select = styled.select`
  border: none;
  outline: none;
  cursor: pointer;
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
  @media (max-width: 769px) {
    display: block;
    width: 100%;
  }
`;
const TableHead = styled.thead`
  width: 100%;
  font-weight: 400 !important;
`;
const TableBody = styled.tbody`
  @media (max-width: 769px) {
    display: block;
    width: 100%;
  }
`;
const TableRow = styled.tr`
  :nth-child(odd) {
    background: ${(props) => props.theme.color.primary.main}05;
  }
  @media (max-width: 769px) {
    margin: 12px 0;
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.color.gray.five};
    padding: 12px;
    display: block !important;
    width: 100% !important;
    max-width: 999px !important;
    margin: 12px auto;
    :nth-child(odd) {
      background: white !important;
    }
  }
`;
const HeaderColumn = styled.th`
  padding: 12px 26px 12px 0px;
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
  @media (max-width: 769px) {
    display: inline-block;
    border-bottom: 0;
    margin: 12px auto;
    :nth-child(odd) {
      background: white !important;
    }
    &.hide-on-mobile {
      display: none;
    }
  }
`;
const BodyColumn = styled.td`
  padding: 12px 26px 12px 0px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.four};
  text-align: right;
  overflow-x: auto;
  word-wrap: none;
  white-space: nowrap;
  &.second-child {
    padding-left: 12px;
    text-align: left;
    margin-right: 36px;
  }
  :first-child {
    padding: 12px;
  }
  :last-child {
    padding-right: 12px;
  }
  .label {
    display: none;
  }
  @media (max-width: 769px) {
    display: block;
    width: 100%;
    margin: 0;
    background: white !important;
    text-align: left;
    border-bottom: none;
    padding: 6px 12px;
    .label {
      display: block;
      font-weight: 600;
    }
    :first-child {
      display: none;
    }
  }
  width: ${(props) => (props.fullWidth ? '50%' : 'fit-content')};
`;

export default KeyTable;
