const Server = use('Server');

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'App/Middleware/ConvertEmptyStringsToNull',
];

const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
  student: 'App/Middleware/Student',
};

const serverMiddleware = [
  // 'Adonis/Middleware/Static',
  'Adonis/Middleware/Cors',
];

Server.registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);
