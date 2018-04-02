import React, { Component } from "react";
import Promise from 'bluebird';
import * as _ from 'lodash';
import Form from './form';

const TAG_COLORS = {
  Finance: "success",
  Politics: "info",
  Sports: "warning",
  Design: "danger",
  Other: "secondary",
};

export default class AnsweredPage extends Component {
  constructor(props) {
    super();
    this.state = {
      filter: "Popular",
      tags: ["Politics", "Design", "Sports", "Finance"],
      clickedTags: [],
      tasks: props.tasks || [],
      modalClicked: false,
      form: {
        choices: [],
        task: "",
        description: "",
        mechanism: "",
        designer: window.web3.eth.coinbase,
        questions: [""],
        tags: [],
      },
    };
  }

  componentDidMount() {
    // document.getElementById("Popular").classList.add("is-active");
    document.body.addEventListener("click", (event) => {
      if (this.state.modalClicked && event.target.className.includes("modal-background")) {
        document.getElementById("platform-modal").classList.remove("is-active");
        this.setState({
          modalClicked: !this.state.modalClicked,
        });
      }
    });
  }

  handleTagTypeClick(tType) {
    if (this.state.clickedTags.includes(tType)) {
      document.getElementById(`${tType}`).classList.remove("is-active");
      document.getElementById(`${tType}`).classList.remove(`is-${TAG_COLORS[tType]}`);

      this.setState({
        clickedTags: this.state.clickedTags.filter(tag => tag !== tType),
      });
    } else {
      document.getElementById(`${tType}`).classList.add("is-active")
      document.getElementById(`${tType}`).classList.add(`is-${TAG_COLORS[tType]}`);
      this.setState({
        clickedTags: [ ...this.state.clickedTags, tType ],
      });
    }
  }

  handleFilterTypeClick(fType) {
    document.getElementById(`${this.state.filter}`).classList.remove("is-active")
    document.getElementById(`${fType}`).classList.add("is-active")

    this.setState({
      filter: fType,
    });
  }

  handleModalClick() {
    if (!this.state.modalClicked) {
      document.getElementById('platform-modal').classList.add('is-active') 
    } else {
      document.getElementById('platform-modal').classList.remove('is-active')
    }
    
    this.setState({
      modalClicked: !this.state.modalClicked,
    })
  }

  handleModalTagClick(e) {
    let state;
    const tag = e.target.id.split("-")[2];
    if (!this.state.form.tags.includes(tag)) {
      document.getElementById(`form-tag-${tag}`).classList.add("is-active");
      document.getElementById(`form-tag-${tag}`).classList.add(`is-${TAG_COLORS[tag]}`);
      state = Object.assign({}, this.state, {
        form: {
          ...this.state.form,
          tags: [ ...this.state.form.tags, tag ],
        }
      });
    } else {
      document.getElementById(`form-tag-${tag}`).classList.remove("is-active");
      document.getElementById(`form-tag-${tag}`).classList.remove(`is-${TAG_COLORS[tag]}`);
      state = Object.assign({}, this.state, {
        form: {
          ...this.state.form,
          tags: [ ...this.state.form.tags.filter(t => t !== tag) ],
        }
      });
    }

    this.setState(state);
  }

  handleQuestionChange(e) {
    const state = Object.assign({}, this.state, {
      form: {
        ...this.state.form,
        questions: [ ...this.state.form.questions.map((q, inx) => {
          if (inx === e.target.id.split("-")[2]) {
            q = e.target.value;
          }

          return q;
        })]
      }
    });

    this.setState(state);
  }

  handleTaskChange(e) {
    const state = Object.assign({}, this.state, {
      form: {
        ...this.state.form,
        task: e.target.value,
      }
    });

    this.setState(state);
  }

  handleDescriptionChange(e) {
    const state = Object.assign({}, this.state, {
      form: {
        ...this.state.form,
        description: e.target.value,
      }
    });

    this.setState(state);
  }

  handleMechanismChange(e) {
    const state = Object.assign({}, this.state, {
      form: {
        ...this.state.form,
        mechanism: e.target.value,
      }
    });

    this.setState(state);
  }

  handleEventsChange(e) {
    const state = Object.assign({}, this.state, {
      form: {
        ...this.state.form,
        choices: e.target.value.split(" or "),
      }
    });

    this.setState(state);
  }

  handleFormSubmit(e) {
    this.props.addTask(this.props.contracts, this.state.form);
    this.handleModalClick();
  }

