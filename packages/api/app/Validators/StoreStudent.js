const Antl = use('Antl');

class StoreStudent {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:students',
      birthday: 'required|date',
      weight: 'required|number',
      heigth: 'required|integer',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = StoreStudent;
