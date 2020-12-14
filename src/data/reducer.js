export default function reducer(state, action) {
  switch (action.type) {
    case "ACTIVE_CANDIDATE":
      return {
        ...state,
        activeNominee: action.payload,
      };
    default:
      return state;
  }
}
