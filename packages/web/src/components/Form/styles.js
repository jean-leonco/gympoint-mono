import styled from 'styled-components';
import { Form, Input } from '@rocketseat/unform';

import ReactSelect from '../RegistrationForm/SelectInput';
import colors from '../../styles/colors';

export const FormContainer = styled(Form)`
  max-width: 1200px;
  margin: 6.4rem 3rem;

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

  @media (max-width: 530px) {
    header {
      flex-direction: column;

      strong {
        margin-bottom: 2rem;
      }
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
    margin-top: 2rem;
  }

  span {
    color: ${colors.cancel};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.1rem 0 1rem 0.4rem;

    align-self: flex-start;
  }

  > div {
    display: flex;
    flex-direction: row;

    @media (max-width: 820px) {
      flex-direction: column;
    }

    section {
      width: 100%;
      margin: 0 1.5rem 0 0;
      display: flex;
      flex-direction: column;

      &:last-child {
        margin: 0;
      }
    }

    .react-datepicker__input-container input {
      width: 100%;
      color: ${colors.text};
      padding: 1rem 1.6rem;

      border: 1px solid #ddd;
      border-radius: 4px;

      &::placeholder {
        color: #999;
      }
    }

    .react-datepicker {
      color: ${colors.text};
      font-size: 1.2em;
      font-family: inherit;

      border: none;
      border-radius: 4px;
    }

    .react-datepicker__header {
      background: ${colors.main};
      padding-top: 0.8em;
      border-bottom: none;
    }

    .react-datepicker__month {
      margin: 0.4em 1em;
    }

    .react-datepicker__day-name,
    .react-datepicker__day {
      width: 1.9em;
      line-height: 1.9em;
      margin: 0.166em;
    }

    .react-datepicker__current-month {
      font-size: 1em;
    }

    .react-datepicker__navigation {
      top: 1.2em;
      line-height: 1.7em;
      border: 0.45em solid transparent;
    }

    .react-datepicker__navigation--previous {
      border-right-color: #ccc;
      left: 1em;
    }

    .react-datepicker__navigation--next {
      border-left-color: #ccc;
      right: 1em;
    }

    .react-datepicker__current-month,
    .react-datepicker__day-name {
      color: #fff;
    }
  }
`;

export const FormInput = styled(Input)`
  background: ${props => (props.readOnly ? '#f5f5f5' : '#fff')};
  color: ${colors.text};
  padding: 1rem 1.6rem;

  border: 1px solid #ddd;
  border-radius: 4px;

  &::placeholder {
    color: #999;
  }
`;

export const FormSelect = styled(ReactSelect).attrs({
  classNamePrefix: 'react-select',
})`
  .react-select__control {
    width: 100%;
    color: ${colors.text};

    border: 1px solid #ddd;
    box-shadow: none;

    &:hover {
      border-color: #ddd;
    }
  }

  .react-select__placeholder {
    color: #999;
  }

  .react-select__indicators span {
    color: ${colors.secundary};
    font-size: 1rem;
    margin: 0 0.2rem;
  }
`;
