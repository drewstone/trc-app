import React, { Component } from 'react';

export default function FAQPage({ switchTo, screens }) {
  return (
    <div>
      <div className="hero">
        <div className="container is-transparent">
          <div className="column is-6">
            <h1 className="title is-size-1">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container box">
          <p className="bold">How is this different than Amazon Mechanical Turk?</p>
          <p>Truecoin takes qualities from prediction markets to crowdsource subjective information gathering, allowing you to forecast the crowds beliefs.</p>
        </div>
        <div className="container box">
          <p className="bold">What exactly is TrueCoin?</p>
          <p>Truecoin takes qualities from prediction markets to crowdsource subjective information gathering, allowing you to forecast the crowds beliefs.</p>
        </div>
        <div className="container box">
          <p className="bold">What is a distributed application?</p>
          <p>Truecoin takes qualities from prediction markets to crowdsource subjective information gathering, allowing you to forecast the crowds beliefs.</p>
        </div>
        <div className="container box">
          <p className="bold">Who sees the tasks I post? Who sees my answers?</p>
          <p>Truecoin takes qualities from prediction markets to crowdsource subjective information gathering, allowing you to forecast the crowds beliefs.</p>
        </div>
        <div className="container box">
          <p className="bold">What are the RBTS and Endogenous mechanisms?</p>
          <p>Truecoin takes qualities from prediction markets to crowdsource subjective information gathering, allowing you to forecast the crowds beliefs.</p>
        </div>
      </div>
    </div>
  );
}