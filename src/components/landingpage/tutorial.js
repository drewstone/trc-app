import React, { Component } from 'react';

export default function TutorialPage({ switchTo, screens }) {
  return (
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-size-1">
          Tutorial/Walk-Through
        </h1>
        <div className="row">
          <div className="columns">
            <div className="column is-4">
              <div className="hero is-light box">
                <p>Install the <a className="hero-link" href="http://metamask.io" target="_blank">Metamask</a> Chrome extension and complete setup. This allows you to use Ethereum-based distributed apps from your regular computer browser.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            <div className="column is-4">
              <div className="hero is-light box">
                <p>Visit the TrueCoin Platform</p>
              </div>
            </div>
            <div className="column is-8 is-fullheight">
              <figure class="image is-16x9">
                <img src="./images/tut_platform.jpg" />
              </figure>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            <div className="column is-4">
              <div className="hero is-light box">
                <p>On the left side you will find a list of tags for tasks (more on this later). Clicking on a tag allows you to filter for tasks that match that tag.</p>
              </div>
            </div>
            <div className="column is-8 is-fullheight">
              <figure class="image is-16x9">
                <img src="./images/tut_filter.jpg" />
              </figure>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            <div className="column is-4">
              <div className="hero is-light box">
                <p>Above the tags you will find the New Task button. This provides the interface through which new tasks are created.</p>
              </div>
            </div>
            <div className="column is-8 is-fullheight">
              <figure class="image is-16x9">
                <img src="./images/tut_new.jpg" />
              </figure>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            <div className="column is-4">
              <div className="hero is-light box">
                <p>A “task” is a question that you are posing to the TrueCoin community to which you would like truthful, crowdsourced answers. To find out more about what kinds of questions are best to ask on TrueCoin, visit our FAQ page. As an example, we will try to get answers from the crowd on expected performance of particular stocks.
                <br/><br/>
                Enter a descriptive title for your task. Ex: Do you think the following stocks will go up or down?
                <br/><br/>
                The Account is your unique Metamask address. It allows us to tie tasks back to the users who created them.
                <br/><br/>
                Enter a description to guide users in what kind of answers you are looking for.
                <br/><br/>
                Select a scoring mechanism -- the two options are the Robust Bayesian Truth Serum (RBTS) and the Endogenous Mechanism. You can read more in the FAQ about the differences between the two mechanisms, however we recommend selecting the RBTS mechanism if you are unsure.
                <br/><br/>
                Select tags representative of your task. This allows users to quickly find tasks that they would like to complete.
                <br/><br/>
                Task Events dictates the types of answers you would like to receive to your questions. In our stocks example, we would select “up or down”. If you were trying to collect feedback on preferences between two different UI designs, you might select “left or right”.
                <br/><br/>
                Now you can post the questions associated with your task. Our first question maybe “Do you think GOOG will go up or down?”, followed by a second question that asks “Do you think TSLA will go up or down?”.
                <br/><br/>
                Finally, submit your task!</p>
              </div>
            </div>
            <div className="column is-8 is-fullheight">
              <figure class="image is-16x9">
                <img src="./images/tut_task.jpg" />
              </figure>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            <div className="column is-4">
              <div className="hero is-light box">
                <p>On the Home tab (you can select this via the navigation bar at the top) you will see all tasks available on TrueCoin, from the Asked tab you can see all tasks that you have created, and on the Answered tab you will find the tasks whose questions you have answered.</p>
              </div>
            </div>
            <div className="column is-8 is-fullheight">
              <figure class="image is-16x9">
                <img src="./images/tut_tabs.jpg" />
              </figure>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}