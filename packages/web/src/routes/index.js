import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '../pages/Sign';

import Students from '../pages/Students';
import Plans from '../pages/Plans';
import Registrations from '../pages/Registrations';
import Assistances from '../pages/Assistances';

import StudentForm from '../components/StudentForm';
import PlanForm from '../components/PlanForm';
import RegistrationForm from '../components/RegistrationForm';

export default function routes() {
  return (
    <Switch>
      <Route path="/" exact component={Sign} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/assistance-requests"
        exact
        component={Assistances}
        isPrivate
      />

      <Route path="/students/new" component={StudentForm} isPrivate />
      <Route path="/plans/new" component={PlanForm} isPrivate />
      <Route path="/registrations/new" component={RegistrationForm} isPrivate />

      <Route path="/students/edit/:id" component={StudentForm} isPrivate />
      <Route path="/plans/edit/:id" component={PlanForm} isPrivate />

      <Route
        path="/registrations/edit/:id"
        component={RegistrationForm}
        isPrivate
      />
    </Switch>
  );
}
