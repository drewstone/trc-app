import React, { Component } from 'react';
import styled from 'styled-components';

export default class TaskPage extends Component {
  constructor(props) {
    super();
    this.state = {
      id: props.task.id,
      pages: props.task.questions,
      currPage: 1,
      prevPage: 1,
      completedCount: 0,
      clicked: Array(props.task.questions.length),
    }
  }

  componentDidMount() {
    if (document.getElementById(`johnsons-${this.state.prevPage}`)) {
      document.getElementById(`johnsons-${this.state.prevPage}`).classList.remove('is-current');
    } 
    
    if (document.getElementById(`johnsons-${this.state.currPage}`)) {
      document.getElementById(`johnsons-${this.state.currPage}`).classList.add('is-current');
    }

    if (this.state.completedCount == this.state.pages.length) {
      document.getElementById('submitBtnSpan').style.display = "";
    } else {
      document.getElementById('submitBtnSpan').style.display = "none";
    }
  }

  componentDidUpdate() {
    if (document.getElementById(`johnsons-${this.state.prevPage}`)) {
      document.getElementById(`johnsons-${this.state.prevPage}`).classList.remove('is-current');
    } 
    
    if (document.getElementById(`johnsons-${this.state.currPage}`)) {
      document.getElementById(`johnsons-${this.state.currPage}`).classList.add('is-current');
    }

    console.log(this.state.clicked);
    if (this.state.completedCount == this.state.pages.length) {
      document.getElementById('submitBtnSpan').style.display = "";
    } else {
      document.getElementById('submitBtnSpan').style.display = "none";
    }
  }

  renderTaskNavigation() {
    return (
      <nav className="pagination" role="navigation" aria-label="pagination" style={{marginBottom: "20px"}}>
        { this.renderPaginationButtons().map(btn => btn) }
        { this.renderPagination() }
      </nav>
    );
  }

  renderPagination() {
    if (this.state.pages.length < 3) {
      if (this.state.pages.length == 1) {
        return (<ul className="pagination-list" style={{listStyleType: 'none'}}>
          <li><a id={`johnsons-1`} className="pagination-link" aria-label="Page 1" aria-current="page">1</a></li>
        </ul>);
      } else if (this.state.pages.length == 2) {
        return (<ul className="pagination-list" style={{listStyleType: 'none'}}>
          <li><a id={`johnsons-1`} className="pagination-link" aria-label="Page 1" aria-current="page">1</a></li>
          <li><a id={`johnsons-2`} className="pagination-link" aria-label="Goto page 2">2</a></li>
        </ul>);
      } else {
        return (<ul className="pagination-list" style={{listStyleType: 'none'}}>
          <li><a id={`johnsons-1`} className="pagination-link" aria-label="Page 1" aria-current="page">1</a></li>
          <li><a id={`johnsons-2`} className="pagination-link" aria-label="Goto page 2">2</a></li>
          <li><a id={`johnsons-3`} className="pagination-link" aria-label="Goto page 3">3</a></li>
        </ul>);
      }
    }

    if (this.state.currPage < 4) {
      return (
        <ul className="pagination-list" style={{listStyleType: 'none'}}>
          <li><a id={`johnsons-1`} className="pagination-link" aria-label="Page 1" aria-current="page">1</a></li>
          <li><a id={`johnsons-2`} className="pagination-link" aria-label="Goto page 2">2</a></li>
          <li><a id={`johnsons-3`} className="pagination-link" aria-label="Goto page 3">3</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a id={`johnsons-${this.state.pages.length}`} className="pagination-link" aria-label="Goto page 86">{this.state.pages.length}</a></li>
        </ul>);
    } else if (this.state.currPage > this.state.pages.length - 2 && this.state.currPage <= this.state.pages.length) {
      return (
        <ul className="pagination-list" style={{listStyleType: 'none'}}>
          <li><a id={`johnsons-1`} className="pagination-link" aria-label="Page 1" aria-current="page">1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a id={`johnsons-${this.state.pages.length - 2}`} className="pagination-link" aria-label="Goto page 2">{this.state.pages.length - 2}</a></li>
          <li><a id={`johnsons-${this.state.pages.length - 1}`} className="pagination-link" aria-label="Goto page 3">{this.state.pages.length - 1}</a></li>
          <li><a id={`johnsons-${this.state.pages.length}`} className="pagination-link" aria-label="Goto page 86">{this.state.pages.length}</a></li>
        </ul>);
    } else {
      return (
        <ul className="pagination-list" style={{listStyleType: 'none'}}>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a id={`johnsons-${this.state.prevPage}`} className="pagination-link" aria-label="Goto page 45">{this.state.prevPage}</a></li>
          <li><a id={`johnsons-${this.state.currPage}`} id={`curr-${this.state.currPage}`} className="pagination-link" aria-label="Page 46" aria-current="page">{this.state.currPage}</a></li>
          <li><a id={`johnsons-${this.state.nextPage}`} className="pagination-link" aria-label="Goto page 47">{this.state.nextPage}</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a id={`johnsons-${this.state.pages.length}`} className="pagination-link" aria-label="Goto page 86">{this.state.pages.length}</a></li>
        </ul>);
    }
  }

