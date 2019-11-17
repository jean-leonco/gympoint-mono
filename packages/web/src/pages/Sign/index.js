import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import history from '../../services/history';
import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import { Container, Content, SubmitButton } from './styles';

import logo from '../../assets/logo.svg';
import dumbbell from '../../assets/dumbbell.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('It should be a valid email address.')
    .required('The e-mail is required.'),
  password: Yup.string().required('The password is required.'),
});

export default function Sign() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit({ email, password }) {
    try {
      setLoading(true);
      await api.post('/sessions', { email, password });
      setLoading(false);

      history.push('/students');
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="GymPoint" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <label htmlFor="email">YOUR E-MAIL</label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="example@email.com"
          />

          <label htmlFor="password">YOUR PASSWORD</label>
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="*************"
          />

          <SubmitButton
            type="submit"
            disabled={loading}
            loading={loading ? 1 : 0}
          >
            {loading ? (
              <img src={dumbbell} alt="loading" />
            ) : (
              'Access the system'
            )}
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
}
