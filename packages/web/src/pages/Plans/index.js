import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import { Container } from '../_layouts/Dashboard/styles';
import { Table } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPlans = useCallback(
    async (pageNumber = page) => {
      try {
        if ((totalPages && pageNumber > totalPages) || totalPages === 0) return;

        const { data } = await api.get('plans', {
          params: {
            page: pageNumber,
          },
        });

        setPlans(pageNumber === 1 ? data.data : [...plans, data.data]);

        setPage(pageNumber);

        setTotalPages(Math.ceil(data.total / 20));
      } catch (error) {
        errorHandler(error);
      }
    },
    [page, plans, totalPages]
  );

  useEffect(() => {
    loadPlans(1);
  }, []); //eslint-disable-line

  async function handleDelete(id) {
    if (!window.confirm('Are sure?')) return;

    try {
      await api.delete(`plans/${id}`);

      setPlans(plans.filter(s => s.id !== id));
    } catch (error) {
      errorHandler(error);
    }
  }

  async function handlePage(qty) {
    if (page + qty <= 0) return;

    await loadPlans(page + qty);
  }

  return (
    <Container>
      <header>
        <strong>Managing plans</strong>

        <div>
          <Link to="/plans/new">
            <MdAdd color="#fff" size={20} />
            CREATE
          </Link>
        </div>
      </header>

      <Table>
        <header>
          <strong>TITLE</strong>
          <strong>DURATION</strong>
          <strong>VALUE per MONTH</strong>

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
          {plans.map(p => (
            <li key={p.id}>
              <span>{p.title}</span>
              <span>
                {p.duration} {p.duration === 1 ? 'month' : 'months'}
              </span>
              <span>$ {p.price}</span>

              <div>
                <Link to={`/plans/edit/${p.id}`}>edit</Link>
                <button type="button" onClick={() => handleDelete(p.id)}>
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
