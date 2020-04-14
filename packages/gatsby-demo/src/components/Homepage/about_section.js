import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AboutSection = () => (
  <section className='bg-white' id='about'>
    <div className='container center-text'>
      <h2 className='title'>About Me</h2>
      <p>
        I'm Jarod Peachey. I'm a hard-working, dedicated web developer with a
        passion for going above and beyond to create high-quality designs and
        user experiences: all while creating a maintainable, high-performing
        website following the latest coding standards.
      </p>
      <Row className='row'>
        <div className='col col-6 desktop-col-3'>
          <MainSkill>
            <MainSkillIcon>
              <FontAwesomeIcon icon='mobile-alt' />
            </MainSkillIcon>
            <MainSkillTitle>Responsive Design</MainSkillTitle>
            {/* <MainSkillRating>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </MainSkillRating> */}
            <MainSkillDescription>
              <p>
                {' '}
                Mobile users account for over 50% of all web traffic. That's why
                my #1 priority is to make sure websites looks good and work
                perfectly on all screen sizes.
              </p>
            </MainSkillDescription>
          </MainSkill>
        </div>
        <div className='col col-6 desktop-col-3'>
          <MainSkill>
            <MainSkillIcon>
              <FontAwesomeIcon icon='code' />
            </MainSkillIcon>
            <MainSkillTitle>Code Quality</MainSkillTitle>
            {/* <MainSkillRating>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </MainSkillRating> */}
            <MainSkillDescription>
              <p>
                To me, coding isn't just writing code until it works like it's
                supposed to. It's making sure I use coding standards, and find
                the most efficient way of completing each task.
              </p>
            </MainSkillDescription>
          </MainSkill>
        </div>
        <div className='col col-6 desktop-col-3'>
          <MainSkill>
            <MainSkillIcon>
              <FontAwesomeIcon icon='rocket' />
            </MainSkillIcon>
            <MainSkillTitle>Performance</MainSkillTitle>
            {/* <MainSkillRating>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </MainSkillRating> */}
            <MainSkillDescription>
              <p>
                I optimize my code to be the lightest and fastest possible,
                testing multiple options and using the fastest, most efficient
                way to get things done.
              </p>
            </MainSkillDescription>
          </MainSkill>
        </div>
        <div className='col col-6 desktop-col-3'>
          <MainSkill>
            <MainSkillIcon>
              <FontAwesomeIcon icon='code-branch' />
            </MainSkillIcon>
            <MainSkillTitle>Maintainability</MainSkillTitle>
            {/* <MainSkillRating>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </MainSkillRating> */}
            <MainSkillDescription>
              <p>
                Whether creating a readable file structure or well-defined
                functions, I make sure my code is easy to maintain in the
                future.
              </p>
              <p>
                (That means no functions named
                {' '}
                <code>doSomething()</code>
                {' '}
                {')'}
              </p>
            </MainSkillDescription>
          </MainSkill>
        </div>
      </Row>
      <div className='center-text'>
        <a href='#contact'>
          <button type='button' className='primary'>
            Contact Me
          </button>
        </a>
      </div>
    </div>
  </section>
);

const Row = styled.div`
  margin-top: 32px;
`;

const MainSkill = styled.div`
  margin-bottom: 36px;
  padding: 0 12px;
`;

const MainSkillIcon = styled.div`
  height: 135px;
  width: 160px;
  margin: 0 auto;
  background: rgb(37, 72, 100);
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  // font-weight: bold;
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
  clip-path: polygon(22% 0%, 78% 0%, 100% 50%, 78% 100%, 22% 100%, 0% 50%);
  margin-bottom: 12px;
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

const MainSkillRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`;

const Star = styled.div`
  position: relative;
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.9em;
  margin-right: 0.9em;
  margin-bottom: 1.2em;
  border-right: 0.3em solid transparent;
  border-bottom: 0.7em solid #fc0;
  border-left: 0.3em solid transparent;
  font-size: 12px;
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: 0.6em;
    left: -1em;
    border-right: 1em solid transparent;
    border-bottom: 0.7em solid #fc0;
    border-left: 1em solid transparent;
    transform: rotate(-35deg);
  }
  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    top: 0.6em;
    left: -1em;
    border-right: 1em solid transparent;
    border-bottom: 0.7em solid #fc0;
    border-left: 1em solid transparent;
    transform: rotate(35deg);
  }
`;

const MainSkillDescription = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #666;
  & p {
    line-height: 28px;
  }
`;

export default AboutSection;
