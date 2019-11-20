import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Form from '../../components/StudentForm';

import api from '../../services/api';
import history from '../../services/history';
import errohandler from '../../util/errorHandler';

export default function EditStudent({ match }) {
  const { id } = match.params;

  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function loadStudent() {
      try {
        const data = await api.get(`students/${id}`);

        setStudent(data.data);
      } catch (error) {
        errohandler(error);
      }
    }

    loadStudent();
  }, [id]);

  async function handleSubmit(data) {
    try {
      await api.put(`students/${id}`, data);

      toast.success('Student updated with success');
      history.push('/students');
    } catch (error) {
      errohandler(error);
    }
  }

  return <Form handleSubmit={handleSubmit} data={student} />;
}

EditStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
