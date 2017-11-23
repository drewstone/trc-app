import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

export default function AddQuestion({ switchTo, addQuestion }) {
  const Form = styled.div`
    margin-top: 10px;
  `;

  return (
    <div className="hero-body is-fullscreen">
      <Form className="column hero is-light">
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
                    ['Robust Bayesian Truth Serum', 'Endogenous'].map((opt, inx) => ( <option key={inx}>{opt}</option> ))
                  }
                </select>
              </div>
            </div>
            <div class="control">
              <button type="submit" className="button is-primary" onClick={() => addQuestion()}>Create</button>
            </div>
          </div>
      </Form>
    </div>
  );
}
