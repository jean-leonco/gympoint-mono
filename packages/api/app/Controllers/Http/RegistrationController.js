const { addMonths, parseISO } = require('date-fns');

const Registration = use('App/Models/Registration');
const Plan = use('App/Models/Plan');

class RegistrationController {
  async index({ request }) {
    const { page } = request.get();
    const registrations = await Registration.query().with('student').with('plan').paginate(page);

    return registrations;
  }

  async store({ request }) {
    const data = request.only(['student_id', 'plan_id', 'start_date']);

    const plan = await Plan.find(data.plan_id);

    const price = plan.price * plan.duration;
    const due_date = addMonths(parseISO(data.start_date), plan.duration);

    const student = await Registration.create({ ...data, price, due_date });

    return student;
  }

  async show({ params, response }) {
    try {
      const registration = await Registration.findOrFail(params.id);

      await registration.loadMany(['student', 'plan']);

      return registration;
    } catch (error) {
      return response.status(error.status).send({
        error: 'Something went wrong, could not find registration',
      });
    }
  }

  async update({ params, request, response }) {
    try {
      const data = request.only(['student_id', 'plan_id', 'start_date']);
      const registration = await Registration.findOrFail(params.id);

      let price;
      let due_date;

      const plan = await Plan.find(data.plan_id);

      if (data.start_date && data.start_date !== registration.start_date) {
        due_date = addMonths(parseISO(data.start_date), plan.duration);
      }

      if (data.plan_id && data.plan_id !== registration.plan_id) {
        price = plan.price * plan.duration;

        due_date = addMonths(
          data.start_date ? parseISO(data.start_date) : registration.start_date, plan.duration,
        );
      }

      registration.merge({ ...data, price, due_date });
      await registration.save();

      return registration;
    } catch (error) {
      return response.status(error.status).send({
        error: 'Something went wrong, could not find registration',
      });
    }
  }

  async destroy({ params, response }) {
    try {
      const registration = await Registration.findOrFail(params.id);

      await registration.delete();

      return { message: 'Registration deleted with success' };
    } catch (error) {
      return response.status(error.status).send({
        error: 'Something went wrong, could not find registration',
      });
    }
  }
}

module.exports = RegistrationController;
