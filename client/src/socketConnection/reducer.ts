export const START_CHANNEL = 'START_CHANNEL';
export const STOP_CHANNEL = 'STOP_CHANNEL';
export const CHANNEL_ON = 'CHANNEL_ON';
export const CHANNEL_OFF = 'CHANNEL_OFF';
export const SERVER_ON = 'SERVER_ON';
export const SERVER_OFF = 'SERVER_OFF';
export const CREATE_NEW_ROOM = 'CREATE_NEW_ROOM';
export const SET_ROOM = 'SET_ROOM';
export const JOIN_ROOM = 'JOIN_ROOM';
export const SECOND_USER_COMPLETED_FORM = 'SECOND_USER_COMPLETED_FORM';

const initialState = {
  channelStatus: 'off',
  serverStatus: 'unknown',
  room : null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case SERVER_ON:
      return { ...state, serverStatus: 'on' };
    case SET_ROOM:
      return { ...state, room: action.room };
    default:
      return state;
  }
};

// action creators for Stop and Start buttons. You can also put them into componentDidMount
export const startChannel = () => ({ type: START_CHANNEL });
export const stopChannel = () => ({ type: STOP_CHANNEL });
export const createNewRoom = () => ({ type: CREATE_NEW_ROOM  });
export const joinRoom = () => ({ type: JOIN_ROOM  });



