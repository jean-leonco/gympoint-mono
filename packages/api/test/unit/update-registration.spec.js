const { test, trait, before } = use('Test/Suite')('Update Registration');
const Route = use('Route');

trait('Test/ApiClient');

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/update-registration-validator', action).validator(
    'UpdateRegistration'
  );
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/update-registration-validator')
    .send()
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when plan_id is not valid', async ({
  client,
}) => {
  const response = await client
    .post('test/update-registration-validator')
    .send({ plan_id: 4000 })
    .end();

  response.assertError([
    {
      message: 'The plan_id should exists on plans.',
      field: 'plan_id',
      validation: 'exists',
    },
  ]);

  response.assertStatus(400);
});

test('should return validation error when student_id is not valid', async ({
  client,
}) => {
  const response = await client
    .post('test/update-registration-validator')
    .send({ student_id: 4000 })
    .end();

  response.assertError([
    {
      message: 'The student_id should exists on students.',
      field: 'student_id',
      validation: 'exists',
    },
  ]);

  response.assertStatus(400);
});

test('should return validation error when start date is not a date', async ({
  client,
}) => {
  const response = await client
    .post('test/update-registration-validator')
    .send({ start_date: 'abcde' })
    .end();

  response.assertJSONSubset([
    {
      message: 'The start_date should be a valid date.',
      field: 'start_date',
      validation: 'date',
    },
  ]);

  response.assertStatus(400);
});
