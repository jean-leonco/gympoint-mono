const Ws = use('Ws');
const AssistanceRequest = use('App/Models/AssistanceRequest');

const AssistanceRequestHook = (exports = module.exports = {});

AssistanceRequestHook.sendWs = async () => {
  const channel = Ws.getChannel('assistance-request').topic(
    'assistance-request'
  );

  if (channel) {
    const count = await AssistanceRequest.query()
      .where('answer', null)
      .count('* as total');

    const { total } = count[0];

    channel.broadcast('notification', { total });
  }
};
