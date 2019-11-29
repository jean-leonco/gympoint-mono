const { test, trait, before } = use('Test/Suite')('Student Middleware');
const Route = use('Route');
const Factory = use('Factory');

trait('Test/ApiClient');

let id;

before(async () => {
  const action = ({ response }) => response.json({ ok: true });

  Route.post('test/student-middleware/:students_id', action).middleware([
    'student',
  ]);

  const student = await Factory.model('App/Models/Student').create();
  id = student.id;
});

trait(suite => suite.Context.getter('student_id', () => id));

test('should return success when header student id is equal to params student id', async ({
  client,
  student_id,
}) => {
  const response = await client
    .post(`test/student-middleware/${student_id}`)
    .header('studentid', student_id)
    .send()
    .end();

  response.assertJSON({
    ok: true,
  });
  response.assertStatus(200);
});

test('should return error when header student id is not provided', async ({
  client,
  student_id,
}) => {
  const response = await client
    .post(`test/student-middleware/${student_id}`)
    .send()
    .end();

  response.assertError({
    error: {
      message: 'The studentid is required.',
    },
  });
  response.assertStatus(401);
});

test('should return error when header student id is different from params student id', async ({
  client,
  student_id,
}) => {
  const response = await client
    .post(`test/student-middleware/${student_id}`)
    .header('studentid', '4')
    .send()
    .end();

  response.assertError({
    error: {
      message: 'You should only access your own data.',
    },
  });
  response.assertStatus(401);
});

test('should return error when student id is invalid', async ({ client }) => {
  const response = await client
    .post('test/student-middleware/400')
    .header('studentid', '400')
    .send()
    .end();

  response.assertError({
    error: {
      message: 'Invalid student id.',
    },
  });
  response.assertStatus(401);
});
