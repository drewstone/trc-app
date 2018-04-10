import React, { Component } from 'react';
import styled from 'styled-components';

export default class AdminTaskPage extends Component {
  constructor(props) {
    super();
    this.state = {
      choices: props.task.events,
      questions: props.task.questions,
      hasScored: props.task.hasScored,
      hasFinished: props.task.hasFinished,
      answers: props.task.answers,
      events: props.task.events,
      currQuestion: 0,
      prevQuestion: 0,
    }
  }

  scoreTask() {
    this.state.hasScored = true;
    this.props.scoreTask(this.props.contracts, this.props.task);
    this.renderScoreButton()
  }

  renderScoreButton() {
    if (this.state.hasScored) {
      return [
        <div key={1} className="has-text-centered">
          <a className="is-primary rounded">This task has been scored</a>
        </div>,
        <br key={2}/>,
        <br key={3}/>
      ];
    }
    else {
      return [
        <div key={1} className="has-text-centered">
          <a className="button is-primary rounded" onClick={() => this.scoreTask()}>Close and score</a>
        </div>,
        <br key={2}/>,
        <br key={3}/>
      ];
    }
  }

  renderTaskNavigation() {
    return (
      <nav className="pagination" role="navigation" aria-label="pagination" style={{marginBottom: "20px"}}>
        { this.renderPaginationButtons().map(btn => btn) }
      </nav>
    );
  }

  renderPaginationButtons() {
    if (this.state.questions.length === 1) {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" disabled>Previous</a>,
          <a key={2} className="pagination-next" disabled>Next</a>
      ];
    }

    if (this.state.currQuestion === 0) {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" disabled>Previous</a>,
          <a key={2} className="pagination-next" onClick={this.handleNextClick.bind(this)}>Next</a>
      ];
    } else if (this.state.currQuestion === this.state.questions.length - 1) {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" onClick={this.handlePrevClick.bind(this)}>Previous</a>,
          <a key={2} className="pagination-next" disabled>Next</a>
      ];
    } else {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" onClick={this.handlePrevClick.bind(this)}>Previous</a>,
          <a key={2} className="pagination-next" onClick={this.handleNextClick.bind(this)}>Next</a>
      ];
    }
  }

  handleNextClick() {
    this.setState({
      prevQuestion: this.state.currQuestion,
      currQuestion: this.state.currQuestion + 1,
    });
  }

  handlePrevClick() {
    this.setState({
      prevQuestion: this.state.currQuestion,
      currQuestion: this.state.currQuestion - 1,
    });
  }

  renderQuestionData() {
    const answeredCount = this.props.task.answers.length > 0 ? this.props.task.answers[0].length : 0;
    var responses = this.props.task.answers[this.state.currQuestion];

    var numSecondChoice = 0;
    for (var i = 0, len = responses.length; i < len; i++) {
      numSecondChoice += responses[i][0].c[0];
    }
    
    var responseList = responses.map((response, inx) => {
      return (
        <div key={inx} className="box content">
          <h5>Selected Answer: <span className="bold">{ this.state.events[response[0].c[0]] }</span></h5>
          <p>Predicted Distribution: { response[1].c[0] / 10000 }</p>
        </div>
      );
    });

    return (
      <div>
        <p className="title has-text-centered">{ this.state.questions[this.state.currQuestion] }</p>
        <div className="hero box content is-link">
          <h4 className="title">Responses Summary</h4>
          <p className="">Number of Answers: <span className="bold">{answeredCount}</span></p>
          <p>Distribution of Answers: <span className="bold">{ this.state.events[0] } ({ answeredCount - numSecondChoice })</span>, <span className="bold">{ this.state.events[1] } ({ numSecondChoice })</span></p>
        </div>
        
        { responseList }
      </div>
    );
  }

  render() {
    return (
      <section className="articles">
        <div className="column is-10 is-offset-1">
          <div className="hero is-light card article">
              <div className="card-content">
                <div className="media">
                  <div className="media-center">
                      <img src="http://www.radfaces.com/images/avatars/scrappy-doo.jpg" className="author-image" alt="Placeholder image" />
                  </div>
                  <div className="container">
                    <div className="media-content">
                      <h1 className="title article-title is-1"><b>Task name: </b>{this.props.task.name}</h1>
                      <h3 style={{marginBottom: "20px"}}><b>Posted: </b>{(new Date(this.props.task.initiationTime)).toDateString()}</h3>
                      <h3 style={{marginBottom: "20px"}}><b>Designer: </b>{this.props.task.designer}</h3>
                    </div>
                  </div>
                </div>
              </div>
              { this.renderScoreButton() }
            <div className="content article-body" style={{height: `${window.innerHeight}px`}}>
              <h3 className="has-text-centered">Description</h3>
              <p className="has-text-centered">{this.props.task.description}</p>
              { this.renderTaskNavigation() }
              <div className="card">
                <div className="card-content">
                  { this.renderQuestionData() }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

                          