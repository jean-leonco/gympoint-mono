const Antl = use('Antl');

class UpdatePlan {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      duration: 'integer',
      price: 'number',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdatePlan;
