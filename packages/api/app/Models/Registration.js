const Model = use('Model');

const { isBefore, isAfter, parseISO } = require('date-fns');

class Registration extends Model {
  getIsActive({ start_date, due_date }) {
    return (
      isBefore(parseISO(start_date), new Date()) &&
      isAfter(parseISO(due_date), new Date())
    );
  }

  static get computed() {
    return ['isActive'];
  }

  student() {
    return this.belongsTo('App/Models/Student');
  }

  plan() {
    return this.belongsTo('App/Models/Plan');
  }
}

module.exports = Registration;
