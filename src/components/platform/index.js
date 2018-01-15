import React, { Component } from 'react';
import HomePage from './home';
import TopicPage from './topic';

export default class Platform extends Component {
  componentDidMount() {
    document.getElementById("nav-toggle").addEventListener("click", toggleNav);

    function toggleNav() {
      var nav = document.getElementById("topNav");
      var className = nav.getAttribute("class");
      if (className == "navbar-menu") {
          nav.className = "navbar-menu is-active";
      } else {
          nav.className = "navbar-menu";
      }
    }
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (child.type == HomePage) {
        return React.cloneElement(child, {
          topics: this.props.topics,
          screens: this.props.screens,
          switchTo: this.props.switchTo,
        });        
      } else if (child.type == TopicPage) {
        return React.cloneElement(child, {
          topic: this.props.currentTopic,
          screens: this.props.screens,
          switchTo: this.props.switchTo,
        })
      } else {
        return child;
      }
    });
  }

  render() {
    return (
      <section className="hero is-info">
        <nav className="navbar is-white topNav">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item is-size-3" onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "HOME" })}>
                <b>TRUECOIN</b>
              </a>
              <div id="nav-toggle" className="navbar-burger burger" data-target="topNav">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div id="topNav" className="navbar-menu">
              <div className="navbar-start">
                <a className="navbar-item" onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "HOME" })}>
                  Home
                </a>
                <a className="navbar-item">
                  Documentation
                </a>
                <a className="navbar-item">
                  Blog
                </a>
              </div>

              <div className="navbar-end">
                <a className="navbar-item" onClick={() => this.props.switchTo(this.props.screens.LANDING_PAGE, { component: "HOME" })}>
                  Website
                </a>
              </div>
            </div>
          </div>
        </nav>
        { this.renderChildren() }
      </section>
    );
  }
}