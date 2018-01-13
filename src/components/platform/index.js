import React, { Component } from 'react';

export default class Platform extends Component {
  constructor(props) {
    super();
    this.state = {
      filterType: "Popular",
      tagTypes: ["Dashboard"],
      openTasks: props.tasks || [],
    };
  }

  componentDidMount() {
    document.getElementById('Popular').classList.add('is-active');
  }

  handleFilterTypeClick(fType) {
    document.getElementById(`${this.state.filterType}`).classList.remove('is-active')
    document.getElementById(`${fType}`).classList.add('is-active')

    this.setState({
      filterType: fType,
    });
  }

  handleTagTypeClick(tType) {
    if (tType in this.state.tagTypes) {
      document.getElementById(`${tType}`).classList.remove('is-active')
      this.setState({
        tagTypes: this.state.tagTypes.filter(tag => tag !== tType)
      });
    } else {
      document.getElementById(`${tType}`).classList.add('is-active')
      this.setState({
        tagTypes: [ ...this.state.tagTypes, tType ]
      });
    }
  }

  render() {
    return (
      <section className="hero is-info">
        <nav className="navbar is-white topNav">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item is-size-3">
                <b>TRUECOIN</b>
              </a>
              <div className="navbar-burger burger" data-target="topNav">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div id="topNav" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item" onClick={() => this.props.switchTo(this.props.screens.LANDING_PAGE)}>
                  Home
                </a>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="field is-grouped">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
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
                  <li><a id={"Politics"} className="button is-info" onClick={() => this.handleFilterTypeClick("Politics")}>Politics</a></li>
                  <li><a id={"Design"} className="button is-info" onClick={() => this.handleFilterTypeClick("Design")}>Design</a></li>
                  <li><a id={"Sports"} className="button is-info" onClick={() => this.handleFilterTypeClick("Sports")}>Sports</a></li>
                  <li><a id={"Finance"} className="button is-info" onClick={() => this.handleFilterTypeClick("Finance")}>Finance</a></li>
                </ul>
              </aside>

            </div>

            <div className="column is-9 is-fullheight" style={{height: `${window.innerHeight}px`}}>
              <div className="box content">
                {
                  this.state.openTasks.map((task, inx) => (
                    <article key={inx} className="post">
                      <h4>{task.name}</h4>
                      <span className="pull-right has-text-grey-light"><i className="fa fa-comments"></i> 2</span>
                      <div className="media">
                        <div className="media-left">
                          <p className="image is-32x32">
                            <img src="http://bulma.io/images/placeholders/128x128.png" />
                          </p>
                        </div>
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <a>{task.poster}</a> {task.creationTime}  &nbsp; 
                              { task.tags.map(tag => (<span className="tag">{tag}</span>))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}