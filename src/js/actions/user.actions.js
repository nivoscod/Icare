import { userConstants } from '../constants/user.constants';
import { userService } from '../../services/user.service';
import { createBrowserHistory } from 'history';


export const userActions = {
    login
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        userService.login(email, password)
        .then(
            user => { 
                console.log('hi')
                dispatch(success(user));
                createBrowserHistory().push('/');
            },
            error => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
