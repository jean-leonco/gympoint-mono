const Antl = use('Antl');

class Answer {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      answer: 'required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Answer;
