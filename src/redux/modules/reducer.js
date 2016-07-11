import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import widgets from './widgets';
import { diaglogReducer } from './diaglog';
import { popUpReducer } from './popUp';
import { searchReducer } from './search';
import { datePlanSchedulesReducer } from './datePlan';
import { datePlanInfoReducer } from './datePlanInfo';
import { dutyReducer } from './duty';
import { changeDutyRecordsReducer } from './changeDutyRecord';
import { operaReducer } from './opera';
import { operaPatientListReducer } from './operaInfor';
import patient from './patient';
import { patientInforReducer } from './modifyPatient';
import { loadSurgeryInforReducer } from './surgeryInfor';
import { accountReducer } from './account';
import { userSurgeryInforReducer } from './modifySurgery';
import hospitalOperationRoom from './hospitalOperationRoom';
import surgeryType from './surgeryType';
import surgery from './surgery';
import doctor from './doctor';
import forgetPassword from './forgetPassword';
import { groupListReducer } from './groupList';
import { groupInfoReducer } from './groupInfo';
import invitation from './invitation';
import comment from './comment';
import myneeds from './myneeds';
import needsdetail from './needsdetail';


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
  widgets,
  diaglog: diaglogReducer,
  popUp: popUpReducer,
  searchResults: searchReducer,
  schedules: datePlanSchedulesReducer,
  datePlanInfo: datePlanInfoReducer,
  dutys: dutyReducer,
  changeDutyRecords: changeDutyRecordsReducer,
  operas: operaReducer,
  planedOpePatiens: operaPatientListReducer,
  patient,
  surgery,
  doctor,
  patientInfor: patientInforReducer,
  surgeryInfor: loadSurgeryInforReducer,
  account: accountReducer,
  patientSurgeryInfor: userSurgeryInforReducer,
  hospitalOperationRoom,
  surgeryType,
  forgetPassword,
  comment,
  groupList: groupListReducer,
  groupInfo: groupInfoReducer,
  invitation,
  myneeds,
  needsdetail
});
