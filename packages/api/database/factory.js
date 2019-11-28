/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/Student', faker => {
  return {
    name: faker.name(),
    email: faker.email(),
    birthday: faker.birthday(),
    weight: faker.floating({ min: 40, max: 300, fixed: 2 }),
    heigth: faker.integer({ min: 130, max: 220 }),
  };
});