  getTasksInView() {
    let tasksInView = [];
    for (var i = this.props.tasks.length - 1; i >= 0; i--) {
      if (_.intersection(this.props.tasks[i].tags, this.state.clickedTags).length > 0) {
        tasksInView.push(this.props.tasks[i]);
      } else if (this.state.clickedTags.length === 0) {
        tasksInView.push(this.props.tasks[i])
      }
    }
    const protocol = this.props.contracts.Protocol;

    tasksInView.forEach(task => Promise.resolve(protocol.mintForTask("rbts", task.address)));
    console.log("Made it here!");
    // tasksInView.forEach(task => console.log(Promise.resolve(protocol.getScore(window.web3.eth.coinbase, task.address))));
    
    return tasksInView.filter(task => Array.from(task.participants).includes(this.state.form.designer));
    // return tasksInView.filter(task => task.designer == this.state.form.designer);

  }

  renderTasks() {
    var tasksInView = this.getTasksInView();
    if (tasksInView.length === 0) {
      return (
        <div className="hero is-light box">
          <h4>There are no tasks present. Use the New Task button on the left to add a task.</h4>
        </div>
      );
    }
    else {
      return tasksInView.map((task, inx) => {
        return (
            <div key={inx} className="hero box content is-dark">
              <a onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "TASK", task: task })}>
                <article className="post">
                  <h4 style={{color: 'white'}}>{task.name}</h4>
                  <span className="pull-right has-text-grey-light">{Object.keys(task.questions).length} &nbsp; <i className="fa fa-tasks"></i></span>
                  <div className="media">
                    <div className="media-left">
                      <p className="image is-32x32">
                        <img src="http://bulma.io/images/placeholders/128x128.png" />
                      </p>
                    </div>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <a>{task.designer}</a> {task.initiationTime}  &nbsp; 
                          { 
                            task.tags.map((tag, inx) => (
                              <span key={inx} className={`tag is-${TAG_COLORS[tag]}`}>{tag}</span>
                            ))
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </a>
            </div>
        );
      });
    }
  }

  render() {
    return (
      <div style={{height: `${window.innerHeight}px`}}>

        <section className="container">
          <div className="columns">
            <div className="column is-3">
              <a className="button is-primary is-block is-alt is-large" onClick={this.handleModalClick.bind(this)}>New Task</a>
              <aside className="menu">
                <p className="menu-label">
                  Tags
                </p>
                <ul className="menu-list">{
                  Object.keys(TAG_COLORS).map((elt, inx) => {
                    return (
                      <li key={inx}>
                        <a id={elt} className="button" onClick={() => this.handleTagTypeClick(elt)}>{elt}</a>
                      </li>
                    );
                  })
                }</ul>
              </aside>

            </div>

            <div className="column is-9 is-fullheight">
              <span className="has-text-grey-light">These are the tasks you have completed.</span>
              { this.renderTasks() }
            </div>
          </div>
        </section>
        <div id="platform-modal" className="modal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add a new task</p>
              <button className="delete" aria-label="close" onClick={this.handleModalClick.bind(this)}></button>
            </header>
            <section className="modal-card-body">
              <Form
                data={{
                  task: this.state.form.task,
                  description: this.state.form.description,
                  designer: this.state.form.designer,
                  questions: this.state.form.questions,
                  tags: this.state.form.tags,
                }}
                tags={Object.keys(TAG_COLORS)}
                handleTaskChange={this.handleTaskChange.bind(this)}
                handleDescriptionChange={this.handleDescriptionChange.bind(this)}
                handleChoiceChange={this.handleEventsChange.bind(this)}
                handleModalTagClick={this.handleModalTagClick.bind(this)}
                handleQuestionChange={this.handleQuestionChange.bind(this)}
                addQuestion={() => {
                  const state = Object.assign({}, this.state, {
                    form: {
                      ...this.state.form,
                      questions: [ ...this.state.form.questions, "" ],
                    }
                  });

                  this.setState(state);
                }}
                removeQuestions={() => {
                  const state = Object.assign({}, this.state, {
                    form: {
                      ...this.state.form,
                      questions: [ ...this.state.form.questions.filter(question => question !== "") ],
                    }
                  });

                  this.setState(state);
                }}/>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={this.handleFormSubmit.bind(this)} disabled={(
                this.state.form.task.length === 0 || this.state.form.description.length === 0 ||
                _.every(this.state.form.questions.map(q => q.length === 0)))}>Submit</button>
              <button className="button" onClick={this.handleModalClick.bind(this)}>Cancel</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}