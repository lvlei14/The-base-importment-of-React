import React from 'react';
import {IndexRoute, Route} from 'react-router';  // IndexRoute
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    DatePlan,
    LoginOrRegister,
    AddDatePlan,
    Duty,
    ChangeDuty,
    AppartDuty,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  // <IndexRoute component={Home}/>
  // <Route path="chat" component={Chat}/>
  // <Route path="loginSuccess" component={LoginSuccess}/>
  return (
    <Route>
      <Route path="login-or-register" component={LoginOrRegister} />
      <Route path="/" component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>
        <Route path="date-plan" component={DatePlan} />
        <Route path="add-date-plan" component={AddDatePlan} />
        <Route path="duty" component={Duty} />
        <Route path="change-duty" component={ChangeDuty} />
        <Route path="appart-duty" component={AppartDuty} />
        { /* Routes requiring login */ }
        <Route onEnter={requireLogin} />
      </Route>
    </Route>
  );
};
