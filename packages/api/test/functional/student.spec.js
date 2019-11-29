const { test, trait, before } = use('Test/Suite')('Student');
const Factory = use('Factory');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');

before(async () => {
  await Factory.model('App/Models/Student').createMany(5);
});

test('should be able to fetch students', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .get('students')
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should be able to fetch students with name query', async ({ client }) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').create();

  const response = await client
    .get('students')
    .query({ name: student.name })
    .loginVia(user)
    .end();

  response.assertJSONSubset({
    data: [{ name: student.name }],
    total: 1,
  });
});

test('should not be able to fetch students without jwt', async ({ client }) => {
  const response = await client.get('students').end();

  response.assertStatus(401);
});

test('should be able to create student', async ({ client }) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').make();

  const response = await client
    .post('students')
    .send(student.toJSON())
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should not be able to create student without jwt', async ({ client }) => {
  const response = await client
    .post('students')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to show student', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .get('students/1')
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should not be able to show student with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const response = await client
    .get('students/4000')
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test('should not be able to show student without jwt', async ({ client }) => {
  const response = await client.get('students/1').end();

  response.assertStatus(401);
});

test('should be able to update student', async ({ client }) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').make();

  const response = await client
    .put('students/1')
    .loginVia(user)
    .send(student.toJSON())
    .end();

  response.assertStatus(200);
});

test('should not be able to update student with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').make();

  const response = await client
    .put('students/4000')
    .loginVia(user)
    .send(student.toJSON())
    .end();

  response.assertStatus(404);
});

test('should not be able to update student without jwt', async ({ client }) => {
  const response = await client
    .put('students/1')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to delete student', async ({ client }) => {
  const user = await User.find(1);

  const response = await client
    .delete('students/2')
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test('should not be able to delete student with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const response = await client
    .delete('students/4000')
    .loginVia(user)
    .end();

  response.assertStatus(404);
});

test('should not be able to delete student without jwt', async ({ client }) => {
  const response = await client.delete('students/2').end();

  response.assertStatus(401);
});
