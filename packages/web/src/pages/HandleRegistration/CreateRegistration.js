import React from 'react';
import { toast } from 'react-toastify';

import Form from '../../components/RegistrationForm';

import api from '../../services/api';
import history from '../../services/history';
import errohandler from '../../util/errorHandler';

export default function CreateRegistration() {
  async function handleSubmit(data) {
    try {
      await api.post('registrations', data);

      toast.success('Registration created with success');
      history.push('/registrations');
    } catch (error) {
      errohandler(error);
    }
  }

  return <Form handleSubmit={handleSubmit} />;
}
