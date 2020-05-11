import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Card';
import { shortenText } from '../utils/shortenText';

const KeyTable = ({ data, animate, animateItems, showItems, loading }) => {
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
      <Card
        style={{
          display: `${!loading && dataToShow.length === 0 ? 'block' : 'none'}`,
        }}
        customStyles={`
          margin-bottom: 16px;
          display: ${!loading && dataToShow.length === 0 ? 'block' : 'none'};
        `}
      >
        No API Keys
      </Card>
      <Table
        style={{
          display: `${
            !loading && dataToShow.length === 0
              ? 'none'
              : window.innerWidth > 769
              ? 'table'
              : 'block'
          }`,
        }}
      >
        <TableHead skeleton={loading}>
          <HeaderColumn fullWidth skeleton={loading} className='hide-on-mobile'>
            <Checkbox>
              <input type='checkbox' onChange={checkAll} />
              <span className='checkmark'>
                <div className='icon'>
                  <FontAwesomeIcon icon='check' />
                </div>
              </span>
            </Checkbox>
          </HeaderColumn>
          <HeaderColumn
            skeleton={loading}
            className='second-child hide-on-mobile'
          >
            <span>Key</span>
          </HeaderColumn>
        </TableHead>
        <TableBody>
          {loading && (
            <>
              <TableRow skeleton animate={animate}>
                <BodyColumn skeleton>
                  <Checkbox>
                    <input className='checkbox' />
                    <span className='checkmark'>
                      <div className='icon'>
                        <FontAwesomeIcon icon='check' />
                      </div>
                    </span>
                  </Checkbox>
                </BodyColumn>
                <BodyColumn skeleton className='second-child'>
                  <div className='label'>Key</div>
                  <span>
                    {shortenText(
                      'jsdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                      35
                    )}
                  </span>
                </BodyColumn>
              </TableRow>
              <TableRow skeleton animate={animate}>
                <BodyColumn skeleton>
                  <Checkbox>
                    <input className='checkbox' />
                    <span className='checkmark'>
                      <div className='icon'>
                        <FontAwesomeIcon icon='check' />
                      </div>
                    </span>
                  </Checkbox>
                </BodyColumn>
                <BodyColumn skeleton className='second-child'>
                  <div className='label'>Key</div>
                  <span>
                    {shortenText(
                      'jsdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
                      35
                    )}
                  </span>
                </BodyColumn>
              </TableRow>
            </>
          )}
          {showItems && (
            <>
              {dataToShow && dataToShow.length > 0 ? (
                <>
                  {dataToShow.map((key) => {
                    return (
                      <TableRow
                        animateItems={animateItems}
                        style={{
                          transform: `scale(${
                            animateItems ? 1 : loading ? 0 : 1
                          })`,
                          transition: `transform .2s ease-out`,
                          position: animateItems ? 'absolute' : 'static',
                        }}
                      >
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
                          {shortenText(key.key, 100)}
                        </BodyColumn>
                      </TableRow>
                    );
                  })}
                </>
              ) : null}
            </>
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

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Table = styled.table`
  border-spacing: 0px;
  margin-bottom: 36px;
  position: relative;
  overflow: hidden;
  @media (max-width: 769px) {
    display: block;
    width: 100%;
    margin-bottom: 22px;
  }
`;
const TableHead = styled.thead`
  width: 100%;
  font-weight: 400 !important;
  ${(props) =>
    props.skeleton &&
    css`
      overflow: hidden;
      // transform: scale(${props.animate ? 0 : 1});
      opacity: ${props.animate ? 0 : 1};
      // transition: all 0.2s ease-in;
      ::after {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        left: 0 !important;
        height: 100% !important;
        bottom: 0 !important;
        transform: translateX(-100%) !important;
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.5) 30%,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.5) 70%,
          rgba(255, 255, 255, 0) 100%
        ) !important;
        animation: ${shimmer} 2s infinite !important;
      }
    `};
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
    overflow: hidden;
    margin: 12px auto;
    :nth-child(odd) {
      background: white !important;
    }
  }
  ${(props) =>
    props.skeleton &&
    css`
      background: white !important;
      overflow: hidden;
      // transform: scale(${props.animate ? 0 : 1});
      opacity: ${props.animate ? 0 : 1};
      // transition: all 0.2s ease-in;
      ::after {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        left: 0 !important;
        height: 100% !important;
        bottom: 0 !important;
        transform: translateX(-100%) !important;
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.5) 30%,
          rgba(255, 255, 255, 0) 50%,
          rgba(255, 255, 255, 0.5) 70%,
          rgba(255, 255, 255, 0) 100%
        ) !important;
        animation: ${shimmer} 2s infinite !important;
      }
    `};
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
    width: 100%;
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
    margin: 0 auto;
    display: inline-block;
    border-bottom: 0;
    margin: 0 auto;
    padding: 4px 14px !important;
    border-radius: 50px !important;
    * {
      background: transparent;
      color: ${(props) => props.theme.color.primary.backgroundDark} !important;
    }
    background: ${(props) => props.theme.color.gray.three} !important;
    &.hide-on-mobile {
      display: none;
    }
  }
  ${(props) =>
    props.skeleton &&
    css`
      span,
      span * {
        height: 24px !important;
        margin: 0 0;
        width: fit-content !important;
        text-align: inherit !important;
        border-radius: 5px !important;
        background: ${props.theme.color.gray.four} !important;
        display: block !important;
        color: transparent;
        overflow: hidden !important;
        position: relative !important;
        min-width: 50px !important;
      }
      :last-child span {
        margin: 0 0 0 auto !important;
      }
      :first-child span {
        width: 0px !important;
        opacity: 0 !important;
        min-width: 0px !important;
      }
    `};
`;
const BodyColumn = styled.td`
  padding: 12px 26px 12px 0px;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.four};
  text-align: right;
  overflow: hidden
  word-wrap: break-word;
  width: ${(props) => (props.fullWidth ? '100% !important' : null)};
  // white-space: nowrap;
  &.second-child {
    padding-left: 12px;
    text-align: left;
    margin-right: 36px;
    width: 100%;
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
  ${(props) =>
    props.skeleton &&
    css`
      span {
        height: 18px !important;
        margin: 6px 0;
        width: fit-content !important;
        text-align: inherit !important;
        border-radius: 5px !important;
        background: ${props.theme.color.gray.four} !important;
        display: block !important;
        color: transparent;
        overflow: hidden !important;
        position: relative !important;
        min-width: 50px !important;
      }
      :last-child span {
        margin: 0 0 0 auto !important;
      }
      :first-child span {
        opacity: 0 !important;
        min-width: 0px !important;
      }
    `};
`;

export default KeyTable;
