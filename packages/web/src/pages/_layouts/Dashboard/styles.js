import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${colors.background};
`;

export const Container = styled.div`
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

    a {
      background: ${colors.secundary};
      color: #fff;
      font-size: 1.4rem;
      font-weight: bold;
      padding: 1rem 1.6rem;

      border-radius: 4px;
      transition: background 0.2s;

      svg {
        margin-right: 8px;
      }

      &:hover {
        background: ${colors.main};
      }
    }
  }
`;
