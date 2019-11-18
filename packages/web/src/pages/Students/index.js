import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { differenceInCalendarYears, parseISO } from 'date-fns';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import { Container } from '../_layouts/Dashboard/styles';
import { Table } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [name, setName] = useState('');

  const loadStudents = useCallback(
    async (pageNumber = page, withName = false) => {
      try {
        if (totalPages && pageNumber > totalPages) return;

        const { data } = await api.get('students', {
          params: {
            page: pageNumber,
            name: withName && name,
          },
        });

        const formattedData = data.data.map(s => ({
          ...s,
          age: differenceInCalendarYears(new Date(), parseISO(s.birthday)),
        }));

        setStudents(
          pageNumber === 1 ? formattedData : [...students, formattedData]
        );

        setPage(pageNumber);

        setTotalPages(Math.ceil(data.total / 20));
      } catch (error) {
        errorHandler(error);
      }
    },
    [name, page, students, totalPages]
  );

  useEffect(() => {
    loadStudents(1);
  }, []); //eslint-disable-line

  useEffect(() => {
    loadStudents(1, true);
  }, [name]); //eslint-disable-line

  async function handleDelete(id) {
    try {
      await api.delete(`/students/${id}`);

      setStudents(students.filter(s => s.id !== id));
    } catch (error) {
      errorHandler(error);
    }
  }

  async function handlePage(qty) {
    if (page + qty <= 0) return;

    await loadStudents(page + qty);
  }

  return (
    <Container>
      <header>
        <strong>Managing students</strong>

        <div>
          <Link to="/students/new">
            <MdAdd color="#fff" size={20} />
            CREATE
          </Link>

          <div>
            <MdSearch size={20} color="#999" />
            <input
              name="text"
              type="text"
              placeholder="Search student"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
      </header>

      <Table>
        <header>
          <strong>NAME</strong>
          <strong>E-MAIL</strong>
          <strong>AGE</strong>

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
          {students.map(s => (
            <li key={s.id}>
              <span>{s.name}</span>
              <span>{s.email}</span>
              <span>{s.age}</span>

              <div>
                <Link to={`/students/edit/${s.id}`}>edit</Link>
                <button type="button" onClick={() => handleDelete(s.id)}>
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
