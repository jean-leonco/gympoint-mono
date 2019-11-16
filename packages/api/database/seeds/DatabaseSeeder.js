const User = use('App/Models/User');
const Plan = use('App/Models/Plan');

class DatabaseSeeder {
  async run() {
    await User.create({
      name: 'Administrador',
      email: 'admin@gympoint.com',
      password: '123456',
    });

    await Plan.createMany([
      { title: 'Start', duration: 1, price: 129 },
      { title: 'Gold', duration: 3, price: 109 },
      { title: 'Diamond', duration: 6, price: 89 },
    ]);
  }
}

module.exports = DatabaseSeeder;
