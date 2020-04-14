import React from 'react';
import styled from 'styled-components';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import SkillIcon from './skill_icon';

const skills = [
  {
    name: 'React',
    // tags: ['frontend'],
    icon: ['fab', 'react'],
    isImage: false,
  },
  {
    name: 'HTML',
    // tags: ['frontend'],
    icon: ['fab', 'html5'],
    isImage: false,
  },
  {
    name: 'CSS',
    tags: ['frontend'],
    icon: ['fab', 'css3'],
    isImage: false,
  },
  {
    name: 'Javascript',
    // tags: ['frontend'],
    icon: ['fab', 'js-square'],
    isImage: false,
  },
  {
    name: 'Git / Github',
    tags: ['tools'],
    icon: ['fab', 'github'],
    isImage: false,
  },
  {
    name: 'Bootstrap',
    // tags: ['frontend', 'frameworks'],
    icon: ['fab', 'bootstrap'],
    isImage: false,
  },
  {
    name: 'Material UI',
    // tags: ['frontend', 'frameworks'],
    icon: ['fa', 'code-branch'],
    isImage: true,
  },
  {
    name: 'PHP',
    // tags: ['backend'],
    icon: ['fab', 'php'],
    isImage: false,
  },
  {
    name: 'Webpack',
    // tags: ['tools'],
    isImage: true,
    icon: ['fa', 'code-branch'],
  },
  {
    name: 'Babel',
    // tags: ['tools'],
    icon: ['fa', 'code-branch'],
    isImage: false,
  },
  {
    name: 'Wordpress',
    // tags: ['tools', 'frontend'],
    icon: ['fab', 'wordpress'],
    isImage: false,
  },
  {
    name: 'MySQL',
    // tags: ['backend'],
    icon: ['fa', 'database'],
    isImage: false,
  },
];

const SkillsSection = () => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "hero_image.jpeg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    `}
    render={(data) => {
      // Extract imageData.

      const backgroundFluidImageStack = [
        'linear-gradient(rgba(37, 72, 100, 0.87), rgba(37, 72, 100, 0.87))',
        data.desktop.childImageSharp.fluid,
      ];

      return (
        <BackgroundImage
          Tag='section'
          // To style via external CSS see layout.css last examples:
          // className="test"
          fluid={backgroundFluidImageStack}
          backgroundColor='#040e18'
          style={{
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            background: 'linear-gradient()',
          }}
          // https://github.com/timhagn/gatsby-background-image/#styling--passed-through-styles):
          id='hero_image'
          fadeIn='soft'
        >
          <Wrapper className='container' id='skills'>
            <h2 className='title'>Skills</h2>
            <SkillWrapper>
              {/* <h2>Languages</h2> */}
              <div className='row mobile'>
                {skills.map(skill => (
                  <div className='col col-6 mobile-lg-col-4 tablet-col-3 desktop-col-2'>
                    <SkillIcon skill={skill} />
                  </div>
                ))}
              </div>
            </SkillWrapper>
          </Wrapper>
        </BackgroundImage>
      );
    }}
  />
);

const Wrapper = styled.div`
  color: white;
  & .title::after {
    background: white;
  }
`;

const SkillWrapper = styled.div`
  padding: 0 12px;
`;

export default SkillsSection;
