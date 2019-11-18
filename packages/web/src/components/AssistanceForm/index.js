import React from 'react';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string()
    .required('The answer is required.')
    .max(280, 'The answer should not be more than 280.'),
});

export default function AssistanceForm({ open, close, handleReply, request }) {
  return (
    <Container
      id="container"
      open={open}
      onClick={e => {
        const container = document.getElementById('container');

        if (e.target === container) {
          close();
        }
      }}
    >
      <Content schema={schema} onSubmit={handleReply}>
        <strong>STUDENT QUESTION</strong>
        <p>{request && request.question}</p>

        <strong>YOUR ANSWER</strong>
        <Input
          multiline
          name="answer"
          id="answer"
          placeholder="A happy student makes the environment better. Answer with love :)"
          rows="5"
        />

        <button type="submit">Answer student</button>
      </Content>
    </Container>
  );
}

AssistanceForm.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  request: PropTypes.shape({
    question: PropTypes.string,
  }),
};

AssistanceForm.defaultProps = {
  request: null,
};
