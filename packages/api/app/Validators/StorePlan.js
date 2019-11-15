const Antl = use('Antl');

class StorePlan {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      duration: 'required|integer',
      price: 'required|number',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = StorePlan;
