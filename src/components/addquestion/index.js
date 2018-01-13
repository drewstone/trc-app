import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

export default function AddQuestion({ switchTo, addQuestion }) {
  const submit = (e) => {
    e.preventDefault();
    return addQuestion({
      question: {
        mechanismType: document.getElementById("mechanism-selection").value,
        text: document.getElementById("question-input").value,
        choices: document.getElementById("choice-selection").value.split(" or "),
      }
    });
  }

  return (
    <div className="hero-body is-fullscreen">
      <form className="column hero is-light" onSubmit={submit}>
        <div className="has-text-centered">
          <h1>Add a question</h1>
        </div> 
          <div className="field">
            <div className="control">
              <input id="question-input" className="input is-medium" type="text" placeholder="Question" />
            </div>
          </div>
          <div className="field has-addons">
            <div className="control">
              <div className="select">
                <select id="mechanism-selection">
                  <option>Select a mechanism type</option>
                  {
                    ["Robust Bayesian Truth Serum", "Endogenous"].map((opt, inx) => ( <option key={inx}>{opt}</option> ))
                  }
                </select>
              </div>
            </div>
            <div className="control">
              <div className="select">
                <select id="choice-selection">
                  <option>Select answer choices</option>
                  {
                    ["up or down", "true or false", "left or right"].map((opt, inx) => ( <option key={inx}>{opt}</option> ))
                  }
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary">Create</button>
            </div>
          </div>
      </form>
    </div>
  );
}
