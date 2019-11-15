const Mail = use('Mail');
const Helpers = use('Helpers');
const AssistanceRequest = use('App/Models/AssistanceRequest');

class HelpRequestController {
  async index({ request }) {
    const { page } = request.get();

    const assistanceRequests = await AssistanceRequest.query()
      .where('answer', null)
      .paginate(page);

    return assistanceRequests;
  }

  async store({ request, params, response }) {
    try {
      const answer = request.input('answer');
      const { request_id } = params;

      const answer_at = new Date();

      const assistanceRequest = await AssistanceRequest.findOrFail(request_id);

      if (assistanceRequest.answer) {
        return response.status(400).send({
          error: 'The assistance request was answered',
        });
      }

      assistanceRequest.merge({ answer, answer_at });

      await assistanceRequest.save();

      const { name, email } = await assistanceRequest.student().fetch();

      await Mail.send(
        ['emails.assistance'],
        {
          student: name,
          question: assistanceRequest.question,
          answer: assistanceRequest.answer,
        },
        (message) => {
          message.from('no_reply@gympoint.com');
          message.to(email);
          message.subject('Assistance request');
          message.embed(Helpers.publicPath('logo.png'), 'logo');
        },
      );

      return assistanceRequest;
    } catch (error) {
      return response.status(400).send({
        error: 'Something went wrong, could not find the assistance request',
      });
    }
  }
}

module.exports = HelpRequestController;
