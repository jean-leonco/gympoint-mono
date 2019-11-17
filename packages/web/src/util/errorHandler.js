import { toast } from 'react-toastify';

export default err => {
  if (!err.response) {
    toast.error('Something got wrong. Could not authenticate. Try later :(');
    return;
  }

  const { data } = err.response;

  if (data.error) {
    toast.error(data.error);
    return;
  }

  if (data[0]) {
    data.map(error => toast.error(error.message));
  }
};
