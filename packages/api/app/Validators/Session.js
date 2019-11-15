const Antl = use('Antl');

class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Session;
