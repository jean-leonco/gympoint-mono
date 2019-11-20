import React from 'react';
import { toast } from 'react-toastify';

import Form from '../../components/StudentForm';

import api from '../../services/api';
import history from '../../services/history';
import errohandler from '../../util/errorHandler';

export default function CreateStudent() {
  async function handleSubmit(data) {
    try {
      await api.post('students', data);

      toast.success('Student created with success');
      history.push('/students');
    } catch (error) {
      errohandler(error);
    }
  }

  return <Form handleSubmit={handleSubmit} />;
}
