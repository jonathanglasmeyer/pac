export default (state = {}, {type, payload}) => {
  switch (type) {
    case 'RECEIVE_STATUS':
      return {status: payload.status}
    default:
      return state
  }
}
