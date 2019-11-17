import { toast } from 'react-toastify';

export default err => {
  if (!err.response) {
    toast.error('Could not connect to server. Try later :(');
    return;
  }

  const { data } = err.response;

  if (data.error.message) {
    toast.error(data.error.message);
    return;
  }

  if (data[0]) {
    data.map(error => toast.error(error.message));
  }
};
