const Mail = use('Mail');
const Helpers = use('Helpers');

class AssistanceMail {
  /* istanbul ignore next */
  static get concurrency() {
    return 4;
  }

  /* istanbul ignore next */
  static get key() {
    return 'AssistanceMail-job';
  }

  async handle({ student, question, answer, email }) {
    await Mail.send(
      ['emails.assistance'],
      { student, question, answer },
      message => {
        message.from('no_reply@gympoint.com');
        message.to(email);
        message.subject('Assistance request answered');
        message.embed(Helpers.publicPath('logo.png'), 'logo');
      }
    );
  }
}

module.exports = AssistanceMail;
