import styled from 'styled-components';
import { Form, Input } from '@rocketseat/unform';

import ReactSelect from '../RegistrationForm/SelectInput';
import colors from '../../styles/colors';

export const FormContainer = styled(Form)`
  max-width: 1200px;
  margin: 6.4rem auto;

  display: flex;
  flex-direction: column;

  header {
    width: 100%;

    align-self: center;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-size: 2.4rem;
      color: ${colors.label};
    }

    div {
      display: flex;
      flex-direction: row;

      a,
      button {
        width: 112px;
        color: #fff;
        font-size: 1.4rem;
        font-weight: bold;
        padding: 1rem 0.8rem;

        border: 0;
        border-radius: 4px;
        transition: opacity 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          opacity: 0.9;
        }

        svg {
          margin-right: 0.8rem;
        }
      }
    }

    a {
      background: #ccc;
    }

    button {
      background: ${colors.secundary};
      margin-left: 1.6rem;
    }
  }
`;

export const FormContent = styled.div`
  background: #fff;
  margin: 2rem 0;
  padding: 3rem;
  border-radius: 4px;

  display: flex;
  flex-direction: column;

  strong {
    color: ${colors.label};
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
  }

  div {
    display: flex;
    flex-direction: row;

    section {
      width: 100%;
      margin: 0 1.5rem 0 0;
      display: flex;
      flex-direction: column;

      &:last-child {
        margin: 0;
      }
    }
  }
`;

export const FormInput = styled(Input)`
  background: ${props => (props.readOnly ? '#f5f5f5' : '#fff')};
  color: ${colors.text};
  padding: 1rem 1.6rem;
  margin-bottom: 2rem;

  border: 1px solid #ddd;
  border-radius: 4px;

  &::placeholder {
    color: #999;
  }
`;

export const FormSelect = styled(ReactSelect).attrs({
  classNamePrefix: 'react-select',
  className: 'select',
})`
  .react-select__control {
    width: 100%;
    color: ${colors.text};
    margin-bottom: 2rem;

    border: 1px solid #ddd;
    box-shadow: none;

    &:hover {
      border-color: #ddd;
    }
  }

  .react-select__placeholder {
    color: #999;
  }
`;
