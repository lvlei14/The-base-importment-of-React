import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import { diaglogReducer } from './diaglog';
import { popUpReducer } from './popUp';
import { datePlanSchedulesReducer } from './datePlan';
import { addDatePlanReducer } from './addDatePlan';
import { dutyReducer } from './duty';
import { appartDutyReducer } from './appartDuty';
import { changeDutyReducer } from './changeDuty';
import { changeDutyRecordsReducer } from './changeDutyRecord';
import { operaReducer } from './opera';
import { operaPatientListReducer } from './operaInfor';
import { addPatientInforReducer } from './addPatient';
import { patientInforReducer } from './modifyPatient';
import { addSurgeryInforReducer } from './addSurgery';
import { loadSurgeryInforReducer } from './surgeryInfor';
import { accountReducer } from './account';
import { userSurgeryInforReducer } from './modifySurgery';
import { datePlanDetailReducer } from './datePlanDetail';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets,
  diaglog: diaglogReducer,
  popUp: popUpReducer,
  schedules: datePlanSchedulesReducer,
  addDatePlan: addDatePlanReducer,
  dutys: dutyReducer,
  appartDutys: appartDutyReducer,
  changeDutys: changeDutyReducer,
  changeDutyRecords: changeDutyRecordsReducer,
  operas: operaReducer,
  planedOpePatiens: operaPatientListReducer,
  addPatientInforReducer,
  patientInfor: patientInforReducer,
  addSurgeryInforReducer,
  surgeryInfor: loadSurgeryInforReducer,
  account: accountReducer,
  patientSurgeryInfor: userSurgeryInforReducer,
  datePlanDetail: datePlanDetailReducer,
});
