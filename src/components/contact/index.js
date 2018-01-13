import React, { Component } from 'react';

export default function Contact({ switchTo, screens }) {
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
                <span className="navbar-burger burger" data-target="navbarMenu">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <a className="navbar-item is-size-5" onClick={() => switchTo(screens.PLATFORM)}>
                    PLATFORM
                  </a>
                  <a className="navbar-item is-size-5" onClick={() => switchTo(screens.ABOUT)}>
                    ABOUT
                  </a>
                  <a className="navbar-item is-size-5 is-active" onClick={() => switchTo(screens.CONTACT)}>
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

        <div className="hero-body">
          <div className="container has-text-centered is-transparent">
            <div className="column is-6 is-offset-3">
              <h1 className="title is-size-1">
                CONTACT
              </h1>
            </div>
          </div>
        </div>
      </section>
      <footer className="hero is-info footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              <a className="icon" href="https://github.com/dansup/bulma-templates">
                <i className="fa fa-github"></i>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}