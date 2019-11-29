const { test, trait, before } = use('Test/Suite')('Session');
const Route = use('Route');

trait('Test/ApiClient');

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/session-validator', action).validator('Session');
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/session-validator')
    .send({ email: 'test@mail.com', password: '123456' })
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when e-mail is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/session-validator')
    .send({ password: '123456' })
    .end();

  response.assertError([
    {
      message: 'The email is required.',
      field: 'email',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when password is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/session-validator')
    .send({ email: 'test@mail.com' })
    .end();

  response.assertError([
    {
      message: 'The password is required.',
      field: 'password',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when e-mail is not a valid e-mail', async ({
  client,
}) => {
  const response = await client
    .post('test/session-validator')
    .send({ email: 'abcde', password: '123456' })
    .end();

  response.assertError([
    {
      message: 'The email should be a valid email address.',
      field: 'email',
      validation: 'email',
    },
  ]);
  response.assertStatus(400);
});
