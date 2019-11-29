const { test, trait, before } = use('Test/Suite')('Checkin');
const Factory = use('Factory');

trait('Test/ApiClient');

before(async () => {
  await Factory.model('App/Models/Student').create();
});

test('should be able to fetch check-ins', async ({ client }) => {
  const response = await client
    .get('students/1/checkins')
    .header('studentid', '1')
    .end();

  response.assertStatus(200);
});

test('should not be able to fetch check-ins without student id', async ({
  client,
}) => {
  const response = await client.get('students/1/checkins').end();

  response.assertStatus(401);
});

test('should be able to create check-in', async ({ client }) => {
  const response = await client
    .post('students/1/checkins')
    .header('studentid', '1')
    .end();

  response.assertStatus(200);
});

test('should not be able to create check-in if student already has 5 in a week', async ({
  client,
}) => {
  const requests = [1, 2, 3, 4];

  await Promise.all(
    requests.map(async () =>
      client
        .post('students/1/checkins')
        .header('studentid', '1')
        .end()
    )
  );

  const response = await client
    .post('students/1/checkins')
    .header('studentid', '1')
    .end();

  response.assertStatus(401);
});
