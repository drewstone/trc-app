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

  const dropDownGenerator = (topics) => {
    return (
      <div>
        {
          topics.map(topic => (
            <div className="field">
              <div className="control">
                <div className="select">
                  <select>
                    <option>Select a { topic.data }</option>
                    {
                      topic.options.map(opt => ( <option>{opt}</option> ))
                    }
                  </select>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }

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
          <div className="field">
            <div className="control">
              <input className="input is-medium" type="text" placeholder="Question" />
            </div>
          </div>
        {
          dropDownGenerator([
            { data: 'Mechanism Type', options: ['Robust Bayesian Truth Serum', 'Enogenous'] }
          ])
        }
      </OutlinedForm>
    </Div>
  );
}
