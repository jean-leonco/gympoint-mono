import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Empty({ children }) {
  return (
    <Container>
      <Icon name="emoji-sad" color="#666" size={80} />
      <Text>{children}</Text>
    </Container>
  );
}

Empty.propTypes = {
  children: PropTypes.string.isRequired,
};
