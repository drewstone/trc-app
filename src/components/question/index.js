import React from 'react';
import styled from 'styled-components';
import { colors } from '../colors';
import { screens } from '../../constants';

export default function Question({ switchTo, question, selectedChoice, selectChoice, addPrediction }) {
  const Form = styled.div`
    margin-top: 10px;
  `;

  const Label = styled.label`
    float: left;
    margin-right: 20px;
  `;

  let choice;
  if (selectedChoice) {
    choice = selectedChoice.choice
  }

  function submitForm(e) {
    e.preventDefault();

    if (choice) {
      return addPrediction({ id: question.id, choice })
      .then(() => switchTo())
    }
  }

  return (
    <div className="hero-body is-fullscreen">
      <form className="container" onSubmit={submitForm}>
        <h1 className="is-size-1">{question.text}</h1>
        <div>
          <Label>
            <input type="radio"
              value={question.choices[0]}
              checked={choice === question.choices[0]}
              onChange={() => selectChoice(question.id, question.choices[0])}
            />
            {question.choices[0]}
          </Label>
          <Label>
            <input
              type="radio" value={question.choices[1]}
              checked={choice === question.choices[1]}
              onChange={() => selectChoice(question.id, question.choices[1])}
            />
            {question.choices[1]}
          </Label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );

  return (
    <div className="hero-body">
      <button onClick={() => switchTo(screens.QUESTION_LIST)}>Back to all questions</button>
      <div className="container">
        <ul>
          <li><h1>{question.text}</h1></li>
          <li><h1>{question.mechanismType}</h1></li>
          <li><h1>{question.choices}</h1></li>
        </ul>
      </div>
    </div>

  );
}
