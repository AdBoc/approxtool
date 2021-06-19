import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
    <div>
      <p>Main Page</p>
      <Link to="/user-service">User Service</Link>
      <Link to="/model-service">Model Service</Link>
    </div>
  );
};