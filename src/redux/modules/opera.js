const LOAD_OPERA = 'LOAD_OPERA';
const LOAD_OPERA_SUCCESS = 'LOAD_OPERA_SUCCESS';
const LOAD_OPERA_FAIL = 'LOAD_OPERA_FAIL';

const operas = [
  {
    operatingRoom: {
      name: '12手术间',
      id: '12'
    },
    date: '2016-6-5',
    surgeries: [
      {
        name: '手术名字1',
        seq: 1, // 手术序号,
        doctor: '李医生',
        patient: {
          name: '王春华',
          gender: 'female',
          age: '29',
          id: '2000',
          roomNum: 'F50-11'  // 床位号  1， 2，3
        },
        apartment: {
          name: '心内科',
          id: '90'
        }
      },
      {
        name: '手术名字2',
        seq: 2, // 手术序号
        patient: {
          name: '王春华2',
          gender: 'male',
          age: '20',
          id: '2002',
          roomNum: 'F52-11'  // 床位号  1， 2，3
        },
        apartment: {
          name: '心内科',
          id: '90'
        }
      }
    ]
  },
  {
    operatingRoom: {
      name: '13手术间',
      id: '13'
    },
    date: '2016-6-5',
    surgeries: [
      {
        name: '手术名字1',
        seq: 1, // 手术序号
        patient: {
          name: '王春华',
          gender: 'female',
          age: '29',
          id: '2000',
          roomNum: 'F50-11'  // 床位号  1， 2，3
        },
        apartment: {
          name: '心内科',
          id: '90'
        }
      },
      {
        name: '手术名字2',
        seq: 2, // 手术序号
        patient: {
          name: '王春华2',
          gender: 'male',
          age: '20',
          id: '2002',
          roomNum: 'F52-11'  // 床位号  1， 2，3
        },
        apartment: {
          name: '心内科',
          id: '90'
        }
      }
    ]
  },
  {
    operatingRoom: {
      name: '12手术间',
      id: '12'
    },
    date: '2016-6-7',
    surgeries: [
      {
        name: '手术名字1',
        seq: 1, // 手术序号,
        doctor: '李医生',
        patient: {
          name: '王春华',
          gender: 'female',
          age: '29',
          id: '2000',
          roomNum: 'F50-11'  // 床位号  1， 2，3
        },
        apartment: {
          name: '心内科',
          id: '90'
        }
      },
      {
        name: '手术名字2',
        seq: 2, // 手术序号
        patient: {
          name: '王春华2',
          gender: 'male',
          age: '20',
          id: '2002',
          roomNum: 'F52-11'  // 床位号  1， 2，3
        },
        apartment: {
          name: '心内科',
          id: '90'
        }
      }
    ]
  },
];

const initState = {
  loading: false,
  tip: null,
  operas: operas || [],
};


export function operaReducer(state = initState, action = {}) {
  switch (action.type) {

    case LOAD_OPERA:
      return {
        ...state,
        loading: true
      };

    case LOAD_OPERA_SUCCESS:
      return {
        ...state,
        loading: false,
        operas: action.result,
        tip: action.tip
      };

    case LOAD_OPERA_FAIL:
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
 * action: load OPERAs
 * @param text String
 * @returns {{types: *[], promise: promise}}
 */
export function loadOperas() {
  return {
    types: [LOAD_OPERA, LOAD_OPERA_SUCCESS, LOAD_OPERA_FAIL],
    promise: (client) => client.get('')
  };
}
