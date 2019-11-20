import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '../pages/Sign';

import Students from '../pages/Students';
import Plans from '../pages/Plans';
import Registrations from '../pages/Registrations';
import Assistances from '../pages/Assistances';

import CreateStudent from '../pages/HandleStudent/CreateStudent';
import EditStudent from '../pages/HandleStudent/EditStudent';

import CreatePlan from '../pages/HandlePlan/CreatePlan';
import EditPlan from '../pages/HandlePlan/EditPlan';

import CreateRegistration from '../pages/HandleRegistration/CreateRegistration';
import EditRegistration from '../pages/HandleRegistration/EditRegistration';

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

      <Route path="/students/new" component={CreateStudent} isPrivate />
      <Route path="/students/edit/:id" component={EditStudent} isPrivate />

      <Route path="/plans/new" component={CreatePlan} isPrivate />
      <Route path="/plans/edit/:id" component={EditPlan} isPrivate />

      <Route
        path="/registrations/new"
        component={CreateRegistration}
        isPrivate
      />
      <Route
        path="/registrations/edit/:id"
        component={EditRegistration}
        isPrivate
      />
    </Switch>
  );
}
