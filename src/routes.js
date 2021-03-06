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
    ChangeDutyRecord,
    Opera,
    OperaPatInfor,
    AddPatient,
    ModifyPatient,
    PatientInfo,
    AddSurgery,
    PatientsCanSurgery,
    ModifySurgery,
    SurgeryInfor,
    DatePlanDetail,
    ModifyDatePlan,
    UserProfile,
    GroupList,
    ForgetPassword,
    ResetPassword,
    GroupMsgList,
    RateDoctor,
    NeedApartment,
    NeedApartAdd,
    NeedApartmentDetail,
    MyNeeds,
    NeedsDetail
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      // console.log('当前用户信息:');
      // console.log(user);
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
        <Route path="modify-date-plan/:id/:tempId" component={ModifyDatePlan} onEnter={requireLogin} />
        <Route path="duty/:pageType" component={Duty} onEnter={requireLogin} />
        <Route path="change-duty-record" component={ChangeDutyRecord} onEnter={requireLogin} />
        <Route path="opera" component={Opera} onEnter={requireLogin} />
        <Route path="opera-patient" component={OperaPatInfor} onEnter={requireLogin} />
        <Route path="add-patient" component={AddPatient} onEnter={requireLogin} />
        <Route path="modify-patient" component={ModifyPatient} onEnter={requireLogin}/>
        <Route path="patient/:id" component={PatientInfo} onEnter={requireLogin} />
        <Route path="patient-have-bed-list" component={PatientsCanSurgery} onEnter={requireLogin} />
        <Route path="forget-password" component={ForgetPassword} />
        <Route path="resetPassword" component={ResetPassword} />
        {/* ?uid=patientID */}
        <Route path="createSurgery" component={AddSurgery} onEnter={requireLogin} />
        <Route path="modify-surgery" component={ModifySurgery} onEnter={requireLogin} />
        <Route path="surgery/:id" component={SurgeryInfor} onEnter={requireLogin} />
        <Route path="my-profile" component={UserProfile} onEnter={requireLogin} />
        <Route path="group-list" component={GroupList} />
        <Route path="group-msg-list/:id" component={GroupMsgList} />
        {/* rate doctor, :id 邀约Id */}
        <Route path="rate/:id" component={RateDoctor} onEnter={requireLogin} />
        <Route path="appart-my-need" component={NeedApartment} />
        <Route path="add-appart-need" component={NeedApartAdd} />
        <Route path="appart-need-detail/:id" component={NeedApartmentDetail} />
        <Route path="my-needs" component={MyNeeds} />
        <Route path="needs-detail/:id/:type/:status" component={NeedsDetail} />
        { /* Routes requiring login */ }
        <Route onEnter={requireLogin} />
      </Route>
    </Route>
  );
};
