export default (state = [], {type, payload}) => {
  switch (type) {
    case 'RECEIVE_PACKAGES':
      return payload.packages
    default:
      return state
  }
}
