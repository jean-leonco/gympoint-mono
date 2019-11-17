const { startOfISOWeek, endOfISOWeek } = require('date-fns');

const Checkin = use('App/Models/Checkin');

class CheckinController {
  async index({ request, params }) {
    const { page } = request.get();
    const { students_id } = params;

    const checkins = await Checkin.query()
      .where('student_id', students_id)
      .paginate(page);

    return checkins;
  }

  async store({ params, response }) {
    const { students_id: student_id } = params;

    const date = new Date();

    const count = await Checkin.query()
      .where('student_id', student_id)
      .whereBetween('created_at', [startOfISOWeek(date), endOfISOWeek(date)])
      .count('* as total');

    const { total } = count[0];

    if (total >= 5) {
      return response.status(401).send({
        error: {
          message:
            'The number of possible check-ins for one week is five. Please try again next week.',
        },
      });
    }

    await Checkin.create({ student_id });

    return { message: 'Checkin create with success.' };
  }
}

module.exports = CheckinController;
