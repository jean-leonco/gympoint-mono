import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

import colors from '../../styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  position: fixed;
  left: 0;
  top: 0;

  display: ${props => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  z-index: 2;

  overflow: auto;
`;

export const Content = styled(Form)`
  width: 100%;
  max-width: 450px;
  background: #fff;
  padding: 3rem 2.6rem;

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  display: flex;
  flex-direction: column;

  strong {
    color: ${colors.label};
    margin-bottom: 0.8rem;
  }

  p {
    color: ${colors.text};
    font-size: 1.6rem;
    line-height: 2.6rem;
    margin-bottom: 2rem;
  }

  textarea {
    color: ${colors.text};
    font-size: 1.6rem;
    line-height: 1.9rem;
    padding: 1.5rem;

    border: 1px solid #ddd;
    border-radius: 4px;

    resize: none;
  }

  span {
    color: ${colors.cancel};
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.1rem 0 1rem 0.4rem;

    align-self: flex-start;
  }

  button {
    width: 100%;
    height: 45px;
    background: ${colors.secundary};
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 2rem;

    border: 0;
    border-radius: 4px;
  }
`;
