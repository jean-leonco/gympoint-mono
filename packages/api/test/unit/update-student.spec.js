const { addDays } = require('date-fns');

const { test, trait, before } = use('Test/Suite')('Update Student');
const Route = use('Route');
const Factory = use('Factory');
const Student = use('App/Models/Student');

trait('Test/ApiClient');

let student;

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.put('test/update-student-validator/:id', action).validator(
    'UpdateStudent'
  );

  student = await Factory.model('App/Models/Student').make();
});

test('should return success', async ({ client }) => {
  const response = await client
    .put(`test/update-student-validator/${student.id}`)
    .send(student.toJSON())
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return validation error when e-mail is not a valid e-mail', async ({
  client,
}) => {
  const response = await client
    .put(`test/update-student-validator/${student.id}`)
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
    email: 'update-validator@mail.com',
  });

  const response = await client
    .put(`test/update-student-validator/${student.id}`)
    .send({ ...student.toJSON(), email: 'update-validator@mail.com' })
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
    .put(`test/update-student-validator/${student.id}`)
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
    .put(`test/update-student-validator/${student.id}`)
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
    .put(`test/update-student-validator/${student.id}`)
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
