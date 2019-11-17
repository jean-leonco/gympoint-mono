import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';

import { Wrapper } from './styles';

export default function Dashboard({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};
