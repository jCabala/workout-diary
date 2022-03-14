import React from 'react';
import PageContext from './PageContext';
import UserContext from './UserContext';

const ContextMixin = ({ children }) => {
  return (
    <UserContext>
      <PageContext>{children}</PageContext>
    </UserContext>
  );
};

export default ContextMixin;
