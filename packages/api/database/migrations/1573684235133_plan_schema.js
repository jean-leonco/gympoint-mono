const Schema = use('Schema');

class PlanSchema extends Schema {
  up() {
    this.create('plans', table => {
      table.increments();
      table.string('title').notNullable();
      table.integer('duration').notNullable();
      table.float('price').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('plans');
  }
}

module.exports = PlanSchema;
