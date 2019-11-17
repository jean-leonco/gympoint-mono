import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import colors from '../../styles/colors';

export const Container = styled.div`
  background: #fff;
  padding: 0 3rem;
`;

export const Content = styled.div`
  width: 100%;
  height: 64px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  aside {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    nav {
      margin-left: 30px;
      padding-left: 30px;
      border-left: 1px solid #ddd;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    strong {
      color: ${colors.text};
      margin-bottom: 0.2rem;
    }

    button {
      background: none;
      color: ${colors.cancel};
      border: 0;
    }
  }
`;

export const Link = styled(NavLink).attrs({ activeClassName: 'active' })`
  color: ${colors.nav};
  font-size: 1.5rem;
  font-weight: bold;

  & + a {
    margin-left: 2rem;
  }

  &.active {
    color: ${colors.label};
  }
`;
