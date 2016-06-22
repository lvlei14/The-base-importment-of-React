import React from 'react';
import {IndexRoute, Route} from 'react-router';  // IndexRoute
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    DatePlan,
    LoginOrRegister,
    AddDatePlan,
    Duty,
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
    UserProfile,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/login-or-register');
      }
      cb();
    }

    // function authError() {
    //   console.log('error');
    // }

    // if (!isAuthLoaded(store.getState())) {
    //   store.dispatch(loadAuth()).then(checkAuth, authError);
    // } else {
    //   checkAuth();
    // }
    checkAuth();
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
        <Route path="add-date-plan/:id" component={AddDatePlan} />
        <Route path="date-plan-detail/:id/:type" component={DatePlanDetail} />
        <Route path="duty/:pageType" component={Duty} />
        <Route path="change-duty-record" component={ChangeDutyRecord} />
        <Route path="opera" component={Opera} />
        <Route path="opera-patient" component={OperaPatInfor} />
        <Route path="add-patient" component={AddPatient} />
        <Route path="modify-patient" component={ModifyPatient} />
        <Route path="patient/:id" component={PatientInfor} />
        <Route path="patient-have-bed-list" component={PatientsCanSurgery} />
        <Route path="createSurgery" component={AddSurgery} />
        <Route path="modify-surgery" component={ModifySurgery} />
        <Route path="surgery" component={SurgeryInfor} />
        <Route path="modify-date-plan" component={ModifyDatePlan} />
        <Route path="my-profile" component={UserProfile} />
        { /* Routes requiring login */ }
        <Route onEnter={requireLogin} />
      </Route>
    </Route>
  );
};
