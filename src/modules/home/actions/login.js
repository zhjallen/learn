import api from '../../../utils/api'
import constant from '../constant'

export function login(user, password) {
    return {
        type: constant.LOGIN
    }
}

export function logout() {
    return {
        type: constant.LOGOUT
    }
}

export function getCurrentUser() {
    return {
        type: constant.GETUSER,
        payload: {
            promise: api.get('/users/me', {
              
            })
        }
    }
}