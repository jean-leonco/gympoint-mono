const Schema = use('Schema');

class StudentSchema extends Schema {
  up() {
    this.create('students', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.timestamp('birthday').notNullable();
      table.float('weight').notNullable();
      table.integer('heigth').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('students');
  }
}

module.exports = StudentSchema;
