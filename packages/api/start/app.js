const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/antl/providers/AntlProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/mail/providers/MailProvider',
  'adonis-kue/providers/KueProvider',
  '@adonisjs/redis/providers/RedisProvider',
];

const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-kue/providers/CommandsProvider',
  '@adonisjs/vow/providers/VowProvider',
];

const aliases = {};

const commands = [];

const jobs = ['App/Jobs/RegistrationMail', 'App/Jobs/AssistanceMail'];

module.exports = {
  providers,
  aceProviders,
  aliases,
  commands,
  jobs,
};
