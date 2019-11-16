const AssistanceRequest = use('App/Models/AssistanceRequest');

class AssistanceRequestController {
  async index({ request, params }) {
    const { page } = request.get();
    const { students_id } = params;

    const assistanceRequests = await AssistanceRequest.query()
      .where('student_id', students_id)
      .paginate(page);

    return assistanceRequests;
  }

  async store({ request, params }) {
    const { students_id: student_id } = params;
    const question = request.input('question');

    const assistanceRequest = await AssistanceRequest.create({
      student_id,
      question,
    });

    return assistanceRequest;
  }
}

module.exports = AssistanceRequestController;
