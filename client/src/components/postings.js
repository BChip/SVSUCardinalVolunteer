import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import Header from './header';


class Postings extends PureComponent {
   postings = this.props.postings
  

  componentWillMount() {
    this.props.fetchPostings();
  }

  renderPostings() {
    return this.props.postings.map(posting => {
        return (
        <div>
          <p>Title: {posting.title}</p>
          <p>Description: {posting.description}</p>
          <p>Created: {posting.createdAt}</p>
        </div>)
    });
  }

  render() {
    
    if (!this.props.postings) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Header />
        <h4>Postings</h4>
        <ul>
          {this.renderPostings()}
        </ul>
        <Link to='../Signout'>Log out</Link>
      </div>
    );
  }
}

Postings.propTypes = {
  fetchPostings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ postings: state.postings.homePagePostings });

export default connect(mapStateToProps, actions)(Postings);
