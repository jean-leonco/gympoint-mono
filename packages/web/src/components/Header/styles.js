import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import colors from '../../styles/colors';

export const Container = styled.div`
  background: #fff;
  padding: 0 3rem;
  border: 1px solid #ddd;
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

    div + nav {
      margin-left: 30px;
      padding-left: 30px;
      border-left: 1px solid #ddd;

      display: flex;
      flex-direction: row;
    }

    @media (max-width: 820px) {
      img,
      div + nav {
        display: none;
      }
    }
  }

  aside + div {
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

export const Menu = styled.div`
  perspective: 600px;

  z-index: 1;

  button {
    background: none;
    display: flex;
    justify-content: center;
  }

  nav {
    width: 250px;
    background: #fff;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

    transition: transform 250ms, opacity 250ms;
    transform-origin: 50% 16px;
    will-change: transform, opacity;

    position: fixed;
    top: 50px;
    left: 0;
    z-index: 2;

    a + a {
      margin: 2rem 0 0;
    }
  }

  nav:not(.open) {
    opacity: 0;
    transform: scale(0.95) rotate3d(1, 0, 0, -45deg);
  }

  @media (min-width: 821px) {
    button,
    nav {
      display: none;
    }
  }
`;

export const Link = styled(NavLink).attrs({ activeClassName: 'active' })`
  color: ${colors.nav};
  font-size: 1.5rem;
  font-weight: bold;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & + a {
    margin-left: 2rem;
  }

  &.active {
    color: ${colors.label};
  }
`;

export const Badge = styled.div`
  width: 16px;
  height: 16px;
  background: ${colors.secundary};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 0 4px 4px;

  span {
    color: #fff;
    font-size: 10px;
  }
`;
