import styled, { keyframes } from 'styled-components';

import colors from '../../styles/colors';

const size = keyframes`
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
`;

export const Container = styled.div`
  min-height: 100%;
  background: ${colors.main};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;

  background: #fff;
  padding: 5rem 3rem;
  text-align: center;

  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      color: ${colors.label};
      margin-bottom: 1rem;

      font-weight: bold;

      align-self: flex-start;
    }

    input + label {
      margin-top: 2rem;
    }

    input {
      color: ${colors.label};
      padding: 1.2rem 1.5rem;

      font-size: 1.6rem;

      border: 1px solid #ddd;
      border-radius: 4px;

      &::placeholder {
        color: #999;
      }
    }

    span {
      color: ${colors.cancel};
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0.1rem 0 1rem 0.4rem;

      align-self: flex-start;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 45px;

  background: ${colors.secundary};
  color: #fff;
  padding: 1.2rem;
  margin-top: 1.5rem;

  font-size: 1.6rem;
  font-weight: bold;
  opacity: ${props => (props.loading ? 0.8 : 1)};

  border-radius: 4px;
  border: 0;
  cursor: ${props => (props.loading ? 'not-allowed' : 'pointer')};

  transition: opacity 0.2s;

  &:hover {
    opacity: 0.95;
  }

  img {
    height: 20px;
    animation: ${size} 2s infinite;
  }
`;
