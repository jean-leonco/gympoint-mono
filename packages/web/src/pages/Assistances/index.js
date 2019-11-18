import React, { useState, useEffect, useCallback } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import { Container } from '../_layouts/Dashboard/styles';
import { Table } from './styles';
import AssistanceForm from '../../components/AssistanceForm';

export default function Assistances() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const loadRequests = useCallback(
    async (pageNumber = page) => {
      try {
        if ((totalPages && pageNumber > totalPages) || totalPages === 0) return;

        const { data } = await api.get('assistance-requests', {
          params: {
            page: pageNumber,
          },
        });

        setRequests(pageNumber === 1 ? data.data : [...requests, data.data]);

        setPage(pageNumber);

        setTotalPages(Math.ceil(data.total / 20));
      } catch (error) {
        errorHandler(error);
      }
    },
    [page, requests, totalPages]
  );

  useEffect(() => {
    loadRequests(1);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (selectedRequest) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  }, [selectedRequest]);

  async function handleReply({ answer }) {
    try {
      await api.post(`assistance-requests/${selectedRequest.id}/answer`, {
        answer,
      });

      setRequests(requests.filter(req => req.id !== selectedRequest.id));

      setSelectedRequest(null);
    } catch (error) {
      errorHandler(error);
    }
  }

  async function handlePage(qty) {
    if (page + qty <= 0) return;

    await loadRequests(page + qty);
  }

  return (
    <>
      <Container>
        <header>
          <strong>Assistances requests</strong>
        </header>

        <Table>
          <header>
            <strong>STUDENT</strong>
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
            {requests.map(({ student, ...a }) => (
              <li key={a.id}>
                <span>{student.name}</span>

                <div>
                  <button type="button" onClick={() => setSelectedRequest(a)}>
                    reply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Table>
      </Container>

      <AssistanceForm
        open={modalIsOpen}
        close={() => setSelectedRequest(null)}
        handleReply={handleReply}
        request={selectedRequest}
      />
    </>
  );
}
