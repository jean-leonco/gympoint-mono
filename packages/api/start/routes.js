const Route = use('Route');

Route.post('/sessions', 'SessionController.store');

Route.group(() => {
  Route.resource('/students', 'StudentController').apiOnly();

  Route.resource('/plans', 'PlanController').apiOnly();
}).middleware('auth');
