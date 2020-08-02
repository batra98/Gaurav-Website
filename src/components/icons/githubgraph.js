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
    <a href="https://github.com/batra98" target="_blank">
      <img
        src="https://github-readme-stats.vercel.app/api?username=batra98&&show_icons=true&title_color=7AB547&icon_color=daf7dc&text_color=7AB547&bg_color=222629"
        alt="2016rshah's Github chart"
      />
    </a>
  </StyledContainer>
);

export default GitHubGraph;