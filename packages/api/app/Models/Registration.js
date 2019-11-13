const Model = use('Model');

class Registration extends Model {
  student() {
    return this.belongsTo('App/Models/Student');
  }

  plan() {
    return this.belongsTo('App/Models/Plan');
  }
}

module.exports = Registration;
