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
    return this.props.postings.map(posting => (
      <div>
        <a href={`/postings/${posting.id}`} className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{posting.title}</h5>
            <small>{`${posting.location} - ${posting.time}` }</small>
          </div>
          <p className="mb-1">{posting.description}</p>
          <small>{posting.category}</small>
        </a>
      </div>));
  }

  render() {
    if (!this.props.postings) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h4>Postings</h4>
        <div className="list-group">
          {this.renderPostings()}
        </div>
      </div>
    );
  }
}

Postings.propTypes = {
  fetchPostings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ postings: state.postings.homePagePostings });

export default connect(mapStateToProps, actions)(Postings);
