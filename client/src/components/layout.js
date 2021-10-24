import React from 'react';
import PrimarySearchAppBar from './navbar';
import './layout.scss';

export default function Layout({ children }) {
  return (
    <div>
      <PrimarySearchAppBar />
      <div id="bodyContainer">{children}</div>
    </div>
  );
}
