const { test, trait, before } = use('Test/Suite')('Student');
const Factory = use('Factory');

trait('Test/ApiClient');

before(async () => {
  await Factory.model('App/Models/Student').createMany(5);
});

test('should be able to fetch students', async ({ client }) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .get('students')
    .header('Authorization', `Bearer ${body.token}`)
    .end();

  response.assertStatus(200);
});

test('should not be able to fetch students without jwt', async ({ client }) => {
  const response = await client.get('students').end();

  response.assertStatus(401);
});

test('should be able to create student', async ({ client }) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const student = await Factory.model('App/Models/Student').make();

  const response = await client
    .post('students')
    .send(student.toJSON())
    .header('Authorization', `Bearer ${body.token}`)
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
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .get('students/1')
    .header('Authorization', `Bearer ${body.token}`)
    .end();

  response.assertStatus(200);
});

test('should not be able to show student without jwt', async ({ client }) => {
  const response = await client.get('students/1').end();

  response.assertStatus(401);
});

test('should be able to update student', async ({ client }) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const student = await Factory.model('App/Models/Student').make();

  const response = await client
    .put('students/1')
    .header('Authorization', `Bearer ${body.token}`)
    .send(student.toJSON())
    .end();

  response.assertStatus(200);
});

test('should not be able to update student without jwt', async ({ client }) => {
  const response = await client
    .put('students/1')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to delete student', async ({ client }) => {
  const { body } = await client
    .post('sessions')
    .send({
      email: 'admin@gympoint.com',
      password: '123456',
    })
    .end();

  const response = await client
    .delete('students/2')
    .header('Authorization', `Bearer ${body.token}`)
    .end();

  response.assertStatus(200);
});

test('should not be able to delete student without jwt', async ({ client }) => {
  const response = await client.delete('students/2').end();

  response.assertStatus(401);
});
