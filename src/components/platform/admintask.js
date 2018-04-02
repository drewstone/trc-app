import React, { Component } from 'react';
import styled from 'styled-components';

export default class AdminTaskPage extends Component {
  constructor(props) {
    super();
    this.state = {
      choices: props.task.events,
      questions: props.task.questions,
      currQuestion: 0,
      prevQuestion: 0,
    }
  }

  renderScoreButton() {
    return [
      <div className="has-text-centered">
        <a className="button is-primary rounded" onClick={() => console.log("Closing and scoring task")}>Close and score</a>
      </div>,
      <br/>,
      <br/>
    ];
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
    const answeredCount = this.props.task.answers.filter(arr => arr.length > 0).length;
    return (<div>
      <p className="title">{ this.state.questions[this.state.currQuestion] }</p>
      <ul>
        <li>Number of Answers: {answeredCount}</li>
      </ul>
    </div>);
  }

  render() {
    return (
      <section className="articles">
        <div className="column is-10 is-offset-1">
          <div className="hero is-dark card article">
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
              <h3 style={{color: 'white'}} className="has-text-centered">Description</h3>
              <p>{this.props.task.description}</p>
              { this.renderTaskNavigation() }
              <div className="card">
                <div className="card-content has-text-centered">
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

                          