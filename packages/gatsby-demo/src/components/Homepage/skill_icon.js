import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SkillIcon = ({ skill }) => {
  return (
    <MainSkill>
      <MainSkillIconContainer>
        {' '}
        <MainSkillIcon>
          <FontAwesomeIcon icon={skill.icon} />
        </MainSkillIcon>
      </MainSkillIconContainer>
      <MainSkillTitle>{skill.name}</MainSkillTitle>
    </MainSkill>
  );
};

const MainSkill = styled.div`
  margin-bottom: 36px;
  padding: 0 12px;
`;

const MainSkillIconContainer = styled.div`
  // height: 103px;
  // width: 125px;
  // font-size: 48px;
  // margin: 0 auto;
  // clip-path: polygon(22% 0%, 78% 0%, 100% 50%, 78% 100%, 22% 100%, 0% 50%);
  // margin-bottom: 12px;
  // background: white;
  // padding-top: 2.5px;
`;

const MainSkillIcon = styled.div`
  height: 98px;
  width: 119px;
  margin: 0 auto;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  // background: rgb(37, 72, 100);
  // clip-path: polygon(22% 0%, 78% 0%, 100% 50%, 78% 100%, 22% 100%, 0% 50%);
`;

const MainSkillTitle = styled.div`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 16px;
  @media (min-width: 576px) {
    font-size: 28px;
  }
`;

// const Star = styled.div`
//   position: relative;
//   display: inline-block;
//   width: 0;
//   height: 0;
//   margin-left: 0.9em;
//   margin-right: 0.9em;
//   margin-bottom: 1.2em;
//   border-right: 0.3em solid transparent;
//   border-bottom: 0.7em solid #fc0;
//   border-left: 0.3em solid transparent;
//   font-size: 12px;
//   &::before {
//     content: '';
//     display: block;
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: 0.6em;
//     left: -1em;
//     border-right: 1em solid transparent;
//     border-bottom: 0.7em solid #fc0;
//     border-left: 1em solid transparent;
//     transform: rotate(-35deg);
//   }
//   &::after {
//     content: '';
//     display: block;
//     width: 0;
//     height: 0;
//     position: absolute;
//     top: 0.6em;
//     left: -1em;
//     border-right: 1em solid transparent;
//     border-bottom: 0.7em solid #fc0;
//     border-left: 1em solid transparent;
//     transform: rotate(35deg);
//   }
// `;

export default SkillIcon;
