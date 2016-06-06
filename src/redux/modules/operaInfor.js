const LOAD_ALREADY_PLANOPERA_PATIENT = 'LOAD_ALREADY_PLANOPERA_PATIENT';
const LOAD_ALREADY_PLANOPERA_PATIENT_SUCCESS = 'LOAD_ALREADY_PLANOPERA_PATIENT_SUCCESS';
const LOAD_ALREADY_PLANOPERA_PATIENT_FAIL = 'LOAD_ALREADY_PLANOPERA_PATIENT_FAIL';

const CHANGE_SURGERY_STATE = 'CHANGE_SURGERY_STATE';
const CHANGE_SURGERY_STATE_SUCCESS = 'CHANGE_SURGERY_STATE_SUCCESS';
const CHANGE_SURGERY_STATE_FAIL = 'CHANGE_SURGERY_STATE_FAIL';

const LOAD_NOT_ROOMNUM_PATIENT = 'LOAD_NOT_ROOMNUM_PATIENT';
const LOAD_NOT_ROOMNUM_PATIENT_SUCCESS = 'LOAD_NOT_ROOMNUM_PATIENT_SUCCESS';
const LOAD_NOT_ROOMNUM_PATIENT_FAIL = 'LOAD_NOT_ROOMNUM_PATIENT_FAIL';

const LOAD_NOT_PLAN_PATIENT = 'LOAD_NOT_PLAN_PATIENT';
const LOAD_NOT_PLAN_PATIENT_SUCCESS = 'LOAD_NOT_PLAN_PATIENT_SUCCESS';
const LOAD_NOT_PLAN_PATIENT_FAIL = 'LOAD_NOT_PLAN_PATIENT_FAIL';

const planedOpePatiens = [
  {
    name: '名字1',
    id: '1',
    gender: 'female',
    age: '29',
    roomNum: 'F-5011',     // 床位编号
    surgery: {
      id: '02',
      name: '开刀手术',
      doctor: '李医生',
      date: '2016-05-06',
      seq: '2',
      operatingRoom: {
        name: '手术室11',
        id: '11',
      },
      mark: '备注1'
    }   // 手术ID
  },
  {
    name: '名字2',
    id: '2',
    gender: 'male',
    age: '20',
    roomNum: 'F-5012',     // 床位编号
    surgery: {
      id: '03',
      name: '开刀手术2',
      doctor: '李医生',
      date: '2016-05-07',
      seq: '3',
      operatingRoom: {
        name: '手术室12',
        id: '12',
      },
      mark: '备注2'
    }   // 手术ID
  }
];

const notRoomPatiens = [
  {
    name: '名字3',
    id: '3',
    gender: 'female',
    age: '29',
    roomNum: 'F-5011',     // 床位编号
    surgery: {
    }   // 手术ID
  },
  {
    name: '名字4',
    id: '4',
    gender: 'male',
    age: '20',
    roomNum: 'F-5012',     // 床位编号
    surgery: {
    }   // 手术ID
  }
];

const initState = {
  loading: false,
  tip: null,
  planedOpePatiens: planedOpePatiens || [],
  notRoomPatiens: notRoomPatiens || [],
  notPlanPatiens: planedOpePatiens || [],
};


export function operaPatientListReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_ALREADY_PLANOPERA_PATIENT:
      return {
        ...state,
        loading: true
      };

    case LOAD_ALREADY_PLANOPERA_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        planedOpePatiens: action.result,
        tip: action.tip
      };

    case LOAD_ALREADY_PLANOPERA_PATIENT_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case CHANGE_SURGERY_STATE:
      return {
        ...state,
        loading: true
      };

    case CHANGE_SURGERY_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };

    case CHANGE_SURGERY_STATE_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case LOAD_NOT_ROOMNUM_PATIENT:
      return {
        ...state,
        loading: true
      };

    case LOAD_NOT_ROOMNUM_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        notRoomPatiens: action.result,
        tip: action.tip
      };

    case LOAD_NOT_ROOMNUM_PATIENT_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };


    case LOAD_NOT_PLAN_PATIENT:
      return {
        ...state,
        loading: true
      };

    case LOAD_NOT_PLAN_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        notPlanPatiens: action.result,
        tip: action.tip
      };

    case LOAD_NOT_PLAN_PATIENT_FAIL:
      return {
        ...state,
        loading: false,
        tip: action.tip
      };
    default:
      return state;
  }
}

/**
 * action: load ALREADY_PLANOPERA_PATIENTs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadAlredayPlanOperaPatients() {
  return {
    types: [LOAD_ALREADY_PLANOPERA_PATIENT, LOAD_ALREADY_PLANOPERA_PATIENT_SUCCESS, LOAD_ALREADY_PLANOPERA_PATIENT_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: change surgery state
 * @param surgeryId state
 * @returns {{types: *[], promise: promise}}
 */
export function changeSurgeryState() {
  return {
    types: [CHANGE_SURGERY_STATE, CHANGE_SURGERY_STATE_SUCCESS, CHANGE_SURGERY_STATE_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: not room
 * @param surgeryId state
 * @returns {{types: *[], promise: promise}}
 */
export function loadNotRoomPatient() {
  return {
    types: [LOAD_NOT_ROOMNUM_PATIENT, LOAD_NOT_ROOMNUM_PATIENT_SUCCESS, LOAD_NOT_ROOMNUM_PATIENT_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: has room but not plan
 * @param surgeryId state
 * @returns {{types: *[], promise: promise}}
 */
export function loadNotPlanPatient() {
  return {
    types: [CHANGE_SURGERY_STATE, CHANGE_SURGERY_STATE_SUCCESS, CHANGE_SURGERY_STATE_FAIL],
    promise: (client) => client.get('')
  };
}
