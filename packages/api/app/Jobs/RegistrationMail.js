const Mail = use('Mail');
const Helpers = use('Helpers');

class RegistrationMail {
  /* istanbul ignore next */
  static get concurrency() {
    return 4;
  }

  /* istanbul ignore next */
  static get key() {
    return 'RegistrationMail-job';
  }

  async handle({ student, plan, due_date, price, email }) {
    await Mail.send(
      ['emails.registration'],
      {
        student,
        plan,
        due_date,
        price,
      },
      message => {
        message.from('no_reply@gympoint.com');
        message.to(email);
        message.subject('GymPoint registration');
        message.embed(Helpers.publicPath('logo.png'), 'logo');
      }
    );
  }
}

module.exports = RegistrationMail;
