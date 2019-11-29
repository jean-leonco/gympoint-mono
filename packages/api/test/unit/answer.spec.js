const { test, trait, before } = use('Test/Suite')('Answer');
const Route = use('Route');

trait('Test/ApiClient');

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/answer-validator', action).validator('Answer');
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/answer-validator')
    .send({ answer: 'abcde' })
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when answer is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/answer-validator')
    .send()
    .end();

  response.assertError([
    {
      message: 'The answer is required.',
      field: 'answer',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});
