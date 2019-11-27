const Student = use('App/Models/Student');

class StudentSessionController {
  async store({ request, response }) {
    try {
      const id = request.input('student_id');

      if (!id) throw new Error();

      const student = await Student.findOrFail(id);

      return student;
    } catch (error) {
      return response.status(401).send({
        error: {
          message: 'Invalid registration id',
        },
      });
    }
  }
}

module.exports = StudentSessionController;
