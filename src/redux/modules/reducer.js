import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import { popUpReducer } from './popUp';
import { datePlanSchedulesReducer } from './datePlan';
import { addDatePlanReducer } from './addDatePlan';
import { dutyReducer } from './duty';
import { changeDutyReducer } from './changeDuty';
import { appartDutyReducer } from './appartDuty';

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
  popUp: popUpReducer,
  schedules: datePlanSchedulesReducer,
  addDatePlan: addDatePlanReducer,
  dutys: dutyReducer,
  changeDutys: changeDutyReducer,
  appartDutys: appartDutyReducer,
});
