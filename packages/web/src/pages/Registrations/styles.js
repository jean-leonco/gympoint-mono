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
        width: 20%;
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        text-align: center;
        width: 16%;
      }
    }

    aside {
      width: 16%;
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
          width: 20%;
        }

        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          text-align: center;
          width: 16%;
        }
      }

      div {
        width: 16%;

        display: flex;
        flex-direction: row;
        justify-content: center;

        a,
        button {
          color: ${colors.confirm};
          font-size: 1.5rem;
        }

        button {
          background: none;
          color: ${colors.cancel};
          margin-left: 2rem;
          border: 0;
        }
      }
    }
  }
`;
