const { addMonths, parseISO } = require('date-fns');

const { test, trait, before } = use('Test/Suite')('Registration');
const Factory = use('Factory');
const Registration = use('App/Models/Registration');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');

before(async () => {
  const { id } = await Factory.model('App/Models/Student').create();

  await Registration.create({
    plan_id: 1,
    student_id: id,
    start_date: new Date(),
    due_date: new Date(),
    price: 20,
  });
});

test('should be able to fetch registrations', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .get('registrations')
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should not be able to fetch registrations without jwt', async ({
  client,
}) => {
  const response = await client.get('registrations').end();

  response.assertStatus(401);
});

test('should be able to create registration', async ({ client }) => {
  const user = await User.find(1);

  const { id } = await Factory.model('App/Models/Student').create();

  const response = await client
    .post('registrations')
    .loginVia(user)
    .send({ student_id: id, plan_id: 3, start_date: new Date() })
    .end();

  response.assertStatus(200);
});

test('should not be able to create registration without jwt', async ({
  client,
}) => {
  const response = await client
    .post('registrations')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to show registration', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .get('registrations/1')
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should not be able to show registration without jwt', async ({
  client,
}) => {
  const response = await client.get('registrations/1').end();

  response.assertStatus(401);
});

test('should not be able to show registration with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const response = await client
    .get('registrations/4000')
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test('should be able to update registration', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .put('registrations/1')
    .loginVia(user)
    .send({ plan_id: 2 })
    .end();

  response.assertStatus(200);
});

test('should recalculate due date when start date is updated', async ({
  client,
}) => {
  const user = await User.find(1);

  const { id } = await Factory.model('App/Models/Student').create();

  const registration = await Registration.create({
    plan_id: 2,
    student_id: id,
    start_date: new Date(),
    due_date: new Date(),
    price: 20,
  });

  const new_date = new Date().toISOString();
  const due_date = addMonths(parseISO(new_date), 3).toISOString();

  const response = await client
    .put(`registrations/${registration.id}`)
    .loginVia(user)
    .send({ start_date: new_date })
    .end();

  response.assertJSONSubset({
    start_date: new_date,
    due_date,
  });
});

test('should recalculate due date and price when plan id is updated', async ({
  client,
}) => {
  const user = await User.find(1);

  const { id } = await Factory.model('App/Models/Student').create();

  const { id: registration_id, start_date } = await Registration.create({
    plan_id: 2,
    student_id: id,
    start_date: new Date(),
    due_date: new Date(),
    price: 20,
  });

  const due_date = addMonths(start_date, 6).toISOString();

  const response = await client
    .put(`registrations/${registration_id}`)
    .loginVia(user)
    .send({ plan_id: 3 })
    .end();

  response.assertJSONSubset({
    due_date,
    price: 89 * 6,
  });
});

test('should recalculate due date and price when plan id and start date are updated', async ({
  client,
}) => {
  const user = await User.find(1);

  const { id } = await Factory.model('App/Models/Student').create();

  const registration = await Registration.create({
    plan_id: 2,
    student_id: id,
    start_date: new Date(),
    due_date: new Date(),
    price: 20,
  });

  const new_date = new Date().toISOString();
  const due_date = addMonths(parseISO(new_date), 6).toISOString();

  const response = await client
    .put(`registrations/${registration.id}`)
    .loginVia(user)
    .send({ plan_id: 3, start_date: new_date })
    .end();

  response.assertJSONSubset({
    start_date: new_date,
    due_date,
    price: 89 * 6,
  });
});

test('should not be able to update registration with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const response = await client
    .put('registrations/200')
    .loginVia(user)
    .send({})
    .end();

  response.assertStatus(404);
});

test('should not be able to update registration without jwt', async ({
  client,
}) => {
  const response = await client
    .put('registrations/1')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to delete registration', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .delete('registrations/1')
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should be able to delete registration with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const response = await client
    .delete('registrations/200')
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test('should not be able to delete registration without jwt', async ({
  client,
}) => {
  const response = await client.delete('registrations/1').end();

  response.assertStatus(401);
});
