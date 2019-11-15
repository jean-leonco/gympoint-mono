const Schema = use('Schema');

class AssistanceRequestSchema extends Schema {
  up() {
    this.create('assistance_requests', (table) => {
      table.increments();

      table
        .integer('student_id')
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.string('question').notNullable();
      table.string('answer');
      table.timestamp('answer_at');

      table.timestamps();
    });
  }

  down() {
    this.drop('assistance_requests');
  }
}

module.exports = AssistanceRequestSchema;
