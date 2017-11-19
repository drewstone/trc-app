import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

export default function Question({ screenActions, marketActions }) {
  const Div = styled.div`
    position: relative;
    flex-direction:row;
  `;

  const OutlinedForm = styled.div`
    margin-top: 10px;
  `;

  const LeftLabel = styled.label`
    float: left;
    margin-right: 20px;
  `;

  return (
    <Div className="hero-body is-dark is-fullscreen">
      <OutlinedForm className="column hero is-light">
        <div className="has-text-centered">
          <h1>Add a question</h1>
        </div> 
          <div className="field">
            <div className="control">
              <input className="input is-medium" type="text" placeholder="Question" />
            </div>
          </div>
          <div className="field has-addons">
            <div className="control">
              <div className="select">
                <select>
                  <option>Select a mechanism type</option>
                  {
                    ['Robust Bayesian Truth Serum', 'Endogenous'].map(opt => ( <option>{opt}</option> ))
                  }
                </select>
              </div>
            </div>
            <div class="control">
              <button type="submit" className="button is-primary">Create</button>
            </div>
          </div>
      </OutlinedForm>
    </Div>
  );
}
