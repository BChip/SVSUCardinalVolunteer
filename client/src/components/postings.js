import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Postings extends PureComponent {
  componentWillMount() {
    this.props.fetchPostings();
  }

  renderPostings() {
    return this.props.postings.map(posting => <li key={posting}>{posting}</li>);
  }

  render() {
    if (!this.props.postings) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h4>Postings</h4>
        <ul>
          {this.renderPostings()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ postings: state.postings.homePagePostings });

export default connect(mapStateToProps, actions)(Postings);
