const { hooks } = require('@adonisjs/ignitor');

hooks.before.httpServer(() => {
  const Validator = use('Adonis/Addons/Validator');
  const Database = use('Database');

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field);

    if (!value) {
      return;
    }

    const [table, column] = args;

    let row;

    try {
      row = await Database.table(table)
        .where(column, value)
        .first();
    } catch (error) {
      throw message;
    }

    if (!row) {
      throw message;
    }
  };

  Validator.extend('exists', existsFn);
});
