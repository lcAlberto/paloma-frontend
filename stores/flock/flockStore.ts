import {defineStore} from 'pinia'

import {getters} from './getters'
import {state} from './state'
import {actions} from './actions'

export const useFlockStore = defineStore('flockStore', {
  getters,
  state,
  actions,
})