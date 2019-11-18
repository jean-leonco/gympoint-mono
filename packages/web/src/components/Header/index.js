import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../store/modules/auth/actions';

import { Container, Content, Link } from './styles';

import logo from '../../assets/logo-side.svg';

export default function Header() {
  const { name } = useSelector(state => state.user);
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(logOut());
  }

  return (
    <Container>
      <Content>
        <aside>
          <img src={logo} alt="GymPoint" />

          <nav>
            <Link to="/students">STUDENTS</Link>

            <Link to="/plans">PLANS</Link>

            <Link to="/registrations">REGISTRATIONS</Link>

            <Link to="/assistance-requests">ASSISTANCE REQUESTS</Link>
          </nav>
        </aside>

        <div>
          <strong>{name}</strong>
          <button type="button" onClick={handleLogOut}>
            log out
          </button>
        </div>
      </Content>
    </Container>
  );
}
