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
             <b>Truecoin takes qualities from prediction markets to crowdsource subjective information gathering, allowing you to forecast the crowds' beliefs.</b>
          </h2>

          <h2>Learn more!</h2>
          <iframe width="100%" height="400dpi" src="https://drive.google.com/file/d/1OhIf5A4VLnC4qgDfpk2PCS376CBDF6FP/preview"/>
        </div>
      </div>
    </div>
  );
}
