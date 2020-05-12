import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Section from '../layout/Section';
import Row from '../grid/Row';
import { ThemeContext } from '../theme';
import Spacer from '../Spacer';

const CustomizeSection = ({ data }) => {
  const theme = useContext(ThemeContext);

  return (
    <Section
      customStyles={`
        position: relative !important;
        z-index: 1 !important;
        display: block !important;
        padding-bottom: 150px;
        margin-bottom: -150px;
  @media (min-width: 576px) {

  }
  @media (min-width: 670px) {

  }
  @media (min-width: 850px) {

  }
  @media (min-width: 1000px) {

  }
  @media (min-width: 1300px) {

  }
  @media (min-width: 1500px) {

  }
  @media (min-width: 1677px) {

  }
      `}
      background='#ffffff'
    >
      <h1>Fully Customizable</h1>
      <p className='subtitle'>
        Customize everything, from color theme, form styles, messages, and more.
      </p>
      <Spacer height={64} />
      <Row spacing={[12, 24]} breakpoints={[769]}>
        <div widths={[4]}>
          <Feature>
            <FeatureIcon offsetY={-2} offsetX={4}>
              🎨
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Styling Dashboard</FeatureTitle>
              <FeatureSubtitle>
                Staticbox comes with an easy-to-use styles dashboard. Customize
                the color palette, input styling, and font through an intuitive
                UI.
              </FeatureSubtitle>
            </FeatureContent>
          </Feature>
          <Feature>
            <FeatureIcon offsetY={-2} offsetX={4}>
              💅
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Custom CSS</FeatureTitle>
              <FeatureSubtitle>
                Take your customization to the next level with support for
                custom CSS. Staticbox allows you to fully customize every CSS
                class used. And if you accidently remove the CSS, Staticbox
                comes with a backup so your comments are still styled 👊
              </FeatureSubtitle>
            </FeatureContent>
          </Feature>
          <Feature>
            <FeatureIcon offsetY={0} offsetX={1}>
              👋
            </FeatureIcon>
            <FeatureContent>
              <FeatureTitle>Custom Text</FeatureTitle>
              <FeatureSubtitle>
                Interact with your users the way you want. Staticbox lets you
                customize the headings, messages and input text, so you can show
                your site's personality through your commenting system.
              </FeatureSubtitle>
            </FeatureContent>
          </Feature>
        </div>
        <div widths={[8]}>
          <img
            style={{ width: '100%' }}
            src='https://cosmic-s3.imgix.net/9ccb68d0-8c9a-11ea-ac68-c50ccd313395-cosmic-dash.png?w=2000&auto=format'
          />
        </div>
      </Row>
      {/* <Row spacing={[12, 32]} breakpoints={[650, 1100, 2900]}> */}

      {/* </Row> */}
    </Section>
  );
};

const Feature = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  margin: 18px 0;
  align-items: flex-start;
  :first-child {
    margin-top: 0;
  }
`;

const FeatureIcon = styled.div`
  font-size: 36px !important;
  padding-right: 24px;
`;

const FeatureContent = styled.div``;

const FeatureTitle = styled.strong`
  display: block;
  margin: 0;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 6px;
`;

const FeatureSubtitle = styled.p`
  margin-top: 0;
  font-size: 18px !important;
`;

export default CustomizeSection;
