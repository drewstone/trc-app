import React, { Component } from 'react';

export default function AboutPage({ switchTo, screens }) {
  return (
    <div className="hero-body">
      <div className="container is-transparent">
        <div className="column is-6">
          <p className="title is-size-1">Subjective data collection is tough and cumbersome.</p>
        </div>
        <div className="column content">
          <ul>
            <li><p className="is-size-4">Questions are constantly recycled while past responses are kept privatized</p></li>
            <li><p className="is-size-4">Truthfulness isn't often guaranteed or incentivized</p></li>
            <li><p className="is-size-4">Payments are not seamlessly integrated</p></li>
            <li><p className="is-size-4">Scoring is not transparent</p></li>
          </ul>
        </div>
      </div>

      <div className="container has-text-centered is-transparent">
        <a className="button is-primary rounded" href="https://docs.google.com/document/d/1X8r9VZhvKftZJRmrALR_gZCkSbms_43UAhOPhADWb-M/edit?usp=sharing">
          <h3 className="title is-size-3">Get the whitepaper!</h3></a>
      </div>
    </div>
  );
}