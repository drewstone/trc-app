import React, { Component } from 'react';
import HomePage from './home';
import TaskPage from './task';
import AskedPage from './asked';
import AnsweredPage from './answered';
import AdminTaskPage from './admintask';

export default class Platform extends Component {
  componentDidMount() {
    document.getElementById("nav-toggle").addEventListener("click", toggleNav);

    function toggleNav() {
      var nav = document.getElementById("topNav");
      var className = nav.getAttribute("class");
      if (className === "navbar-menu") {
          nav.className = "navbar-menu is-active";
      } else {
          nav.className = "navbar-menu";
      }
    }
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (child.type === HomePage || child.type === AskedPage || child.type === AnsweredPage) {
        return React.cloneElement(child, {
          tasks: this.props.tasks,
          screens: this.props.screens,
          switchTo: this.props.switchTo,
          addTask: this.props.marketActions.addTask,
          market: this.props.market,
          contracts: this.props.contracts,
        });        
      } else if (child.type === TaskPage || child.type === AdminTaskPage) {
        return React.cloneElement(child, {
          task: this.props.currentTask,
          screens: this.props.screens,
          switchTo: this.props.switchTo,
          submitTask: this.props.marketActions.submitTask,
          getBalance: this.props.marketActions.getBalance,
          scoreTask: this.props.marketActions.scoreTask,
          market: this.props.market,
          contracts: this.props.contracts,
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
              <a className="navbar-item is-size-3" onClick={() => this.props.switchTo(this.props.screens.LANDING_PAGE, { component: "HOME" })}>
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
                <a className="navbar-item" onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "ASKED" })}>
                  Asked
                </a>
                <a className="navbar-item" onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "ANSWERED" })}>
                  Answered
                </a>
              </div>

              <div className="navbar-end">
              <a className="navbar-item" onClick={() => this.props.switchTo(this.props.screens.LANDING_PAGE, { component: "TUTORIAL" })}>
              Tutorial
              </a>
              <p className="navbar-item">TrueCoin Balance: <span className="bold">&nbsp; { this.props.market.balance }</span></p>
              </div>
            </div>
          </div>
        </nav>
        { this.renderChildren() }
      </section>
    );
  }
}