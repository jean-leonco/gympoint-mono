const { test, trait, before } = use('Test/Suite')('Assistance');
const Route = use('Route');

trait('Test/ApiClient');

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/assistance-validator', action).validator('Assistance');
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/assistance-validator')
    .send({ question: 'abcde' })
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when question is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/assistance-validator')
    .send()
    .end();

  response.assertError([
    {
      message: 'The question is required.',
      field: 'question',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});
