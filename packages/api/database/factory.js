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

Factory.blueprint('App/Models/Plan', faker => {
  return {
    title: faker.word(),
    duration: faker.integer({ min: 1, max: 12 }),
    price: faker.floating({ min: 40, max: 120, fixed: 2 }),
  };
});
