const { test, trait, before } = use('Test/Suite')('Plan');
const Factory = use('Factory');

trait('Test/ApiClient');

before(async () => {
  await Factory.model('App/Models/Plan').create();
});

async function getToken(client) {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  return body.token;
}

test('should be able to fetch plans', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .get('plans')
    .header('Authorization', `Bearer ${token}`)
    .end();

  response.assertStatus(200);
});

test('should not be able to fetch plans without jwt', async ({ client }) => {
  const response = await client.get('plans').end();

  response.assertStatus(401);
});

test('should be able to create plan', async ({ client }) => {
  const token = await getToken(client);

  const plan = await Factory.model('App/Models/Plan').create();

  const response = await client
    .post('plans')
    .header('Authorization', `Bearer ${token}`)
    .send(plan.toJSON())
    .end();

  response.assertStatus(200);
});

test('should not be able to create plan without jwt', async ({ client }) => {
  const response = await client
    .post('plans')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to show plan', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .get('plans/1')
    .header('Authorization', `Bearer ${token}`)
    .end();

  response.assertStatus(200);
});

test('should not be able to show plan with invalid id', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .get('plans/4000')
    .header('Authorization', `Bearer ${token}`)
    .end();

  response.assertStatus(404);
});

test('should not be able to show plan without jwt', async ({ client }) => {
  const response = await client.get('plans/1').end();

  response.assertStatus(401);
});

test('should be able to update plan', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .put('plans/1')
    .header('Authorization', `Bearer ${token}`)
    .send({ price: 20 })
    .end();

  response.assertStatus(200);
});

test('should be able to update plan with invalid id', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .put('plans/200')
    .header('Authorization', `Bearer ${token}`)
    .send({})
    .end();

  response.assertStatus(404);
});

test('should not be able to update plan without jwt', async ({ client }) => {
  const response = await client
    .put('plans/1')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to delete plan', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .delete('plans/1')
    .header('Authorization', `Bearer ${token}`)
    .end();

  response.assertStatus(200);
});

test('should be able to delete plan with invalid id', async ({ client }) => {
  const token = await getToken(client);

  const response = await client
    .delete('plans/200')
    .header('Authorization', `Bearer ${token}`)
    .end();

  response.assertStatus(404);
});

test('should not be able to delete plan without jwt', async ({ client }) => {
  const response = await client.delete('plans/1').end();

  response.assertStatus(401);
});
