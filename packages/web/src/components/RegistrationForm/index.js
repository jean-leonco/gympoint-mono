import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { format, addMonths, parseISO } from 'date-fns';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import DatePicker from '../Form/DatePicker';

import {
  FormContainer,
  FormContent,
  FormInput,
  FormSelect,
} from '../Form/styles';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .integer()
    .typeError('The student id shoud be an integer.')
    .required('The student id is required.'),
  plan_id: Yup.number()
    .integer()
    .typeError('The plan id should be an integer.')
    .required('The plan id is required.'),
  start_date: Yup.date('The start date should be a valid date.').required(
    'The start date is required.'
  ),
});

export default function RegistrationForm({ data, handleSubmit }) {
  const [plan, setPlan] = useState('');
  const [plans, setPlans] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    if (data) {
      setPlan({ ...data.plan, label: data.plan.title });

      setStartDate(parseISO(data.start_date));
    }
  }, [data]);

  useEffect(() => {
    async function LoadPlans() {
      try {
        const response = await api.get('plans');

        const responsePlans = response.data.data.map(item => ({
          ...item,
          label: item.title,
        }));

        setPlans(responsePlans);
      } catch (error) {
        errorHandler(error);
      }
    }

    LoadPlans();
  }, []);

  useEffect(() => {
    if (!startDate || !plan) return;

    setDueDate(format(addMonths(startDate, plan.duration), "MMMM dd',' yyyy"));
  }, [plan, startDate]);

  useEffect(() => {
    if (!plan) return;

    setTotal(plan.price * plan.duration);
  }, [plan]);

  async function loadStudents(inputValue) {
    async function filter() {
      const response = await api.get('students', {
        params: {
          name: inputValue,
        },
      });

      const students = response.data.data.map(item => ({
        ...item,
        label: item.name,
      }));

      return students;
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filter());
      }, 1000);
    });
  }

  return (
    <FormContainer schema={schema} onSubmit={handleSubmit} initialData={data}>
      <header>
        <strong>Registration creation</strong>

        <div>
          <Link to="/registrations">
            <MdKeyboardArrowLeft color="#fff" size={20} />
            GO BACK
          </Link>

          <button type="submit">
            <MdCheck color="#fff" size={20} />
            SAVE
          </button>
        </div>
      </header>

      <FormContent>
        <strong>STUDENT</strong>

        <FormSelect
          name="student_id"
          placeholder="Search student"
          isSearchable
          async
          loadOptions={loadStudents}
        />

        <div>
          <section>
            <strong>PLAN</strong>
            <FormSelect
              name="plan_id"
              placeholder="Select the plan"
              setValue={setPlan}
              options={plans}
            />
          </section>

          <section>
            <strong>START DATE</strong>
            <DatePicker
              name="start_date"
              minDate={new Date()}
              setValue={setStartDate}
              value={startDate}
            />
          </section>

          <section>
            <strong>DUE DATE</strong>
            <FormInput name="due-date" type="text" value={dueDate} readOnly />
          </section>

          <section>
            <strong>FINAL PRICE</strong>
            <FormInput name="total" type="text" value={`$ ${total}`} readOnly />
          </section>
        </div>
      </FormContent>
    </FormContainer>
  );
}

RegistrationForm.propTypes = {
  data: PropTypes.shape({
    plan: PropTypes.object,
    student: PropTypes.object,
    start_date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }),
  handleSubmit: PropTypes.func.isRequired,
};

RegistrationForm.defaultProps = {
  data: null,
};
