const Antl = use('Antl');

class StoreRegistration {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      student_id: 'required|exists:students,id|unique:registrations',
      plan_id: 'required|exists:plans,id',
      start_date: `required|date|after:${new Date()}`,
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return {
      ...Antl.list('validation'),
      'student_id.unique': 'The student is registered on a plan.',
    };
  }
}

module.exports = StoreRegistration;
