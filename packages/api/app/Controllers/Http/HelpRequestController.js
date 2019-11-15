const AssistanceRequest = use('App/Models/AssistanceRequest');

class HelpRequestController {
  async index({ request }) {
    const { page } = request.get();

    const assistanceRequests = await AssistanceRequest.query().where('answer', null).paginate(page);

    return assistanceRequests;
  }

  async store({ request, params, response }) {
    try {
      const answer = request.input('answer');
      const { request_id } = params;

      const answer_at = new Date();

      const assistanceRequest = await AssistanceRequest.findOrFail(request_id);

      assistanceRequest.merge({ answer, answer_at });

      await assistanceRequest.save();

      return assistanceRequest;
    } catch (error) {
      return response.status(404).send({
        error: 'Something went wrong, could not find the assistance request',
      });
    }
  }
}

module.exports = HelpRequestController;
