const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';

const initState ={
  isHide: false,
  title: '',
  popUpContent: ''
};

export function popUpReducer(state = initState, action){
  switch (action.type){
    case SHOW_POPUP:
      return{
        ...state,
        isHide: true,
        title: action.title,
        popUpContent: action.popUpContent
      };
    case HIDE_POPUP:
      return{
        ...state,
        isHide: false,
        title: '',
        popUpContent: ''
      };
    default:
      return state;
  }
}

/**
 * action: show popUp
 * @params: isHide,title,content
 *
 */
export function showPopUp(title,content){
  return {
    type: SHOW_POPUP,
    title: title,
    popUpContent: content
  };
}

/**
 * action: hide popUp
 * @params:
 */
export function hidePopUp(){
  return {
    type: HIDE_POPUP,
    title: '',
    popUpContent: ''
  };
}