const { test, trait } = use('Test/Suite')('Session');

trait('Test/ApiClient');

test('should sign in with valid user', async ({ client }) => {
  const response = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  response.assertStatus(200);
});

test('should not sign in with invalid user', async ({ client }) => {
  const response = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '12345',
    })
    .end();

  response.assertStatus(401);
});
