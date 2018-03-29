import React, { Component } from 'react';
import styled from 'styled-components';

export default class Form extends Component {
  render() {
    return (
      <form>
        <div className="field">
          <label className="label">Task Name</label>
          <div className="control">
            <input
              id="form-task"
              className="input"
              type="text"
              placeholder="Ex: Are the addresses of these locations correct?"
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
              value={this.props.data.designer}
              disabled
              required/>
          </div>
          <p className="help">This is your Metamask address</p>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              id="form-description"
              className="textarea"
              placeholder="Ex: For each building, determine whether or not the specified address is correct."
              onChange={this.props.handleDescriptionChange}
              value={this.props.data.description}
              required/>
          </div>
          <p className="help">Add a general task description</p>
        </div>
        <div className="field">
          <label className="label">Task Tags</label>
          <div className="field is-grouped has-addons">
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
        <div className="field">
          <label className="label">Task Events</label>
          <div className="field">
            <p className="control">
              <span className="select">
                <select onChange={this.props.handleChoiceChange}>
                  <option>up or down</option>
                  <option>left or right</option>
                  <option>true or false</option>
                </select>
              </span>
            </p>
          </div>
          <p className="help">Ex: The shown address may be true or false</p>
        </div>
        <ul id="modal-question-list">
          { 
            this.props.data.questions.map((q, inx) => {
              return (
                <div key={inx} className="field is-fullwidth">
                  <label className="label">Question</label>
                  <div className="field">
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
                  </div>
                </div>
              );
            })
          }
        </ul>
        <br/>
        <div id="extra-qtn-btn" className="field has-text-centered">
          <a className="button" onClick={this.props.addQuestion}>Add another question</a>
          <a className="button" onClick={this.props.removeQuestions}>Clear empty questions</a>
        </div>
        <span style={{display: "hidden"}}><a id="form-submit" type="submit"></a></span>
      </form>
    );
  }
}

                          