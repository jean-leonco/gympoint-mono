const { test, trait, before } = use('Test/Suite')('Store Registration');
const Route = use('Route');
const Factory = use('Factory');
const Registration = use('App/Models/Registration');

trait('Test/ApiClient');

let student_id;
let plan_id;

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/store-registration-validator', action).validator(
    'StoreRegistration'
  );

  const student = await Factory.model('App/Models/Student').create();
  const plan = await Factory.model('App/Models/Plan').create();

  student_id = student.id;
  plan_id = plan.id;
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id, plan_id, start_date: new Date().toISOString() })
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when student_id is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ plan_id, start_date: new Date().toISOString() })
    .end();

  response.assertError([
    {
      message: 'The student_id is required.',
      field: 'student_id',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when plan_id is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id, start_date: new Date().toISOString() })
    .end();

  response.assertError([
    {
      message: 'The plan_id is required.',
      field: 'plan_id',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when start date is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id, plan_id })
    .end();

  response.assertError([
    {
      message: 'The start_date is required.',
      field: 'start_date',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when student_id is not valid', async ({
  client,
}) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id: 4000, plan_id, start_date: new Date().toISOString() })
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

test('should return validation error when plan_id is not valid', async ({
  client,
}) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id, plan_id: 4000, start_date: new Date().toISOString() })
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

test('should return validation error when start date is not a date', async ({
  client,
}) => {
  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id, plan_id, start_date: 'abcde' })
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

test('should return validation error when student already have one registration', async ({
  client,
}) => {
  await Registration.create({
    plan_id,
    student_id,
    start_date: new Date(),
    due_date: new Date(),
    price: 20,
  });

  const response = await client
    .post('test/store-registration-validator')
    .send({ student_id, plan_id, start_date: new Date().toISOString() })
    .end();

  response.assertError([
    {
      message: 'The student is registered on a plan.',
      field: 'student_id',
      validation: 'unique',
    },
  ]);

  response.assertStatus(400);
});
