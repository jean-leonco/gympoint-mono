const { test, trait, before } = use('Test/Suite')('StudentSession');
const Factory = use('Factory');

trait('Test/ApiClient');

before(async () => {
  await Factory.model('App/Models/Student').create();
});

test('should sign in with valid student', async ({ client }) => {
  const response = await client
    .post('studentSessions')
    .send({
      student_id: 1,
    })
    .end();

  response.assertStatus(200);
});

test('should not sign in with invalid student', async ({ client }) => {
  const response = await client
    .post('studentSessions')
    .send({
      student_id: 8000,
    })
    .end();

  response.assertStatus(401);
});
