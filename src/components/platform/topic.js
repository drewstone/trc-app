import React, { Component } from 'react';

export default class TopicPage extends Component {
  render() {
    return (
      <section className="articles">
        <div class="column is-8 is-offset-2">
          <div className="card article">
            <div className="card-content">
              <div className="media">
                <div className="media-center">
                    <img src="http://www.radfaces.com/images/avatars/daria-morgendorffer.jpg" className="author-image" alt="Placeholder image" />
                </div>
                <div className="media-content has-text-centered">
                  <h1 className="title article-title is-1">{this.props.topic.topic}</h1>
                  <p className="subtitle is-6 article-subtitle">
                    Creation time: {this.props.topic.creationTime}
                  </p>
                </div>
              </div>

            <div className="content article-body" style={{height: `${window.innerHeight}px`}}>
                <p>Non arcu risus quis varius quam quisque. Dictum varius duis at consectetur lorem. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. </p>
                <p>Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Accumsan lacus vel facilisis volutpat. Non sodales neque sodales ut etiam. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.</p>
                <h3 className="has-text-centered">Feugiat sed lectus vestibulum mattis.</h3>
                <p> Molestie ac feugiat sed lectus vestibulum. Feugiat sed lectus vestibulum mattis. Volutpat diam ut venenatis tellus in metus vulputate. Feugiat in fermentum posuere urna nec. Pharetra convallis posuere morbi leo urna molestie at. Accumsan lacus vel facilisis volutpat est velit egestas. Fermentum leo vel orci porta. Faucibus interdum posuere lorem ipsum.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}