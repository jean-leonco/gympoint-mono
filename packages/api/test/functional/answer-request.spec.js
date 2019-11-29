const { test, trait } = use('Test/Suite')('Answer Request');
const Factory = use('Factory');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');

test('should be able to fetch assistance requests without answer', async ({
  client,
}) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').create();
  const request = await Factory.model('App/Models/AssistanceRequest').make();
  const request_2 = await Factory.model('App/Models/AssistanceRequest').make({
    answer: 'abc',
    answer_at: new Date(),
  });

  await student.assistanceRequests().saveMany([request, request_2]);

  const response = await client
    .get('assistance-requests')
    .loginVia(user)
    .end();

  response.assertJSONSubset({
    total: 1,
  });
});

test('should not be able to fetch assistance requests without answer when jwt not provided', async ({
  client,
}) => {
  const response = await client.get('assistance-requests').end();

  response.assertStatus(401);
});

test('should be able to create answer for assistance request', async ({
  client,
}) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').create();
  const request = await Factory.model('App/Models/AssistanceRequest').make();

  await student.assistanceRequests().save(request);

  const response = await client
    .post(`assistance-requests/${request.id}/answer`)
    .loginVia(user)
    .send({ answer: 'abc' })
    .end();

  response.assertStatus(200);
});

test('should not be able to create answer for assistance request if assistance has answer', async ({
  client,
}) => {
  const user = await User.find(1);

  const student = await Factory.model('App/Models/Student').create();
  const request = await Factory.model('App/Models/AssistanceRequest').make({
    answer: 'abc',
    answer_at: new Date(),
  });

  await student.assistanceRequests().save(request);

  const response = await client
    .post(`assistance-requests/${request.id}/answer`)
    .loginVia(user)
    .send({ answer: 'abc' })
    .end();

  response.assertStatus(400);
});

test('should not be able to create answer for assistance request with invalid id', async ({
  client,
}) => {
  const user = await User.find(1);

  const response = await client
    .post(`assistance-requests/4000/answer`)
    .loginVia(user)
    .send({ answer: 'abc' })
    .end();

  response.assertStatus(400);
});
