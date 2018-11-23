import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Header from '../header/header';


class PreviewEventList extends PureComponent {
   postings = this.props.postings;

   componentWillMount() {
     this.props.fetchPostings();
   }

   handleDelete(postselectedid) {
     this.props.deletePost(postselectedid);
   }


   renderPostings() {
     const visiblefilter = this.props.postings.filter(
       visibleposting => (visibleposting.visible === false && visibleposting.valid === false),
     );

     return visiblefilter.map(posting => (
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

           { localStorage.getItem('role') === 'admin' && <button className="btn btn-link" onClick={() => this.handleDelete(posting.id)}>Approve</button>}

           {localStorage.getItem('role') === 'admin' && <button className="btn btn-link" onClick={() => this.handleDelete(posting.id)}>Reject</button>}
           { localStorage.getItem('role') === 'community partner' && <button className="btn btn-link" onClick={() => this.handleDelete(posting.id)}>Delete</button>}

           {localStorage.getItem('role') === 'community partner' && <button className="btn btn-link" onClick={() => this.handleDelete(posting.id)}>Edit</button>}
         </div>
       </div>
     ));
   }

   render() {
     if (!this.props.postings || this.props.postings.length === 0) {
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

PreviewEventList.propTypes = {

  fetchPostings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ postings: state.postings.homePagePostings });

export default connect(mapStateToProps, actions)(PreviewEventList);
