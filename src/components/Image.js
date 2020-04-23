import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

function withImageData (WrappedComponent) {
  return props => (
    <StaticQuery
      query={graphql`
        query {
          skillsImageOne: file(relativePath: { eq: "skill_one.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          skillsImageTwo: file(relativePath: { eq: "skill_two.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          skillsImageThree: file(relativePath: { eq: "skill_three.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          caltrack: file(relativePath: { eq: "caltrack.PNG" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          wevote_one: file(relativePath: { eq: "wevote_one.PNG" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          wevote_two: file(relativePath: { eq: "wevote_two.PNG" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          contact_manager: file(relativePath: { eq: "contact_manager.PNG" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          landing_page: file(relativePath: { eq: "landing_page.PNG" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          pph: file(relativePath: { eq: "pph.png" }) {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => <WrappedComponent {...props} imageData={data} />}
    />
  );
}

const SkillsImageOne = withImageData(props => (
  <Img fluid={props.imageData.skillsImageOne.childImageSharp.fluid} />
));
const SkillsImageTwo = withImageData(props => (
  <Img fluid={props.imageData.skillsImageTwo.childImageSharp.fluid} />
));
const SkillsImageThree = withImageData(props => (
  <Img fluid={props.imageData.skillsImageThree.childImageSharp.fluid} />
));
const CalTrackImage = withImageData(props => (
  <Img fluid={props.imageData.caltrack.childImageSharp.fluid} />
));
const WeVoteImageOne = withImageData(props => (
  <Img fluid={props.imageData.wevote_one.childImageSharp.fluid} />
));
const WeVoteImageTwo = withImageData(props => (
  <Img fluid={props.imageData.wevote_two.childImageSharp.fluid} />
));
const ContactManagerImage = withImageData(props => (
  <Img fluid={props.imageData.contact_manager.childImageSharp.fluid} />
));
const LandingPageImage = withImageData(props => (
  <Img fluid={props.imageData.landing_page.childImageSharp.fluid} />
));
const PPHImage = withImageData(props => (
  <Img fluid={props.imageData.pph.childImageSharp.fluid} />
));

export { SkillsImageOne, SkillsImageTwo, SkillsImageThree, CalTrackImage, WeVoteImageOne, WeVoteImageTwo, ContactManagerImage, LandingPageImage, PPHImage };
