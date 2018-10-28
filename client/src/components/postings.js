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
         <button className="btn btn-primary btn-small" onClick={() => this.handleDelete(posting.id)}>Delete</button>
       </div>));
   }

   render() {
     if (!this.props.postings) {
       return (
         <div>
           <Header />
           <p>Loading...</p>

         </div>
       );
     }
     return (
       <div>
         <Header />
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
