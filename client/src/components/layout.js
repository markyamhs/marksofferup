import React from 'react';
import PrimarySearchAppBar from './navbar';
import PropTypes from 'prop-types'; 
import './layout.scss';

export default function Layout({ children }) {
  return (
    <div>
      <PrimarySearchAppBar />
      <div id="bodyContainer">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
}
