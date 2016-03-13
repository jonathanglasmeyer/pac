
import * as PackageActions from './PackageActions'
import * as AppActions from '../../App/AppActions'
import {put, call} from 'redux-saga/effects'
import {collectState} from '../../../test/helpers'
import * as mock from '../../../test/fixtures'
import reducer from './PackageReducer'
import * as PackageSagas from './PackageSagas'

import * as pacman from '../../utils/pacman'
import rootReducer from '../../reducers'

describe('Package', () => {
  describe('actions', () => {
    it('loadPackages', () => {
      assert.deepEqual(PackageActions.loadPackages(), {type: 'LOAD_PACKAGES'})
    })

    it('uninstallPackage', () => {
      assert.deepEqual(PackageActions.uninstallPackage('foo'), {
        type: 'UNINSTALL_PACKAGE', payload: {name: 'foo'},
      })
    })
  })

  describe('reducer', () => {
    it('returns the initial state', () => {
      const r = reducer(undefined, {})
      assert.deepEqual(r, [])
    })

    it('handles RECEIVE_PACKAGES', () => {
      const packages = ['foo', 'bar']
      const r = reducer(['old', 'packages'], {type: 'RECEIVE_PACKAGES', payload: {packages}})
      assert.deepEqual(r, packages)
    })

    it('handles the default case', () => {
      const packages = ['old', 'packages']
      const r = reducer(packages, {type: 'SOME_OTHER_ACTION'})
      assert.deepEqual(r, packages)
    })
  })

  describe('state', () => {
    it('loadPackages', async () => {
      const result = await collectState({
        reducer,
        action: PackageActions.loadPackages(),
        count: 2,
      })

      assert(result.length === 2)

      assert.deepEqual(result[0], {
        action: PackageActions.loadPackages(),
        result: {},
      })

      assert.deepEqual(result[1], {
        action: PackageActions.receivePackages(mock.packages),
        result: mock.packages,
      })
    })

    it('uninstallPackage', async () => {
      const result = await collectState({
        reducer: rootReducer,
        action: PackageActions.uninstallPackage('foo'),
        count: 2,
      })

      assert(result.length === 2)

      assert.deepEqual(result[0], {
        action: PackageActions.uninstallPackage('foo'),
        result: {
          app: {},
          packages: [],
        },
      })

      const devStatus = {
        text: 'Not really uninstalling in DEVELOPMENT.',
        type: 'success',
      }

      assert.deepEqual(result[1], {
        action: AppActions.setStatus(devStatus),
        result: {
          app: {
            status: devStatus,
          },
          packages: [],
        },
      })
    })
  })

  describe('sagas', () => {
    it('loadPackages', () => {
      const gen = PackageSagas.loadPackages()
      assert.deepEqual(gen.next().value, call(pacman.getPackages))
      assert.deepEqual(
        gen.next(mock.packages).value,
        put(PackageActions.receivePackages(mock.packages))
      )
      assert.deepEqual(gen.next(), {done: true, value: undefined})
    })

    it('uninstallPackage', () => {
      const name = 'package name'
      const status = mock.status;
      const gen = PackageSagas.uninstallPackage({payload: {name}})
      assert.deepEqual(gen.next().value, call(pacman.uninstallPackage, name))
      assert.deepEqual(gen.next(status).value, put(AppActions.setStatus(status)))
      assert.deepEqual(gen.next(), {done: true, value: undefined})
    })
  })
})
