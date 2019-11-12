const User = use('App/Models/User');

class DatabaseSeeder {
  async run() {
    await User.create({
      name: 'Administrador',
      email: 'admin@gympoint.com',
      password: '123456',
    });
  }
}

module.exports = DatabaseSeeder;
