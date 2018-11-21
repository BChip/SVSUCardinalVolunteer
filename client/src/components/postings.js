import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './header';


class Postings extends PureComponent {
   postings = this.props.postings;

   componentWillMount() {
     this.props.fetchPostings();
   }

   handleDelete(postselectedid) {
     this.props.deletePost(postselectedid);
   }

   disable(userid) {
     return {
       display: ((userid === localStorage.getItem('id')) ? '' : 'none'),
     };
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


           <button className="btn btn-link" style={this.disable(posting.user.id)} onClick={() => this.handleDelete(posting.id)}>Delete</button>
           <button className="btn btn-link">View</button>
           <button className="btn btn-link">Sign Up</button>
           <button className="btn btn-link">Edit</button>
         </div>
       </div>
     ));
   }

   render() {
     if (!this.props.postings) {
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

const mapStateToProps = state => ({ postings: state.postings.homePagePostings });

export default connect(mapStateToProps, actions)(Postings);
