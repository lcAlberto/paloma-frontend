import {defineStore} from 'pinia'

import {getters} from './getters'
import {state} from './state'
import {actions} from './actions'

export const useAddressStore = defineStore('addressStore', {
  getters,
  state,
  actions,
})