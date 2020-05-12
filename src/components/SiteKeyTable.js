/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Card';
import { DatabaseContext } from '../providers/DatabaseProvider';
import { shortenText } from '../utils/shortenText';
import { AppContext } from '../providers/AppProvider';

const SiteKeyTable = ({
  data,
  animate,
  animateItems,
  showItems,
  loading,
  user,
  setRender,
}) => {
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [dataToShow, setDataToShow] = useState(data);
  const [selectedType, setSelectedType] = useState('all');
  const { setNotificationMessage, setNotificationType } = useContext(
    AppContext
  );
  const { state, q } = useContext(DatabaseContext);
  const { userClient } = state;
  // const loading = true;
  // const showItems = false;
  // const animate = false;
  // const animateItems = false;

  console.log(dataToShow);

  useEffect(() => {
    if (data.length !== dataToShow.length) {
      setDataToShow(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(selectedKeys);
  }, [selectedKeys]);

  const onCheck = (key, e) => {
    if (e.target.checked) {
      const newKeys = selectedKeys.filter((newKey) => newKey !== 'undefined');
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

  const deleteKeys = () => {
    const allCheckboxes = document.querySelectorAll('.checkbox');
    console.log(selectedKeys);

    if (confirm('Are you sure you want to delete these keys?')) {
      const keysToDelete = [];

      selectedKeys.forEach((key) => {
        data.forEach((newKey) => {
          if (newKey.key === key) {
            keysToDelete.push(newKey.ref.value.id);
          }
        });
      });

      console.log(keysToDelete);

      userClient
        .query(
          q.Map(
            keysToDelete,
            q.Lambda(
              'data',
              q.Delete(q.Ref(q.Collection('keys'), q.Var('data')))
            )
          )
        )
        .then((response) => {
          console.log(response);
          setRender(true);

          setNotificationType('success');
          setNotificationMessage('Successfully deleted keys');
          setSelectedKeys([]);
          checkAll({
            checked: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const copyKeys = () => {};

  return (
    <span>
      {/* <h4 style={{ marginBottom: 0 }}>Filter</h4> */}
      {!loading && dataToShow.length === 0 && (
        <Card
          style={{
            display: `${
              !loading && dataToShow.length === 0 ? 'block' : 'none'
            }`,
          }}
          customStyles={`
          display: ${!loading && dataToShow.length === 0 ? 'block' : 'none'};
        `}
        >
          No API Keys
        </Card>
      )}
      {loading && (
        <>
          <HeaderRow skeleton>
            <BodyColumn skeleton className='hide-on-mobile'>
              <Checkbox>
                <input type='checkbox' onChange={checkAll} />
                <span className='checkmark'>
                  <div className='icon'>
                    <FontAwesomeIcon icon='check' />
                  </div>
                </span>
              </Checkbox>
            </BodyColumn>
            <BodyColumn skeleton className='hide-on-mobile'>
              <span>Key</span>
            </BodyColumn>
          </HeaderRow>
          <TableRow skeleton animate={animate}>
            <BodyColumn skeleton>
              <Checkbox>
                <input className='checkbox' type='checkbox' />
                <span className='checkmark'>
                  <div className='icon'>
                    <FontAwesomeIcon icon='check' />
                  </div>
                </span>
              </Checkbox>
            </BodyColumn>
            <BodyColumn skeleton>
              <div className='label'>Key</div>
              <span>{shortenText('hasduifhiausfgasdgfjsgfjk', 100)}</span>
            </BodyColumn>
          </TableRow>
          <TableRow skeleton animate={animate}>
            <BodyColumn skeleton>
              <Checkbox>
                <input className='checkbox' type='checkbox' />
                <span className='checkmark'>
                  <div className='icon'>
                    <FontAwesomeIcon icon='check' />
                  </div>
                </span>
              </Checkbox>
            </BodyColumn>
            <BodyColumn skeleton>
              <div className='label'>Key</div>
              <span>
                {shortenText(
                  'asldkfj;;;;;;;;al;sdkefjhhhaklsdhf;klashfdhafksdhkasdf',
                  100
                )}
              </span>
            </BodyColumn>
          </TableRow>
          <TableRow skeleton animate={animate}>
            <BodyColumn skeleton>
              <Checkbox>
                <input className='checkbox' type='checkbox' />
                <span className='checkmark'>
                  <div className='icon'>
                    <FontAwesomeIcon icon='check' />
                  </div>
                </span>
              </Checkbox>
            </BodyColumn>
            <BodyColumn skeleton>
              <div className='label'>Key</div>
              <span>{shortenText('asldkfj;;;;;;;;al;sdkdf', 100)}</span>
            </BodyColumn>
          </TableRow>
        </>
      )}
      {showItems && (
        <>
          {dataToShow && dataToShow.length > 0 ? (
            <div
              style={{
                position: animateItems ? 'absolute' : 'static',
                top: 0,
                left: 0,
                width: '100%',
              }}
            >
              <HeaderRow>
                <BodyColumn className='hide-on-mobile'>
                  <Checkbox>
                    <input type='checkbox' onChange={checkAll} />
                    <span className='checkmark'>
                      <div className='icon'>
                        <FontAwesomeIcon icon='check' />
                      </div>
                    </span>
                  </Checkbox>
                </BodyColumn>
                <BodyColumn className='hide-on-mobile'>
                  <span>Key</span>
                </BodyColumn>
                {selectedKeys.length > 0 && (
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      width: 'fit-content',
                      marginLeft: '-8px',
                    }}
                  >
                    <IconButton onClick={copyKeys}>
                      <FontAwesomeIcon icon={['far', 'copy']} />
                    </IconButton>
                    <IconButton error onClick={deleteKeys}>
                      <FontAwesomeIcon icon='trash' />
                    </IconButton>
                  </span>
                )}
              </HeaderRow>
              {dataToShow.map((key) => {
                return (
                  <TableRow animateItems={animateItems}>
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
                    <BodyColumn>
                      <div className='label'>Key</div>
                      {shortenText(key.key, 100)}
                    </BodyColumn>
                  </TableRow>
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </span>
  );
};

const IconButton = styled.button`
  border-radius: 50px;
  color: ${(props) =>
    props.error ? props.theme.color.error : props.theme.color.text.heading};
  background: transparent;
  padding: 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 34px;
  height: 34px;
  margin: 0 2px;
  // margin-left: auto;
  :last-child {
    margin-right: -8px;
  }
  :hover {
    background: ${(props) =>
      props.error ? props.theme.color.error : props.theme.color.text.heading}30;
    cursor: pointer;
  }
`;

const Select = styled.select`
  border: none;
  outline: none;
  font-weight: normal !important;
  cursor: pointer;
  border-radius: 50px;
  position: relative;
  padding: 4px 12px;
  background: ${(props) => props.theme.color.primary.backgroundDark};
  // -webkit-appearance: none;
  color: ${(props) => props.theme.color.primary.backgroundDark};
  font-size: 16px;
  line-height: 1;
  border: 0;
  width: 130px;
  border-radius: 5px;
  height: 34px;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right ${(props) => props.theme.color.gray.three};
  -webkit-appearance: none;
  background-position-x: 106px;
`;

const SelectWrapper = styled.span`
  position: relative;
  display: block;
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

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Table = styled.div`
  border-spacing: 0px;
  display: block !important;
  position: relative;
  overflow: hidden;
  @media (max-width: 769px) {
    display: block;
    width: 100%;
    margin-bottom: 22px;
  }
`;
const TableHead = styled.div`
  width: 100%;
  display: flex;
  align-items: space-between;
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
const TableBody = styled.div`
  margin-top: -12px;
  @media (max-width: 769px) {
    display: block;
    width: 100%;
  }
`;
const HeaderRow = styled.div`
  // border-radius: 10px;
  margin: 8px 0;
  display: flex;
  * {
    font-weight: bold !important;
  }
  align-items: center;
  width: 100%;
  margin-bottom: -8px;
  ${(props) =>
    props.skeleton &&
    css`
      background: white !important;
      overflow: hidden;
      position: relative;
      span {
        display: block !important;
        background: ${props.theme.color.gray.four} !important;
        border-radius: 5px;
        color: transparent !important;
        height: 19px !important;
      }

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
const TableRow = styled.div`
  border: 1px solid #e8e8e8;
  // border-radius: 10px;
  margin: 8px 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 100%;
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
  ${(props) =>
    props.skeleton &&
    css`
      background: white !important;
      overflow: hidden;
      position: relative;
      span {
        display: block !important;
        background: ${props.theme.color.gray.four} !important;
        border-radius: 5px;
        color: transparent !important;
        height: 19px !important;
      }

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
const HeaderColumn = styled.div`
  padding: 12px 26px 12px 0px;
  width: 100%;
  font-weight: 500;
  * {
    font-weight: 500 !important;
  }
  text-align: left;
  text-align: right;
  margin: 0;
  &.second-child {
    padding-left: 12px;
    text-align: left;
  }
  :first-child {
    padding: 12px;
    width: fit-content;
  }
  :last-child {
    // padding-right: 12px;
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
        min-width: 19px !important;
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
const BodyColumn = styled.div`
  padding: 12px 26px 12px 0px;
  width: fit-content;
  display: flex;
  align-items: center;
  height: 100%;
  &.second-child {
    padding-left: 12px;
    text-align: left;
    // margin-right: 36px;
  }
  :first-child {
    padding: 12px;
    width: fit-content;
  }
  :last-child {
    // padding-right: 12px;
    // margin-left: auto;
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
  // width: ${(props) => (props.fullWidth ? '50%' : 'fit-content')};
`;

export default SiteKeyTable;
