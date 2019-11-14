const Route = use('Route');

Route.post('sessions', 'SessionController.store');

Route.group(() => {
  Route.resource('students', 'StudentController').apiOnly();

  Route.resource('students.checkins', 'CheckinController').only(['index', 'store']);

  Route.resource('plans', 'PlanController').apiOnly();

  Route.resource('registrations', 'RegistrationController').apiOnly();
}).middleware('auth');
