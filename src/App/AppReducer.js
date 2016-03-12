export default (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_STATUS':
      return {status: action.status};
    default:
      return state;
  }
};
