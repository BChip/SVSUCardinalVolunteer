import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import Header from '../header/header';

class Mypostings extends PureComponent {
  componentWillMount() {
    this.props.fetchPostings();
  }

  handleDelete(postselectedid) {
    this.props.deletePost(postselectedid);
  }

  handlersvp(postselectedid) {
    this.props.UpdateRsvp(postselectedid);
  }

  handleVolunteers(status) {
    if (status) { document.getElementById('div2').style.visibility = 'visible'; } else { document.getElementById('div2').style.visibility = 'hidden'; }
  }

  deletersvp(postselectedid) {
    this.props.deleteRsvp(postselectedid);
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


          {posting.rsvp.length <= 0 && <button className="btn btn-link mmm" onClick={() => this.handlersvp(posting.id)}>Sign In</button> }
          {posting.rsvp.length > 0 && posting.rsvp.filter(subscribedusers => subscribedusers._id === localStorage.getItem('id')).length === 0
          && <button className="btn btn-link" onClick={() => this.handlersvp(posting.id)}>Sign In</button> }
          {posting.rsvp.length > 0 && posting.rsvp.filter(subscribedusers => subscribedusers._id === localStorage.getItem('id')).length > 0
          && <button className="btn btn-link" onClick={() => this.deletersvp(posting.id)}>Sign Out</button> }

          {((localStorage.getItem('role') === 'community partner' && posting.user.id === localStorage.getItem('id')) || localStorage.getItem('role') === 'admin')
           && <button className="btn btn-link" onMouseOver={() => this.handleVolunteers(true)} onMouseOut={() => this.handleVolunteers(false)}>Volunteers view</button>}
          <div id="div2" className="div2">
            {posting.rsvp.map(list => <li key={list._id}>{list.name}</li>)}
          </div>

        </div>
      </div>
    ));
  }

  renderRsvpSuccess() {
    if (this.props.rsvpcondition) {
      return (
        <div className="alert alert-danger">
          <p className="text-justify">

            {this.props.rsvpcondition }
          </p>
        </div>
      );
    }
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
            {this.renderRsvpSuccess()}
            {this.renderPostings()}
          </div>
        </div>
      </div>
    );
  }
}

Mypostings.propTypes = {

  fetchPostings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const posting = state.postings.homePagePostings;
  const userole = localStorage.getItem('role');
  let eventlistcollection;
  if (!posting || posting.length === 0) {
    return {
      postings: null,
    };
  }


  if (userole === 'admin') {
    eventlistcollection = posting.filter(eventcollection => (eventcollection.visible === true && eventcollection.valid === true
        && new Date(eventcollection.time) >= new Date() && eventcollection.user.id === localStorage.getItem('id')));
  }
  if (userole === 'community partner') {
    eventlistcollection = posting.filter(eventcollection => (eventcollection.visible === true && eventcollection.valid === true
        && new Date(eventcollection.time) >= new Date() && eventcollection.user.id === localStorage.getItem('id')));
  }
  return {
    postings: eventlistcollection,
    rsvpcondition: state.postings.rsvpcondition,
  };
};

export default connect(mapStateToProps, actions)(Mypostings);
