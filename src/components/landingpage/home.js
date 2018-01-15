import React, { Component } from 'react';

export default function HomePage({}) {
  return (
    <div className="hero-body">
      <div className="container has-text-centered is-transparent">
        <div className="column is-6 is-offset-3">
          <h1 className="title is-size-1">
            A prediction market for crowd intelligence.
          </h1>
          <h2 className="subtitle is-size-5">
             <b>Truecoin transforms subjective information gathering into a prediction market, allowing you to forecast the crowds' beliefs.</b>
          </h2>
          <div className="box">
            
            <div className="field is-grouped">
              <p className="control is-expanded">
                <input className="input" type="text" placeholder="Enter your email" />
              </p>
              <p className="control">
                <a className="button is-primary">
                  Notify Me
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
