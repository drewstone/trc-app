import React, { Component } from "react";
import * as _ from 'lodash';

const TAG_COLORS = {
  FINANCE: "success",
  POLITICS: "info",
  SPORTS: "warning",
  DESIGN: "danger",
}

export default class HomePage extends Component {
  constructor(props) {
    super();
    this.state = {
      filter: "Popular",
      tags: [],
      topics: props.topics || [],
      topicsInView: props.topics || [],
    }
  }

  componentDidMount() {
    document.getElementById("Popular").classList.add("is-active");
  }

  handleTagTypeClick(tType) {
    if (this.state.tags.includes(tType)) {
      document.getElementById(`${tType}`).classList.remove('is-active');

      this.setState({
        tags: this.state.tags.filter(tag => tag !== tType),
        topicsInView: (this.state.tags.length == 1) 
          ? this.state.topics
          : [...this.state.topics.filter(topic => (
              _.intersection(topic.tags, this.state.tags.filter(tag => tag !== tType)).length > 0
            ))]
      });
    } else {
      document.getElementById(`${tType}`).classList.add('is-active')
      this.setState({
        tags: [ ...this.state.tags, tType ],
        topicsInView: [
          ...this.state.topics.filter(topic => (
            _.intersection(topic.tags, [ ...this.state.tags, tType]).length > 0
          ))
        ]
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

  handleTopicClick(topic) {

  }

  render() {
    return (
      <div>
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-menu">
              <div className="navbar-start">
                <a id={"Popular"} className="navbar-item" onClick={() => this.handleFilterTypeClick("Popular")}>Popular</a>
                <a id={"Recent"} className="navbar-item" onClick={() => this.handleFilterTypeClick("Recent")}>Recent</a>
                <a id={"Rising"} className="navbar-item" onClick={() => this.handleFilterTypeClick("Rising")}>Rising</a>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <input className="input" type="text" placeholder="Search forum..." />
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="container">
          <div className="columns">
            <div className="column is-3">
              <a className="button is-primary is-block is-alt is-large">New Post</a>
              <aside className="menu">
                <p className="menu-label">
                  Tags
                </p>
                <ul className="menu-list">
                  {
                    ["Politics", "Design", "Sports", "Finance"].map((elt, inx) => {
                      return (
                        <li key={inx}>
                          <a id={elt} className="button" onClick={() => this.handleTagTypeClick(elt)}>{elt}</a>
                        </li>
                      );
                    })
                  }
                </ul>
              </aside>

            </div>

            <div className="column is-9 is-fullheight" style={{height: `${window.innerHeight}px`}}>
              <div className="box content">
                {
                  this.state.topicsInView.map((topic, inx) => (
                    <a key={inx} onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "TOPIC", topic: topic })}>
                      <article className="post">
                        <h4>{topic.topic}</h4>
                        <span className="pull-right has-text-grey-light">{topic.tasks.length} &nbsp; <i className="fa fa-tasks"></i></span>
                        <div className="media">
                          <div className="media-left">
                            <p className="image is-32x32">
                              <img src="http://bulma.io/images/placeholders/128x128.png" />
                            </p>
                          </div>
                          <div className="media-content">
                            <div className="content">
                              <p>
                                <a>{topic.poster}</a> {topic.creationTime}  &nbsp; 
                                { 
                                  topic.tags.map((tag, inx) => (
                                    <span key={inx} className={`tag is-${TAG_COLORS[tag.toUpperCase()]}`}>{tag}</span>
                                  ))
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </a>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}