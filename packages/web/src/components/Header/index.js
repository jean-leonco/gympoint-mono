import React from 'react';

import { Container, Content, Link } from './styles';

import logo from '../../assets/logo-side.svg';

export default function Header() {
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
          <strong>User name</strong>
          <button type="button">log out</button>
        </div>
      </Content>
    </Container>
  );
}
