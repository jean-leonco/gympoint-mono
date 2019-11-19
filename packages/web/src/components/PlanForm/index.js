import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { FormContainer, FormContent, FormInput } from '../Form/styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('The title is required.')
    .max('The title should not be more than 255.'),
  duration: Yup.number()
    .integer('The duration should be an integer.')
    .required('The duration is required.'),
  price: Yup.number('The price should contain numbers only.').required(
    'The price is required.'
  ),
});

export default function PlanForm({ data, handleSubmit }) {
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    setTotal(Number(price) * Number(duration));
  }, [duration, price]);

  return (
    <FormContainer schema={schema} onSubmit={handleSubmit} initialData={data}>
      <header>
        <strong>Plan creation</strong>

        <div>
          <Link to="/plans">
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
        <strong>PLAN TITLE</strong>
        <FormInput name="title" type="text" />

        <div>
          <section>
            <strong>DURATION (in months)</strong>
            <FormInput
              name="duration"
              type="number"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </section>

          <section>
            <strong>MONTHLY PRICE</strong>
            <FormInput
              name="price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </section>

          <section>
            <strong>TOTAL PRICE</strong>
            <FormInput name="total" type="text" value={`$ ${total}`} readOnly />
          </section>
        </div>
      </FormContent>
    </FormContainer>
  );
}

PlanForm.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    duration: PropTypes.number,
    price: PropTypes.number,
  }),
  handleSubmit: PropTypes.func.isRequired,
};

PlanForm.defaultProps = {
  data: null,
};
