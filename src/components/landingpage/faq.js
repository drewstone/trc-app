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
          <p className="bold">What exactly is TrueCoin?</p>
          <p>Truecoin is a platform to crowdsource data collection in a transparent, secure and incentive-compatible manner.</p>
        </div>
        <div className="container box">
          <p className="bold">How is this different than Amazon's Mechanical Turk?</p>
          <p>Unlike Mechanical Turk, Truecoin leverages scoring mechanisms which incentivize truthful responses from partcipants, even whent the correct answer is unobservable.</p>
        </div>
        
        <div className="container box">
          <p className="bold">Who owns my data?</p>
          <p>Truecoin is built on the Ethereum blockchain, which means that data is stored in a completely decentralized manner. No one, including us, has the exclusive rights to your data. </p>
        </div>
        <div className="container box">
          <p className="bold">Who sees the tasks I post? Who sees my answers?</p>
          <p>Truecoin values anonymity, and no one can associate tasks or answers with anything except your ethereum wallet address. However, the contents of your submissions are visible to others, so be sure to never include any sensitive information in your tasks. </p>
        </div>
        <div className="container box">
          <p className="bold">What are the RBTS and Endogenous mechanisms?</p>
          <p><a href='http://www-bcf.usc.edu/~shaddin/cs699fa17/docs/BTS_robust.pdf'>Robust Bayesian Truth Serum</a> and the <a href='http://www.arpitaghosh.com/papers/elicit_arxiv.pdf'>Endogenous Mechanism</a> are two incentive-compatible scoring mechanisms, which means they compute payments in a way that rewards participants for responding truthfully. </p>
        </div>
      </div>
    </div>
  );
}