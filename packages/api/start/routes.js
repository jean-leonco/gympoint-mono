const Route = use('Route');

Route.post('/sessions', 'SessionController.store');

Route.resource('/students', 'StudentController').apiOnly();
