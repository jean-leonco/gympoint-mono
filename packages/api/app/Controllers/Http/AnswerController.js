const Kue = use('Kue');

const AssistanceRequest = use('App/Models/AssistanceRequest');
const Job = use('App/Jobs/AssistanceMail');
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

      Kue.dispatch(
        Job.key,
        {
          student: name,
          question: assistanceRequest.question,
          answer: assistanceRequest.answer,
          email,
        },
        { attempts: 3 },
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
