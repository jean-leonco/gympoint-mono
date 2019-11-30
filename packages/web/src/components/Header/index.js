import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdMenu } from 'react-icons/md';

import { logOut } from '../../store/modules/auth/actions';

import { Container, Content, Menu, Link } from './styles';

import logo from '../../assets/logo-side.svg';

export default function Header() {
  const [open, setOpen] = useState(false);
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

          <Menu open={open ? 1 : 0}>
            <button onClick={() => setOpen(!open)} type="button">
              <MdMenu size={24} color="#999" />
            </button>

            <nav className={open && 'open'}>
              <Link onClick={() => setOpen(false)} to="/students">
                STUDENTS
              </Link>

              <Link onClick={() => setOpen(false)} to="/plans">
                PLANS
              </Link>

              <Link onClick={() => setOpen(false)} to="/registrations">
                REGISTRATIONS
              </Link>

              <Link onClick={() => setOpen(false)} to="/assistance-requests">
                ASSISTANCE REQUESTS
              </Link>
            </nav>
          </Menu>

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
