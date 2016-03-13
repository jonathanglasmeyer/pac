export default (state = {}, {type, payload}) => {
  switch (type) {
    case 'SET_STATUS':
      return {status: payload.status}
    default:
      return state
  }
}
