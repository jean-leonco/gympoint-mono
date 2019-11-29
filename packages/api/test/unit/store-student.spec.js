const { addDays } = require('date-fns');

const { test, trait, before } = use('Test/Suite')('Store Student');
const Route = use('Route');
const Factory = use('Factory');
const Student = use('App/Models/Student');

trait('Test/ApiClient');

let student;

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/store-student-validator', action).validator('StoreStudent');

  student = await Factory.model('App/Models/Student').make();
});

test('should return success', async ({ client }) => {
  const response = await client
    .post('test/store-student-validator')
    .send(student.toJSON())
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when name is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), name: '' })
    .end();

  response.assertError([
    {
      message: 'The name is required.',
      field: 'name',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when e-mail is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), email: '' })
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

test('should return validation error when birthday is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), birthday: '' })
    .end();

  response.assertJSONSubset([
    {
      message: 'The birthday is required.',
      field: 'birthday',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when weight is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), weight: '' })
    .end();

  response.assertError([
    {
      message: 'The weight is required.',
      field: 'weight',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when heigth is not provided', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), heigth: '' })
    .end();

  response.assertError([
    {
      message: 'The heigth is required.',
      field: 'heigth',
      validation: 'required',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when e-mail is not a valid e-mail', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), email: 'abcde' })
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

test('should return validation error when e-mail is not unique', async ({
  client,
}) => {
  await Student.create({
    ...student.toJSON(),
    email: 'store-validator@mail.com',
  });

  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), email: 'store-validator@mail.com' })
    .end();

  response.assertError([
    {
      message: 'The email has already been taken by someone else.',
      field: 'email',
      validation: 'unique',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when birthday is greater than now', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({
      ...student.toJSON(),
      birthday: addDays(new Date(), 1),
    })
    .end();

  response.assertJSONSubset([
    {
      field: 'birthday',
      validation: 'before',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when weight is not a number', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), weight: 'abcde' })
    .end();

  response.assertError([
    {
      message: 'The weight should contain numbers only.',
      field: 'weight',
      validation: 'number',
    },
  ]);
  response.assertStatus(400);
});

test('should return validation error when heigth is not an integer', async ({
  client,
}) => {
  const response = await client
    .post('test/store-student-validator')
    .send({ ...student.toJSON(), heigth: 'abcde' })
    .end();

  response.assertError([
    {
      message: 'The heigth should be an INTEGER.',
      field: 'heigth',
      validation: 'integer',
    },
  ]);
  response.assertStatus(400);
});
