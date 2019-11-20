import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { FormContainer, FormContent, FormInput } from '../Form/styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .required('The title is required.')
    .max(255, 'The title should not be more than 255.'),
  duration: Yup.number()
    .integer('The duration should be an integer.')
    .typeError('The duration should be an integer.')
    .min(1, 'The duration should not be less than 1.')
    .required('The duration is required.'),
  price: Yup.number()
    .typeError('The price should contain numbers only.')
    .min(1, 'The price should not be less than 1.')
    .required('The price is required.'),
});

export default function PlanForm({ data, handleSubmit }) {
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    setTotal(Number(price) * Number(duration));
  }, [duration, price]);

  useEffect(() => {
    if (data) {
      setDuration(data.duration);
      setPrice(data.price);
    }
  }, [data]);

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
              step="1"
              value={duration}
              onChange={e => setDuration(e.target.value)}
            />
          </section>

          <section>
            <strong>MONTHLY PRICE</strong>
            <FormInput
              name="price"
              type="number"
              step="0.5"
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
