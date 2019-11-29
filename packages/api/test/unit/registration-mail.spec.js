const { format } = require('date-fns');

const Mail = use('Mail');
const { test } = use('Test/Suite')('Registration Mail');
const Job = use('App/Jobs/RegistrationMail');

const job = new Job();

test('should send student registration e-mail', async ({ assert }) => {
  Mail.fake();

  await job.handle({
    student: 'test',
    plan: 'test plan',
    due_date: format(new Date(), "MMMM dd',' yyyy"),
    price: 190.9,
    email: 'test@mail.com',
  });

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.from.address, 'no_reply@gympoint.com');
  assert.equal(recentEmail.message.to[0].address, 'test@mail.com');
  assert.equal(recentEmail.message.subject, 'GymPoint registration');

  Mail.restore();
});
