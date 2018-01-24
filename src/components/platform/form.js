import React, { Component } from 'react';
import styled from 'styled-components';

export default class Form extends Component {
  render() {
    return (
      <form>
        <div className="field">
          <label className="label">Task</label>
          <div className="control">
            <input
              id="form-task"
              className="input"
              type="text"
              placeholder="Text input"
              onChange={this.props.handleTaskChange}
              value={this.props.data.task}
              required/>
          </div>
        </div>
        <div className="field">
          <label className="label">Account</label>
          <div className="control">
            <input
              id="form-poster"
              className="input"
              type="text"
              placeholder="Text input"
              value={this.props.data.poster}
              disabled
              required/>
          </div>
          <p className="help">This is the address posting the task</p>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              id="form-description"
              className="textarea"
              placeholder="Textarea"
              onChange={this.props.handleDescriptionChange}
              value={this.props.data.description}
              required/>
          </div>
          <p className="help">Add a general task description</p>
        </div>
        <div className="field">
          <label className="label">Mechanism Type</label>
          <div className="control">
            <div className="select">
              <select
                id="form-select-mech"
                onChange={this.props.handleMechanismChange}
                value={this.props.data.mechanismType}>
                <option>Endogenous</option>
                <option>Robust Bayesian Truth Serum</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Task tags</label>
          <div className="field is-grouped">
            {
              this.props.tags.map((tag, inx) => {
                return (
                  <p key={inx} className="control">
                    <a id={`form-tag-${tag}`} className={`button checkbox`} onClick={this.props.handleModalTagClick}>
                      {tag}
                    </a>
                  </p>
                );
              })
            }
          </div>
        </div>
        <ul id="modal-question-list">
          { 
            this.props.data.questions.map((q, inx) => {
              return (
                <div key={inx} className="field is-fullwidth">
                  <label className="label">Question</label>
                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input
                        id={`form-text-${inx}`}
                        className="input"
                        type="text"
                        onChange={this.props.handleQuestionChange}
                        value={this.props.data.questions[inx].text}
                        placeholder="Question"
                        required/>
                    </div>
                    <p className="control">
                      <span className="select">
                        <select
                          id={`form-choices-${inx}`}
                          onChange={this.props.handleChoiceChange}
                          value={this.props.data.questions[inx].choices.join(" or ")}>
                          <option>up or down</option>
                          <option>left or right</option>
                          <option>true or false</option>
                        </select>
                      </span>
                    </p>
                  </div>
                  <br/>
                </div>
              );
            })
          }
        </ul>
        <div id="extra-qtn-btn" className="field has-text-centered">
          <a className="button" onClick={this.props.addQuestion}>Add another question</a>
        </div>
        <span style={{display: "hidden"}}><a id="form-submit" type="submit"></a></span>
      </form>
    );
  }
}

                          