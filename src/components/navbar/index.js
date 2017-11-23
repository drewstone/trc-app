import React from 'react';

export default function Navbar({ switchTo, screens, options = {}, children }) {
  return (
    <section className="hero is-fullheight header-image">
      <div className="hero-head">
        <header className="nav">
          <div className="container">
            <div className="nav-left">
              <a className="nav-item" href="../index.html">
                <p className="nav-title">Truecoin</p>
              </a>
            </div>
            <div className="nav-right">
              <a className="nav-item" onClick={() => switchTo(screens.QUESTION_LIST)}>
                <p>Answer</p>
              </a>
              <a className="nav-item" onClick={() => switchTo(screens.ADD_QUESTION)}>
                <p>Add</p>
              </a>
              <a className="nav-item" onClick={() => switchTo(screens.USER)}>
                <p>Profile</p>
              </a>
            </div>
            <span className="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </header>
      </div>
      { children }
    </section>
  );
};