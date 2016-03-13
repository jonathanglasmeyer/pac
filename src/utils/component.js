import {pure, compose, setPropTypes, lifecycle} from 'recompose'
import {noop} from 'lodash'

export default ({propTypes, setup}, renderFn) => {
  const lifecycleFn = lifecycle(({props}) => setup(props), noop)
  const fns = [
    setPropTypes(propTypes),
    ...(setup ? [lifecycleFn] : []),
    pure,
  ]
  return compose(...fns)(renderFn)
}
