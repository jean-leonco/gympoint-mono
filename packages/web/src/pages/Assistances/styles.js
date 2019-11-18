import styled from 'styled-components';
import colors from '../../styles/colors';

export const Table = styled.div`
  background: #fff;
  margin: 2rem 0;
  padding: 3rem;
  border-radius: 4px;

  header {
    width: 100%;
    margin-bottom: 2rem;

    display: flex;
    justify-content: space-between;

    strong {
      color: ${colors.label};
      font-size: 1.6rem;

      &:nth-child(1) {
        width: 80%;
      }
    }

    aside {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        background: none;
        border: 0;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      span {
        font-size: 1.6rem;
        margin: 0 0.5rem;
      }
    }
  }

  ul {
    li {
      padding-bottom: 1.6rem;
      margin-bottom: 1.6rem;
      border-bottom: 1px solid #eee;

      display: flex;
      justify-content: center;
      align-items: flex-start;

      span {
        color: ${colors.text};
        font-size: 1.6rem;

        &:nth-child(1) {
          width: 80%;
        }
      }

      div {
        width: 20%;

        display: flex;
        justify-content: center;

        button {
          font-size: 1.5rem;
          background: none;
          color: ${colors.confirm};
          border: 0;
        }
      }
    }
  }
`;
