class Student {
  async handle({ params, request, response }, next) {
    const { studentid } = request.request.headers;

    const { students_id } = params;

    if (!studentid) {
      return response.status(401).send({
        error: {
          message: 'The studentid is required.',
        },
      });
    }

    if (studentid !== students_id) {
      return response.status(401).send({
        error: {
          message: 'You should only access your own data',
        },
      });
    }

    return next();
  }
}

module.exports = Student;
