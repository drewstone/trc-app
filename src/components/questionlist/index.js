import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

export default function({ switchTo, questions }) {
  return (
    <div className="hero-body">
      <div className="container">
        <h1>Open Questions</h1>
        <ul>
          {
            questions.map((elt, inx) => {
              return (
                <li key={ inx }>
                  <a onClick={() => switchTo(screens.QUESTION, elt.id)}>{elt.text}</a>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}
