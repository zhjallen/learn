import api from '../../../utils/api'
import constant from '../'

export function login(user, password) {
    return {
        type: constant.of('LOGIN'),
        payload: {
            promise: api.put('/auth/login', {
                data: {
                    user: user,
                    password: password
                }
            })
        }
    }
}

export function logout() {
    console.log('a');
    return {
        type: constant.of('LOGOUT')
    }
}

export function register(user, phone, password) {
    return {
        type: constant.of('REGISTER'),
        payload: {
            promise: api.put('/register', {
                data: {
                    user: user,
                    phone: phone,
                    password: password
                }
            })
        }
    }
}

export function getCurrentUser() {
    return {
        type: constant.of('GETUSER'),
        payload: {
            promise: api.get('/users/me', {

            })
        }
    }
}