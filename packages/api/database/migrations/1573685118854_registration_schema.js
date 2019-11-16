const Schema = use('Schema');

class RegistrationSchema extends Schema {
  up() {
    this.create('registrations', table => {
      table.increments();

      table
        .integer('student_id')
        .references('id')
        .inTable('students')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table
        .integer('plan_id')
        .references('id')
        .inTable('plans')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table.timestamp('start_date').notNullable();
      table.timestamp('due_date').notNullable();
      table.float('price').notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop('registrations');
  }
}

module.exports = RegistrationSchema;
