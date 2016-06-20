const LOAD_OPERATING_ROOM = 'LOAD_OPERATING_ROOM';
const LOAD_OPERATING_ROOM_SUCCESS = 'LOAD_OPERATING_ROOM_SUCCESS';
const LOAD_OPERATING_ROOM_FAIL = 'LOAD_OPERATING_ROOM_FAIL';

const LOAD_OPERA_DOCTORS = 'LOAD_OPERA_DOCTORS';
const LOAD_OPERA_DOCTORS_SUCCESS = 'LOAD_OPERA_DOCTORS_SUCCESS';
const LOAD_OPERA_DOCTORS_FAIL = 'LOAD_OPERA_DOCTORS_FAIL';

const LOAD_OPERA_NAME = 'LOAD_OPERA_NAME';
const LOAD_OPERA_NAME_SUCCESS = 'LOAD_OPERA_NAME_SUCCESS';
const LOAD_OPERA_NAME_FAIL = 'LOAD_OPERA_NAME_FAIL';

const LOAD_SELECTEDABLE_OPEARSEQ = 'LOAD_SELECTEDABLE_OPEARSEQ';
const LOAD_SELECTEDABLE_OPEARSEQ_SUCCESS = 'LOAD_SELECTEDABLE_OPEARSEQ_SUCCESS';
const LOAD_SELECTEDABLE_OPEARSEQ_FAIL = 'LOAD_SELECTEDABLE_OPEARSEQ_FAIL';

const LOAD_SURGERY_STATE = 'LOAD_SURGERY_STATE';
const LOAD_SURGERY_STATE_SUCCESS = 'LOAD_SURGERY_STATE_SUCCESS';
const LOAD_SURGERY_STATE_FAIL = 'LOAD_SURGERY_STATE_FAIL';

const operatingRooms = [
  {
    id: '01',
    name: '11术间',
  },
  {
    id: '02',
    name: '12术间',
  },
  {
    id: '03',
    name: '13术间',
  }
];

const operaNames = [
  {
    id: '01',
    name: '开刀手术1'
  },
  {
    id: '02',
    name: '开刀手术2'
  },
  {
    id: '03',
    name: '开刀手术3'
  }];

const operaDoctors = [
  {
    id: '01',
    name: '医生1',
  },
  {
    id: '02',
    name: '医生2',
  },
  {
    id: '03',
    name: '医生3',
  }
];

const surgeryStates = [
  {
    surgeryId: '01',
    status: 'ready',
    name: '未安排',
  },
  {
    surgeryId: '02',
    status: 'doing',
    name: '安排中',
  },
  {
    surgeryId: '03',
    status: 'done',
    name: '死亡',
  },
  {
    surgeryId: '04',
    status: 'hidden',
    name: '出院',
  }
];

const selectedAbleSeqs = [2, 4, 5];

const initState = {
  error: null,
  tip: null,
  operatingRooms: operatingRooms || [],
  selectedAbleSeqs: selectedAbleSeqs || [],
  operaNames: operaNames || [],
  operaDoctors: operaDoctors || [],
  surgeryStates: surgeryStates || [],
};

export function loadSurgeryInforReducer(state = initState, action = {}) {
  switch (action.type) {
    case LOAD_OPERATING_ROOM:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_OPERATING_ROOM_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        operatingRoom: action.result,
        error: null
      };
    case LOAD_OPERATING_ROOM_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    case LOAD_OPERA_DOCTORS:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_OPERA_DOCTORS_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        operatingRoom: action.result,
        error: null
      };
    case LOAD_OPERA_DOCTORS_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    case LOAD_OPERA_NAME:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_OPERA_NAME_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        operaNames: action.result,
        error: null
      };
    case LOAD_OPERA_NAME_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    case LOAD_SELECTEDABLE_OPEARSEQ:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_SELECTEDABLE_OPEARSEQ_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        selectedAbleSeqs: action.result,
        error: null
      };
    case LOAD_SELECTEDABLE_OPEARSEQ_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    case LOAD_SURGERY_STATE:
      return {
        ...state,
        error: null,
        tip: null
      };
    case LOAD_SURGERY_STATE_SUCCESS:
      return {
        ...state,
        tip: action.tip,
        surgeryStates: action.result,
        error: null
      };
    case LOAD_SURGERY_STATE_FAIL:
      return {
        ...state,
        error: action.result,
        tip: null
      };

    default:
      return state;
  }
}


/**
 * action: load opera room
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperatingRoom() {
  return {
    types: [LOAD_OPERATING_ROOM, LOAD_OPERATING_ROOM_SUCCESS, LOAD_OPERATING_ROOM_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: load opera doctors
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperaDoctor() {
  return {
    types: [LOAD_OPERA_DOCTORS, LOAD_OPERA_DOCTORS_SUCCESS, LOAD_OPERA_DOCTORS_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: load opera name
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperaName() {
  return {
    types: [LOAD_OPERA_NAME, LOAD_OPERA_NAME_SUCCESS, LOAD_OPERA_NAME_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: load selectedable opera seq
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperaSeq() {
  return {
    types: [LOAD_SELECTEDABLE_OPEARSEQ, LOAD_SELECTEDABLE_OPEARSEQ_SUCCESS, LOAD_SELECTEDABLE_OPEARSEQ_FAIL],
    promise: (client) => client.get('')
  };
}

/**
 * action: load operastates
 * @param options
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperaStates() {
  return {
    types: [LOAD_SURGERY_STATE, LOAD_SURGERY_STATE_SUCCESS, LOAD_SURGERY_STATE_FAIL],
    promise: (client) => client.get('')
  };
}
