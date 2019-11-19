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

    div {
      display: flex;
      flex-direction: row;

      a {
        background: ${colors.secundary};
        color: #fff;
        font-size: 1.4rem;
        font-weight: bold;
        padding: 1rem 1.6rem;

        border-radius: 4px;
        transition: background 0.2s;

        display: flex;
        align-items: center;

        svg {
          margin-right: 0.8rem;
        }

        &:hover {
          background: ${colors.main};
        }
      }

      div {
        position: relative;
        margin-left: 1.6rem;

        input {
          background: #fff;
          color: ${colors.text};

          padding: 10px 16px 10px 40px;

          border: 1px solid #ddd;
          border-radius: 4px;

          &::placeholder {
            color: #999;
          }
        }

        svg {
          position: absolute;
          top: 25%;
          left: 16px;
        }
      }
    }
  }
`;
