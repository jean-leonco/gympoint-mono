import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Form from '../../components/RegistrationForm';

import api from '../../services/api';
import history from '../../services/history';
import errohandler from '../../util/errorHandler';

export default function EditRegistration({ match }) {
  const { id } = match.params;

  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    async function loadRegistration() {
      try {
        const response = await api.get(`registrations/${id}`);
        setRegistration(response.data);
      } catch (error) {
        errohandler(error);
      }
    }

    loadRegistration();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`registrations/${id}`, data);

      toast.success('Registration updated with success');
      history.push('/registrations');
    } catch (error) {
      errohandler(error);
    }
  }

  return <Form handleSubmit={handleSubmit} data={registration} />;
}

EditRegistration.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
