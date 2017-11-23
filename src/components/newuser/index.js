import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

export default function NewUser({ switchTo }) {
  const Div = styled.div`
    position: relative;
    flex-direction:row;
  `;

  const OutlinedArticle = styled.a`
    height: 500px;
    :hover {
      background-color: ${colors.darkgrey};
    }
  `;

  return (
    <Div className="hero-body is-dark is-fullscreen">
      <OutlinedArticle className="column hero is-half is-light has-text-centered" onClick={() => switchTo(screens.QUESTION_LIST)}>
        <h1>Answer a question</h1>
      </OutlinedArticle>
      <OutlinedArticle className="column hero is-half is-light has-text-centered" onClick={() => switchTo(screens.ADD_QUESTION)}> 
        <h1>Add a question</h1>
      </OutlinedArticle>
    </Div>
  );
}
