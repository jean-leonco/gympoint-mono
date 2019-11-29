const { test, trait, before } = use('Test/Suite')('Update Plan');
const Route = use('Route');

trait('Test/ApiClient');

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/update-plan-validator', action).validator('UpdatePlan');
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/update-plan-validator')
    .send()
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when duration is not an integer', async ({
  client,
}) => {
  const response = await client
    .post('test/update-plan-validator')
    .send({ duration: 'abcde' })
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
    .post('test/update-plan-validator')
    .send({ price: 'abcde' })
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
