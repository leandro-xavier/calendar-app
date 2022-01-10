import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
  } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch(); 

    const {checking, uid} = useSelector(state => state.auth) //para obtener el check y ver si esta en true o false, el uid se utiliza para saber si esta autenticado

    useEffect(() => { //para checking de la autentificacion
       dispatch(startChecking())
    }, [dispatch])


    if(checking){ //se encarga de mostar un loading mientras chequea
        return <h5>espere...</h5>
    }

    //en este punto ya se sabe si la aplicacion esta autenticada o no

    return (
        
            <Router>
                <div>
                <Switch>
                    <PublicRoute 
                    exact 
                    path="/login" 
                    component={LoginScreen } 
                    isAuthenticated={!!uid} //el doble signo de adminarion convierte de string a boleano
                    />
                    <PrivateRoute 
                    exact 
                    path="/" 
                    component={CalendarScreen} 
                    isAuthenticated={!!uid} 
                    />

                    <Redirect to="/"/>
                </Switch>
                </div>
                
            </Router>
        
    )
}
