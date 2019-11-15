const Antl = use('Antl');

class Assistance {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      question: 'required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Assistance;
