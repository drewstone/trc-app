import React, { Component } from 'react';

export default class LandingPage extends Component {
  componentDidMount() {
    document.getElementById("nav-toggle").addEventListener("click", toggleNav);

    function toggleNav() {
      var nav = document.getElementById("navbarMenu");
      var className = nav.getAttribute("class");
      if (className == "navbar-menu") {
          nav.className = "navbar-menu is-active";
      } else {
          nav.className = "navbar-menu";
      }
    }
  }

  render() {
    return (
      <div>
        <section className="hero is-info is-fullheight">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item is-size-3" href="../">
                    <b>TRUECOIN</b>
                  </a>
                  <span id="nav-toggle" className="navbar-burger burger" data-target="navbarMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div id="navbarMenu" className="navbar-menu">
                  <div className="navbar-end">
                    <a className="navbar-item is-size-5" onClick={() => this.props.switchTo(this.props.screens.PLATFORM, { component: "HOME" })}>
                      PLATFORM
                    </a>
                    <a className="navbar-item is-size-5" onClick={() => this.props.switchTo(this.props.screens.LANDING_PAGE, { component: "ABOUT" })}>
                      ABOUT
                    </a>
                    <a className="navbar-item is-size-5" onClick={() => this.props.switchTo(this.props.screens.LANDING_PAGE, { component: "CONTACT" })}>
                      CONTACT
                    </a>
                    <span className="navbar-item">
                      <a className="button is-black is-small" disabled>
                        <span className="icon">
                          <i className="fa fa-github"></i>
                        </span>
                        <span>View Source</span>
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {
            this.props.children
          }
        </section>
        <footer className="hero is-info footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <a className="icon" href="https://github.com/drewstone/trc-app">
                  <i className="fa fa-github"></i>
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}