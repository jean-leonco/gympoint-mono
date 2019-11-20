import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import DatePicker from '../Form/DatePicker';
import { FormContainer, FormContent, FormInput } from '../Form/styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('The name is required.')
    .max(255, 'The name should not be more than 255.'),
  email: Yup.string()
    .email('It should be a valid email address.')
    .required('The e-mail is required.'),
  birthday: Yup.date('The birthday should be a valid date.').required(
    'The birthday is required.'
  ),
  weight: Yup.number()
    .typeError('The weight should contain numbers only.')
    .min(40, 'The weight should not be less than 40.')
    .required('The weight is required.'),
  heigth: Yup.number()
    .typeError('The heigth should contain numbers only.')
    .integer('The heigth should be an integer.')
    .min(100, 'The heigth should not be less than 100.')
    .required('The heigth is required.'),
});

export default function StudentForm({ data, handleSubmit }) {
  return (
    <FormContainer schema={schema} onSubmit={handleSubmit} initialData={data}>
      <header>
        <strong>Student creation</strong>

        <div>
          <Link to="/students">
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
        <strong>FULL NAME</strong>
        <FormInput name="name" type="text" placeholder="John Doe" />

        <strong>E-MAIL ADDRESS</strong>
        <FormInput name="email" type="text" placeholder="exemplo@email.com" />

        <div>
          <section>
            <strong>BIRTHDAY</strong>
            <DatePicker name="birthday" maxDate={new Date()} />
          </section>

          <section>
            <strong>WEIGHT (kg)</strong>
            <FormInput name="weight" type="number" step="0.5" />
          </section>

          <section>
            <strong>HEIGTH (cm)</strong>
            <FormInput name="heigth" type="number" />
          </section>
        </div>
      </FormContent>
    </FormContainer>
  );
}

StudentForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    weight: PropTypes.number,
    heigth: PropTypes.number,
  }),
  handleSubmit: PropTypes.func.isRequired,
};

StudentForm.defaultProps = {
  data: null,
};
