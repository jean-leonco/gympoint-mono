const Plan = use('App/Models/Plan');

class PlanController {
  async index({ request }) {
    const { page } = request.get();
    const plans = await Plan.query().paginate(page);

    return plans;
  }

  async store({ request }) {
    const data = request.only(['title', 'duration', 'price']);

    const plan = await Plan.create(data);

    return plan;
  }

  async show({ params, response }) {
    try {
      const plan = await Plan.findOrFail(params.id);

      return plan;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong, could not find plan.',
        },
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['title', 'duration', 'price']);
      const plan = await Plan.findOrFail(params.id);

      plan.merge(data);

      await plan.save();

      return plan;
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong, could not find plan.',
        },
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const plan = await Plan.findOrFail(params.id);

      await plan.delete();

      return { message: 'Plan deleted with success.' };
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Something went wrong, could not find plan.',
        },
      });
    }
  }
}

module.exports = PlanController;
