const Model = use('Model');

class AssistanceRequest extends Model {
  student() {
    return this.belongsTo('App/Models/Student');
  }
}

module.exports = AssistanceRequest;
