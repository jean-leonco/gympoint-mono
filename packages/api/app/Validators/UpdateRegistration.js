const Antl = use('Antl');

class UpdateRegistration {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      plan_id: 'exists:plans,id',
      student_id: 'exists:students,id',
      start_date: `date|after:${new Date()}`,
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdateRegistration;
