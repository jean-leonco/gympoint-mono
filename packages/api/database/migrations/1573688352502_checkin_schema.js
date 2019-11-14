const Schema = use('Schema');

class CheckinSchema extends Schema {
  up() {
    this.create('checkins', (table) => {
      table.increments();

      table
        .integer('student_id')
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamps();
    });
  }

  down() {
    this.drop('checkins');
  }
}

module.exports = CheckinSchema;
