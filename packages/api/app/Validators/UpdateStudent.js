const Antl = use('Antl');

class UpdateStudent {
  get validateAll() {
    return true;
  }

  get rules() {
    const id = Number(this.ctx.params.id);

    return {
      email: `email|unique:students,email,id,${id}`,
      birthday: 'date',
      weight: 'number',
      heigth: 'integer',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages);
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdateStudent;
