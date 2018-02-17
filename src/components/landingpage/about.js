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
    </div>
  );
}