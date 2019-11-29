const { test, trait, before } = use('Test/Suite')('Store Plan');
const Route = use('Route');

trait('Test/ApiClient');

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/store-plan-validator', action).validator('StorePlan');
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/store-plan-validator')
    .send({ title: 'test', duration: 10, price: 40.5 })
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when title is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-plan-validator')
    .send({ duration: 10, price: 40.5 })
    .end();

  response.assertError([
    {
      message: 'The title is required.',
      field: 'title',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when duration is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-plan-validator')
    .send({ title: 'test', price: 40.5 })
    .end();

  response.assertError([
    {
      message: 'The duration is required.',
      field: 'duration',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when price is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-plan-validator')
    .send({ title: 'test', duration: 10 })
    .end();

  response.assertError([
    {
      message: 'The price is required.',
      field: 'price',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when duration is not an integer', async ({
  client,
}) => {
  const response = await client
    .post('test/store-plan-validator')
    .send({ title: 'test', duration: 'abcde', price: 40.5 })
    .end();

  response.assertError([
    {
      message: 'The duration should be an INTEGER.',
      field: 'duration',
      validation: 'integer',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when price is not a number', async ({
  client,
}) => {
  const response = await client
    .post('test/store-plan-validator')
    .send({ title: 'test', duration: 10, price: 'abcde' })
    .end();

  response.assertError([
    {
      message: 'The price should contain numbers only.',
      field: 'price',
      validation: 'number',
    },
  ]);
  response.assertStatus(400);
});
