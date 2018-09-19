import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Postings extends PureComponent {
  postings = this.props.postings

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

Postings.propTypes = {
  fetchPostings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ postings: state.postings.homePagePostings });

export default connect(mapStateToProps, actions)(Postings);
