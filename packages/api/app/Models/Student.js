const Model = use('Model');

class Student extends Model {
  assistanceRequests() {
    return this.hasMany('App/Models/AssistanceRequest');
  }
}

module.exports = Student;
