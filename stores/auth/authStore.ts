import {defineStore} from 'pinia'

import {getters} from './getters'
import {state} from './state'
import {actions} from './actions'

export const useAuthStore = defineStore('authStore', {
    getters,
    state,
    actions,
})