const Student = use('App/Models/Student');

class StudentController {
  async index({ request }) {
    const { page, name } = request.get();

    let students;

    if (name) {
      students = await Student.query()
        .where('name', 'like', name)
        .paginate(page);
    } else {
      students = await Student.query().paginate(page);
    }

    return students;
  }

  async store({ request }) {
    const data = request.only([
      'name',
      'email',
      'birthday',
      'weight',
      'heigth',
    ]);

    const student = await Student.create(data);

    return student;
  }

  async show({ params, response }) {
    try {
      const student = await Student.findOrFail(params.id);

      return student;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong, could not find student.',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only([
        'name',
        'email',
        'birthday',
        'weight',
        'heigth',
      ]);
      const student = await Student.findOrFail(params.id);

      student.merge(data);

      await student.save();

      return student;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong, could not find student.',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const student = await Student.findOrFail(params.id);

      await student.delete();

      return { message: 'Student deleted with success' };
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong, could not find student.',
        },
      });
    }
  }
}

module.exports = StudentController;
