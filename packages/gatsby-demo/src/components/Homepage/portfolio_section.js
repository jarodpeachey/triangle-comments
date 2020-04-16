import React from 'react';
import styled from 'styled-components';
import {
  CalTrackImage,
  WeVoteImageOne,
  ContactManagerImage,
  LandingPageImage,
} from '../image';

const PortfolioSection = () => (
  <section className='bg-white section' id='portfolio'>
    <div className='container'>
      <h2 className='title'>Portfolio</h2>
      <div className='row'>
        <Column className='col col-6 desktop-col-4'>
          <a
            href='https://caltrack.netlify.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            <PortfolioWrapper>
              <PortfolioImage>
                <CalTrackImage />
              </PortfolioImage>

              <PortfolioTitle>CalTrack</PortfolioTitle>
              <PortfolioDescription>
                <p>
                  CalTrack is an app I built using React, Redux and Material UI.{' '}
                </p>
                <p>
                  {' '}
                  It allows multiple users to sign up and track their meals and
                  workouts. The data is collected and their calories gained/lost
                  are displayed on the dashboard.
                </p>
              </PortfolioDescription>
              <PortfolioSkills>
                <PortfolioSkill>HTML</PortfolioSkill>
                <PortfolioSkill>CSS</PortfolioSkill>
                <PortfolioSkill>React</PortfolioSkill>
              </PortfolioSkills>
            </PortfolioWrapper>
          </a>
        </Column>
        <Column className='col col-6 desktop-col-4'>
          <a href='https://wevote.us' rel='noopener noreferrer' target='_blank'>
            <PortfolioWrapper>
              <PortfolioImage>
                <WeVoteImageOne />
              </PortfolioImage>

              <PortfolioTitle>WeVote</PortfolioTitle>
              <PortfolioDescription>
                <p>
                  At WeVote, I was responsible for the development and
                  maintenance of a large single-page application using React and
                  Flux.
                </p>
                <p>
                  I updated 7+ pages to optimize the user experience based on
                  designs from the team. I also browsed through codebase,
                  removing +-10,000 lines of unnecessary code. I added over
                  16,000 lines of new features.
                </p>
              </PortfolioDescription>
              <PortfolioSkills>
                <PortfolioSkill>HTML</PortfolioSkill>
                <PortfolioSkill>CSS</PortfolioSkill>
                <PortfolioSkill>React</PortfolioSkill>
              </PortfolioSkills>
            </PortfolioWrapper>
          </a>
        </Column>
        <Column className='col col-6 desktop-col-4'>
          <a
            href='https://peachey-contact.netlify.com/'
            rel='noopener noreferrer'
            target='_blank'
          >
            <PortfolioWrapper>
              <PortfolioImage>
                <ContactManagerImage />
              </PortfolioImage>

              <PortfolioTitle>Contact Manager</PortfolioTitle>
              <PortfolioDescription>
                <p>
                  This is a simple contact manager app with a focus on a modern
                  and clean UI. It uses a design and colors that makes it easy
                  to use and navigate.
                </p>
                <p>
                  I created the project from scratch using ReactJS and CSS. I
                  used MaterialUI to create the modern and responsive UI, as
                  well as custom styles.
                </p>
              </PortfolioDescription>
              <PortfolioSkills>
                <PortfolioSkill>HTML</PortfolioSkill>
                <PortfolioSkill>CSS</PortfolioSkill>
                <PortfolioSkill>React</PortfolioSkill>
              </PortfolioSkills>
            </PortfolioWrapper>
          </a>
        </Column>
        <Column className='col col-6 desktop-col-4'>
          <a
            href='https://jarod-landing-page.netlify.com/'
            rel='noopener noreferrer'
            target='_blank'
          >
            <PortfolioWrapper>
              <PortfolioImage>
                <LandingPageImage />
              </PortfolioImage>

              <PortfolioTitle>Landing Page</PortfolioTitle>
              <PortfolioDescription>
                <p>
                  This is a simple landing page demo that uses a modern design
                  and attractive user experience. Built using HTML, CSS and JS.
                </p>
              </PortfolioDescription>
              <PortfolioSkills>
                <PortfolioSkill>HTML</PortfolioSkill>
                <PortfolioSkill>CSS</PortfolioSkill>
                <PortfolioSkill>Javascript</PortfolioSkill>
              </PortfolioSkills>
            </PortfolioWrapper>
          </a>
        </Column>
      </div>
    </div>
  </section>
);

const PortfolioWrapper = styled.div`
  position: relative;
  padding: 24px;
  z-index: 1;
  ::after {
    transition: all 0.25s;
    content: '';
    background: #26496622;
    top: 0;
    left: 0;
    border-radius: 25px;
    transition: all 0.25s;
    height: 200px;
    width: calc(100% - 48px);
    left: 24px;
    top: 24px;
    display: block;
    z-index: -1;
    position: absolute;
  }
  :hover::after {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
`;

const Column = styled.div`
  position: relative;
`;

const PortfolioImage = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  * {
    height: 200px !important;
    object-fit: cover !important;
    border-radius: 25px;
  }
`;

const PortfolioTitle = styled.div`
  font-size: 28px;
  color: black;
  font-weight: bold;
  text-align: center;
  margin: 12px 0;
  @media (min-width: 576px) {
    font-size: 36px;
  }
`;

const PortfolioDescription = styled.div`
  text-align: center !important;
  font-weight: 500 !important;
  color: #666 !important;
`;

const PortfolioSkills = styled.div`
  margin-top: 16px;
`;

const PortfolioSkill = styled.div`
  padding: 4px 12px;
  margin: 8px;
  background: rgb(81, 160, 249);
  // border: 1px solid #ddd;
  display: inline-block;
  font-weight: bold;
  font-size: 12px;
  border-radius: 4px;
  color: white;
`;

export default PortfolioSection;
