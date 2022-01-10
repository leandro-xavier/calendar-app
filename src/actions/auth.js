import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types';
import { eventLogout } from './events';

export const startLogin = (email, password) => {
    return async(dispatch) => { //dispatch esta disponible gracias a thunk
        const resp = await fetchSinToken('auth', { email, password }, 'POST'); //hace el post del login
        const body = await resp.json(); //envia la respusta en formato json

        if (body.ok) { //verifica si todo salio bien 
            localStorage.setItem('token', body.token) // guarda el token del cuerpo y lo pone el local storage
            localStorage.setItem('token-init-date', new Date().getTime()) //guarda la hora exacta en que se creo el token para saber cuanto tiempo le queda 

            dispatch(login({ //envia el uid y el nombre al state o el store para manejarlo
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error'); //envia la alerta de error que esta en body de la respuesta del error
        }

    }
}

export const startRegister = (email, password, name) => {
    return async(dispatch) => {
        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST'); //hace el post del login
        const body = await resp.json(); //envia la respusta en formato json

        if (body.ok) { //verifica si todo salio bien 
            localStorage.setItem('token', body.token) // guarda el token del cuerpo y lo pone el local storage
            localStorage.setItem('token-init-date', new Date().getTime()) //guarda la hora exacta en que se creo el token para saber cuanto tiempo le queda 

            dispatch(login({ //envia el uid y el nombre al state o el store para manejarlo
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error'); //envia la alerta de error que esta en body de la respuesta del error
        }


    }
}



export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew'); //obtiene el get del nuevo token
        const body = await resp.json(); //envia la respusta en formato json

        if (body.ok) { //verifica si todo salio bien 
            localStorage.setItem('token', body.token) // guarda el token del cuerpo y lo pone el local storage
            localStorage.setItem('token-init-date', new Date().getTime()) //guarda la hora exacta en que se creo el token para saber cuanto tiempo le queda 

            dispatch(login({ //envia el uid y el nombre al state o el store para manejarlo
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({ // cuando se pone entre parentesis inmediatamente se retorna
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear() //borrar el token del localstorage 
        dispatch(eventLogout()) //borrar el state y restablecerlo al initial state
        dispatch(logout())
    }
}

const logout = () => ({ type: types.authLogout }) //funcion para hacer logout