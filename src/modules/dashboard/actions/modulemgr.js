import constant from '../'

export function registerModule(modulename) {
    return {
        type: constant.of('REGISTER_MODULE'),
    }
}