  renderPaginationButtons() {
    if (this.state.pages.length == 1) {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" disabled>Previous</a>,
          <a key={2} className="pagination-next" disabled>Next page</a>
      ];
    }

    if (this.state.currPage == 1) {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" disabled>Previous</a>,
          <a key={2} className="pagination-next" onClick={this.handleNextClick.bind(this)}>Next page</a>
      ];
    } else if (this.state.currPage == 5) {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" onClick={this.handlePrevClick.bind(this)}>Previous</a>,
          <a key={2} className="pagination-next" disabled>Next page</a>
      ];
    } else {
      return [
          <a key={1} className="pagination-previous" title="This is the first page" onClick={this.handlePrevClick.bind(this)}>Previous</a>,
          <a key={2} className="pagination-next" onClick={this.handleNextClick.bind(this)}>Next page</a>
      ];
    }
  }

  renderSelector() {
    let Selector;
    if (this.state.clicked[this.state.currPage - 1] == null) {
      Selector = styled.div``;
    } else if (this.state.clicked[this.state.currPage - 1] == 0) {
      Selector = styled.div`
        background: -webkit-linear-gradient(left, #00C6FF 0%,#00C6FF 50%,#000000 50%,white 50%,white 100%);
      `;
    } else if (this.state.clicked[this.state.currPage - 1] == 1) {
      Selector = styled.div`
        background: -webkit-linear-gradient(right, #00C6FF 0%,#00C6FF 50%,#000000 50%,white 50%,white 100%);
      `;
    }

    return (
      <Selector className="card-footer">
        <p className="card-footer-item">
          <span>
            <a onClick={() => this.handleSelectionClick(0)}>{this.state.pages[this.state.currPage - 1].choices[0]}</a>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            <a onClick={() => this.handleSelectionClick(1)}>{this.state.pages[this.state.currPage - 1].choices[1]}</a>
          </span>
        </p>
      </Selector>
    );
  }

  handleNextClick() {
    this.setState({
      prevPage: this.state.currPage,
      currPage: this.state.currPage + 1,
    });
  }

  handlePrevClick() {
    this.setState({
      prevPage: this.state.currPage,
      currPage: this.state.currPage - 1,
    });
  }

  handleSelectionClick(index) {
    if (this.state.clicked[this.state.currPage - 1] == null) {
      this.setState({
        completedCount: this.state.completedCount + 1,
      });
    }

    let cl = this.state.clicked;
    cl[this.state.currPage - 1] = index;
    this.setState({
      clicked: cl,
    });
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
                      <h1 className="title article-title is-1"><b>Task task: </b>{this.props.task.task}</h1>
                      <h3 style={{marginBottom: "20px"}}><b>Posted: </b>{(new Date(this.props.task.creationTime)).toDateString()}</h3>
                    </div>
                  </div>
                </div>
              </div>
            <div className="content article-body" style={{height: `${window.innerHeight}px`}}>
              <h3 className="has-text-centered">Description</h3>
              <p>{this.props.task.description}</p>
              { this.renderTaskNavigation() }
              <div className="card">
                <div className="card-content">
                  <p className="title">
                    {this.state.pages[this.state.currPage - 1].text}
                  </p>
                </div>
                { this.renderSelector() }
              </div>
              <span id="submitBtnSpan">
                <a className="button is-success" onClick={() => {
                  
                }}>Success</a>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

                          