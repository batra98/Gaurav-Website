import styled from 'styled-components';
import theme from './theme';
import media from './media';
const { colors, fontSizes, fonts } = theme;

const Heading = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 0 40px;
  width: 100%;
  white-space: nowrap;
  font-size: ${fontSizes.h3};
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};

  &:before {
    counter-increment: section;
    content: '0' counter(section) '.';
    margin-right: 10px;
    font-family: ${fonts.SFMono};
    font-weight: normal;
    background: ${colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: ${fontSizes.xl};
    position: relative;
    bottom: 4px;
    ${media.tablet`font-size: ${fontSizes.lg};`};
  }

  &:after {
    content: '';
    display: block;
    height: 2px;
    width: 300px;
    background: linear-gradient(90deg, ${colors.lightestNavy} 0%, transparent 100%);
    position: relative;
    top: -5px;
    margin-left: 20px;
    ${media.desktop`width: 200px`};
    ${media.tablet`width: 100%;`};
    ${media.thone`margin-left: 10px;`};
  }
`;

export default Heading;
