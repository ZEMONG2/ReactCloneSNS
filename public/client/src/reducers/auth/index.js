const initialState = {
  session: undefined,
  following: [],
  follower: [],
  feeds: []
};
const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case '@auth/FEEDS_UPDATE':
      return {
        ...state,
        feeds: [...payload]
      };
    case '@auth/FOLLOWER_UPDATE':
      return {
        ...state,
        follower: [...payload]
      };
    case '@auth/FOLLOWING_UPDATE':
      return {
        ...state,
        following: [...payload]
      };
    case '@auth/SESSION_UPDATE':
      return {
        ...state,
        session: payload
      };
    default:
      return state;
  }
};
export default auth;
