import React, { Component } from 'react';
import styled from 'styled-components';

export default class TaskPage extends Component {
  constructor(props) {
    super();
    this.state = {
      submitter: window.web3.eth.coinbase,
      events: props.task.events,
      questions: props.task.questions,
      currQuestion: 0,
      prevQuestion: 0,
      completedCount: 0,
      clicked: Array(props.task.questions.length),
      sliderValues: [ ...Array(props.task.questions.length)].map((elt, inx) => {
        return 50;
      }),
    }
  }

  componentDidMount() {
    if (this.state.completedCount === this.state.questions.length) {
      document.getElementById('submitBtnSpan').style.display = "";
    } else {
      document.getElementById('submitBtnSpan').style.display = "none";
    }
  }

  componentDidUpdate() {
    if (this.state.completedCount === this.state.questions.length) {
      document.getElementById('submitBtnSpan').style.display = "";
    } else {
      document.getElementById('submitBtnSpan').style.display = "none";
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

  renderSelector() {
    let Selector = styled.div``;
    if (this.state.clicked[this.state.currQuestion] === 0) {
      Selector = styled.div`
        background: -webkit-linear-gradient(left, #00C6FF 0%,#00C6FF 50%,#000000 50%,white 50%,white 100%);
      `;
    } else if (this.state.clicked[this.state.currQuestion] === 1) {
      Selector = styled.div`
        background: -webkit-linear-gradient(right, #00C6FF 0%,#00C6FF 50%,#000000 50%,white 50%,white 100%);
      `;
    }

    return (
      <Selector className="card-footer">
        <p className="card-footer-item">
          <span>
            <a onClick={() => this.handleSelectionClick(0)}>{this.state.events[0]}</a>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            <a onClick={() => this.handleSelectionClick(1)}>{this.state.events[1]}</a>
          </span>
        </p>
      </Selector>
    );
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

  handleSelectionClick(index) {
    if (this.state.clicked[this.state.currQuestion] == null) {
      this.setState({
        completedCount: this.state.completedCount + 1,
      });
    }

    let cl = this.state.clicked;
    cl[this.state.currQuestion] = index;
    this.setState({
      clicked: cl,
    });
  }

  handleSubmit() {
    this.props.submitTask(this.props.contracts, Object.assign({}, this.state, this.props.task));
  }

  render() {
    return (
      <section className="articles">
        <div className="column is-10 is-offset-1">
          <div className="card article">
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
            <div className="content article-body" style={{height: `${window.innerHeight}px`}}>
              <h3 className="has-text-centered">Description</h3>
              <p>{this.props.task.description}</p>
              { this.renderTaskNavigation() }
              <div className="card">
                <div className="card-content has-text-centered">
                  <p className="title">
                    {this.state.questions[this.state.currQuestion]}
                  </p>
                </div>
                <input
                  onChange={(e) => this.setState({ sliderValues: [...this.state.sliderValues.map((elt, inx) => {
                    if (inx === this.state.currQuestion) {
                      return e.target.value;
                    } else {
                      return elt;
                    }
                  })] })}
                  className="slider is-fullwidth is-info"
                  step="1"
                  min="0"
                  max="100"
                  value={this.state.sliderValues[this.state.currQuestion]}
                  type="range"/>
                { this.renderSelector() }
              </div>
              <span id="submitBtnSpan">
                <div className="has-text-centered">
                  <div className="column is-6 is-offset-3">
                    <div className="">
                      <div className="field is-grouped">
                        <p className="control is-expanded">
                          <a onClick={this.handleSubmit.bind(this)} className="button is-success is-fullwidth" type="text" placeholder="Enter your email">
                            Submit
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

                          