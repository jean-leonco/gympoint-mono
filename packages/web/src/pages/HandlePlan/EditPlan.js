import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Form from '../../components/PlanForm';

import api from '../../services/api';
import history from '../../services/history';
import errohandler from '../../util/errorHandler';

export default function EditPlan({ match }) {
  const { id } = match.params;

  const [plan, setPlan] = useState(null);

  useEffect(() => {
    async function loadPlan() {
      try {
        const response = await api.get(`plans/${id}`);
        setPlan(response.data);
      } catch (error) {
        errohandler(error);
      }
    }

    loadPlan();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`plans/${id}`, data);

      toast.success('Plan updated with success');
      history.push('/plans');
    } catch (error) {
      errohandler(error);
    }
  }

  return <Form handleSubmit={handleSubmit} data={plan} />;
}

EditPlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
