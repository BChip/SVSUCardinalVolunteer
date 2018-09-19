import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        <div className="col-md-12">
          {children}
        </div>
      </div>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default App;
