const { test, trait, before } = use('Test/Suite')('Assistance Request');
const Factory = use('Factory');

trait('Test/ApiClient');

before(async () => {
  await Factory.model('App/Models/Student').create();
});

test('should be able to fetch assistance requests', async ({ client }) => {
  const response = await client
    .get('students/1/assistance-requests')
    .header('studentid', '1')
    .end();

  response.assertStatus(200);
});

test('should not be able to fetch assistance requests without student id', async ({
  client,
}) => {
  const response = await client.get('students/1/assistance-requests').end();

  response.assertStatus(401);
});

test('should be able to create assistance request', async ({ client }) => {
  const request = await Factory.model('App/Models/AssistanceRequest').make();

  const response = await client
    .post('students/1/assistance-requests')
    .header('studentid', '1')
    .send(request.toJSON())
    .end();

  response.assertStatus(200);
});

test('should not be able to create assistance request without student id', async ({
  client,
}) => {
  const response = await client
    .post('students/1/assistance-requests')
    .send({})
    .end();

  response.assertStatus(401);
});

test('should be able to show assistance request', async ({ client }) => {
  const response = await client
    .get('students/1/assistance-requests/1')
    .header('studentid', '1')
    .end();

  response.assertStatus(200);
});

test('should not be able to show assistance request with invalid id', async ({
  client,
}) => {
  const response = await client
    .get('students/1/assistance-requests/4000')
    .header('studentid', '1')
    .end();

  response.assertStatus(404);
});

test('should not be able to fetch assistance requests without student id', async ({
  client,
}) => {
  const response = await client.get('students/1/assistance-requests').end();

  response.assertStatus(401);
});
