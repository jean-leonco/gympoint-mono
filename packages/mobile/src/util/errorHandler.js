import { showMessage } from 'react-native-flash-message';

export default (err, message) => {
  if (!err.response) {
    showMessage({
      message,
      description: 'Could not connect to server. Try later :(',
      type: 'danger',
      icon: 'info',
    });
    return;
  }

  const { data } = err.response;

  if (data[0]) {
    data.map(error =>
      showMessage({
        message,
        description: error.message,
        type: 'danger',
        icon: 'info',
      })
    );

    return;
  }

  if (data.error.message) {
    showMessage({
      message,
      description: data.error.message,
      type: 'danger',
      icon: 'info',
    });
  }
};
