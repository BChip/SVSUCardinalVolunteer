import React, { Component } from 'react';
import Header from './header';

export default props => (

  <div>
    <Header />
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        <div className="col-md-12">
          {props.children}
        </div>
      </div>
    </div>
  </div>
);
