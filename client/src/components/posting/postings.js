import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import Header from '../header/header';


class Postings extends PureComponent {
  componentWillMount() {
    this.props.fetchPostings();
  }

  handleDelete(postselectedid) {
    this.props.deletePost(postselectedid);
  }


  renderPostings() {
    return this.props.postings.map(posting => (
      <div className="card eventcard" key={posting.id}>
        <img src={`${window.location.origin}/cardinal volunteer_long.jpg`} className="card-img-top" alt="eventlogo" />
        <div className="card-body">
          <h5 className="card-title"><b>{posting.title}</b></h5>
          <p className="card-text">{posting.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Date:</b>
            {' '}
            {posting.time}
          </li>
          <li className="list-group-item">
            <b>Category:</b>
            {' '}
            {posting.category.toUpperCase()}
          </li>
          <li className="list-group-item">
            <b>Location:</b>
            {' '}
            {posting.location}
          </li>
        </ul>
        <div className="card-body">

          { localStorage.getItem('id') === posting.user.id && <Link className="btn btn-link" to={`/editpost/${posting.id}`}>Edit</Link>}
          { localStorage.getItem('role') === 'admin' && <button className="btn btn-link" onClick={() => this.handleDelete(posting.id)}>Delete</button>}
          { ((localStorage.getItem('role') === 'community partner' && posting.user.id === localStorage.getItem('id')) || localStorage.getItem('role') === 'admin') && <button className="btn btn-link" onClick={() => this.handleVolunteers(posting.id)}>Volunteers view</button>}
          <button className="btn btn-link">Sign Up</button>

        </div>
      </div>
    ));
  }

  render() {
    if (this.props.postings === null || this.props.postings.length === 0) {
      return (
        <div>
          <Header />
          <div className="row">
            <div className="col-md-10 offset-1">
              <p className="eventlist">Events</p>
              <div className="card eventcard">
                <h5 className="card-title text-center"><b>Sorry There are no more posting available</b></h5>
                <img src={`${window.location.origin}/Volunteer_nopost.jpg`} className="card-img-top" alt="nomorepost" />

              </div>
            </div>
          </div>

        </div>
      );
    }
    return (
      <div>
        <Header />

        <div className="row">
          <div className="col-md-10 offset-1">
            <p className="eventlist">Events</p>
            {this.renderPostings()}
          </div>
        </div>
      </div>
    );
  }
}

Postings.propTypes = {

  fetchPostings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const posting = state.postings.homePagePostings;

  if (!posting || posting.length === 0) {
    return {
      postings: null,
    };
  }
  return {
    postings: posting.filter(
      visibleposting => (visibleposting.visible === true && visibleposting.valid === true
                                       && new Date(visibleposting.time) >= new Date()),
    ),
  };
};

export default connect(mapStateToProps, actions)(Postings);
