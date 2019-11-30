const Ws = use('Ws');

Ws.channel('assistance-request', 'AssistanceRequestController').middleware(
  'auth'
);
