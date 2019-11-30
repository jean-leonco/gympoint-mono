import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdMenu } from 'react-icons/md';

import api from '../../services/api';
import ws from '../../services/websocket';

import { logOut } from '../../store/modules/auth/actions';

import { Container, Content, Menu, Link, Badge } from './styles';

import logo from '../../assets/logo-side.svg';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const { name } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadNotifications() {
      const { data } = await api.get('assistance-requests');

      setNotifications(Number(data.total));
    }

    loadNotifications();
  });

  useEffect(() => {
    const channel =
      ws.getSubscription('assistance-request') ||
      ws.subscribe('assistance-request');

    channel.on('notification', ({ total }) => setNotifications(Number(total)));
  }, []);

  function handleLogOut() {
    dispatch(logOut());
  }

  return (
    <Container>
      <Content hasunread={notifications ? 1 : 0}>
        <aside>
          <img src={logo} alt="GymPoint" />

          <Menu open={open ? 1 : 0}>
            <button onClick={() => setOpen(!open)} type="button">
              <MdMenu size={24} color="#999" />
            </button>

            <nav className={open ? 'open' : undefined}>
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
                {notifications && (
                  <Badge>
                    <span>{notifications}</span>
                  </Badge>
                )}
              </Link>
            </nav>
          </Menu>

          <nav>
            <Link to="/students">STUDENTS</Link>

            <Link to="/plans">PLANS</Link>

            <Link to="/registrations">REGISTRATIONS</Link>

            <Link to="/assistance-requests">
              ASSISTANCE REQUESTS
              {notifications && (
                <Badge>
                  <span>{notifications}</span>
                </Badge>
              )}
            </Link>
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
