import React from 'react';
import { toast } from 'react-toastify';

import Form from '../../components/PlanForm';

import api from '../../services/api';
import history from '../../services/history';
import errohandler from '../../util/errorHandler';

export default function CreateStudent() {
  async function handleSubmit(data) {
    try {
      await api.post('plans', data);

      toast.success('Plan created with success');
      history.push('/plans');
    } catch (error) {
      errohandler(error);
    }
  }

  return <Form handleSubmit={handleSubmit} />;
}
