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
    AppartDuty,
    ChangeDuty,
    ChangeDutyRecord,
    Opera,
    OperaPatInfor,
    AddPatient,
    ModifyPatient,
    PatientInfor,
    AddSurgery,
    PatientsCanSurgery,
    ModifySurgery,
    SurgeryInfor,
    DatePlanDetail,
    ModifyDatePlan,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      console.log('当前用户信息:');
      console.log(user);
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login-or-register');
      }
      cb();
    }

    function authError() {
      replace('/login-or-register');
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth, authError);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route>
      <Route path="login-or-register" component={LoginOrRegister} />
      <Route path="/" component={App} >
        { /* Home (main) route */ }
        <IndexRoute component={Home} onEnter={requireLogin} />
        <Route path="date-plan" component={DatePlan} onEnter={requireLogin} />
        <Route path="add-date-plan/:id" component={AddDatePlan} onEnter={requireLogin} />
        <Route path="date-plan-detail/:id/:type" component={DatePlanDetail} onEnter={requireLogin} />
        <Route path="duty/:pageType" component={Duty} onEnter={requireLogin} />
        <Route path="appart-duty" component={AppartDuty} onEnter={requireLogin} />
        <Route path="change-duty" component={ChangeDuty} onEnter={requireLogin} />
        <Route path="change-duty-record" component={ChangeDutyRecord} onEnter={requireLogin} />
        <Route path="opera" component={Opera} onEnter={requireLogin} />
        <Route path="opera-patient" component={OperaPatInfor} onEnter={requireLogin} />
        <Route path="add-patient" component={AddPatient} onEnter={requireLogin} />
        <Route path="modify-patient" component={ModifyPatient} onEnter={requireLogin} />
        <Route path="patient/:id" component={PatientInfor} onEnter={requireLogin} />
        <Route path="patient-have-bed-list" component={PatientsCanSurgery} onEnter={requireLogin} />
        <Route path="createSurgery" component={AddSurgery} onEnter={requireLogin} />
        <Route path="modify-surgery" component={ModifySurgery} onEnter={requireLogin} />
        <Route path="surgery" component={SurgeryInfor} onEnter={requireLogin} />
        <Route path="modify-date-plan" component={ModifyDatePlan} onEnter={requireLogin} />
        { /* Routes requiring login */ }
        <Route onEnter={requireLogin} />
      </Route>
    </Route>
  );
};
