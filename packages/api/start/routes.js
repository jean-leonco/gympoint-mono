const Route = use('Route');

Route.post('sessions', 'SessionController.store');

Route.group(() => {
  Route.resource('students', 'StudentController')
    .apiOnly()
    .validator(new Map([
      [['students.store'], ['StoreStudent']],
      [['students.update'], ['UpdateStudent']],
    ]));

  Route.resource('students.checkins', 'CheckinController').only(['index', 'store']);
  Route.resource('students.assistance-requests', 'AssistanceRequestController').only(['index', 'store']);

  Route.resource('plans', 'PlanController')
    .apiOnly()
    .validator(new Map([
      [['plans.store'], ['StorePlan']],
      [['plans.update'], ['UpdatePlan']],
    ]));

  Route.resource('registrations', 'RegistrationController')
    .apiOnly()
    .validator(new Map([
      [['registrations.store'], ['StoreRegistration']],
      [['registrations.update'], ['UpdateRegistration']],
    ]));

  Route.get('assistance-requests', 'HelpRequestController.index');
  Route.post('assistance-requests/:request_id/answer', 'HelpRequestController.store');
}).middleware('auth');
