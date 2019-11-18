import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import { Container } from '../_layouts/Dashboard/styles';
import { Table } from './styles';

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadRegistrations = useCallback(
    async (pageNumber = page) => {
      try {
        if ((totalPages && pageNumber > totalPages) || totalPages === 0) return;

        const response = await api.get('registrations', {
          params: {
            page: pageNumber,
          },
        });

        const data = response.data.data.map(item => ({
          ...item,
          start_date: format(parseISO(item.start_date), "MMMM dd',' yyyy"),
          due_date: format(parseISO(item.due_date), "MMMM dd',' yyyy"),
        }));

        setRegistrations(pageNumber === 1 ? data : [...registrations, data]);

        setPage(pageNumber);

        setTotalPages(Math.ceil(response.data.total / 20));
      } catch (error) {
        errorHandler(error);
      }
    },
    [page, registrations, totalPages]
  );

  useEffect(() => {
    loadRegistrations(1);
  }, []); //eslint-disable-line

  async function handleDelete(id) {
    if (!window.confirm('Are sure?')) return;

    try {
      await api.delete(`registrations/${id}`);

      setRegistrations(registrations.filter(s => s.id !== id));
    } catch (error) {
      errorHandler(error);
    }
  }

  async function handlePage(qty) {
    if (page + qty <= 0) return;

    await loadRegistrations(page + qty);
  }

  return (
    <Container>
      <header>
        <strong>Managing registrations</strong>

        <div>
          <Link to="/registrations/new">
            <MdAdd color="#fff" size={20} />
            CREATE
          </Link>
        </div>
      </header>

      <Table>
        <header>
          <strong>STUDENT</strong>
          <strong>PLAN</strong>
          <strong>START ON</strong>
          <strong>ENDS IN</strong>
          <strong>ACTIVE</strong>
          <strong> </strong>

          <aside>
            <button type="button" onClick={() => handlePage(-1)}>
              <MdChevronLeft color="#444" size={20} />
            </button>

            <span>{page}</span>

            <button type="button" onClick={() => handlePage(1)}>
              <MdChevronRight color="#444" size={20} />
            </button>
          </aside>
        </header>

        <ul>
          {registrations.map(({ student, plan, ...r }) => (
            <li key={r.id}>
              <span>{student.name}</span>
              <span>{plan.title}</span>
              <span>{r.start_date}</span>
              <span>{r.due_date}</span>
              <span>{r.isActive ? 'yes' : 'no'}</span>

              <div>
                <Link to={`/registrations/edit/${r.id}`}>edit</Link>
                <button type="button" onClick={() => handleDelete(r.id)}>
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Table>
    </Container>
  );
}
