const Model = use('Model');

class AssistanceRequest extends Model {
  static boot() {
    super.boot();

    this.addHook('afterCreate', 'AssistanceRequestHook.sendWs');
  }

  student() {
    return this.belongsTo('App/Models/Student');
  }
}

module.exports = AssistanceRequest;
