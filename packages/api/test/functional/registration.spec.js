const { test, trait, before } = use('Test/Suite')('Registration');
const Factory = use('Factory');
const Registration = use('App/Models/Registration');

trait('Test/ApiClient');

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
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .get('registrations')
    .header('Authorization', `Bearer ${body.token}`)
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
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const { id } = await Factory.model('App/Models/Student').create();

  const response = await client
    .post('registrations')
    .header('Authorization', `Bearer ${body.token}`)
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
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .get('registrations/1')
    .header('Authorization', `Bearer ${body.token}`)
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
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .get('registrations/4000')
    .header('Authorization', `Bearer ${body.token}`)
    .end();

  response.assertStatus(404);
});

test('should be able to update registration', async ({ client }) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .put('registrations/1')
    .header('Authorization', `Bearer ${body.token}`)
    .send({ plan_id: 2 })
    .end();

  response.assertStatus(200);
});

test('should be able to update registration with invalid id', async ({
  client,
}) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .put('registrations/200')
    .header('Authorization', `Bearer ${body.token}`)
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
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .delete('registrations/1')
    .header('Authorization', `Bearer ${body.token}`)
    .end();

  response.assertStatus(200);
});

test('should be able to delete registration with invalid id', async ({
  client,
}) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .delete('registrations/200')
    .header('Authorization', `Bearer ${body.token}`)
    .end();

  response.assertStatus(404);
});

test('should not be able to delete registration without jwt', async ({
  client,
}) => {
  const response = await client.delete('registrations/1').end();

  response.assertStatus(401);
});
