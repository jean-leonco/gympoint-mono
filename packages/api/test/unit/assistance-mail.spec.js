const Mail = use('Mail');
const { test } = use('Test/Suite')('Assistance Mail');
const Job = use('App/Jobs/AssistanceMail');

const job = new Job();

test('should send assistance request answered e-mail', async ({ assert }) => {
  Mail.fake();

  await job.handle({
    student: 'test',
    question: 'abcde',
    answer: 'abdec',
    email: 'test@mail.com',
  });

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.from.address, 'no_reply@gympoint.com');
  assert.equal(recentEmail.message.to[0].address, 'test@mail.com');
  assert.equal(recentEmail.message.subject, 'Assistance request answered');

  Mail.restore();
});
