import React from 'react';
import styled from 'styled-components';
import {media} from '@styles';


const StyledContainer = styled.div`
  position: relative;
  width: 60%;
  max-width: 700px;
  margin-left: 0px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;

const GitHubGraph = () => (
  <StyledContainer>
    <a href="https://github.com/batra98" target="_blank" rel="noopener noreferrer">
      <img
        src="https://github-readme-stats.vercel.app/api?username=batra98&&show_icons=true&title_color=00D9FF&icon_color=7C3AED&text_color=00D9FF&bg_color=0F1729&border_color=2D3B5E"
        alt="batra98's Github stats"
        width="495"
        height="195"
        loading="lazy"
      />
    </a>
  </StyledContainer>
);

export default GitHubGraph;