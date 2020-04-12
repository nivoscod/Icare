import axios from 'axios';

export const userService = {
    login
};

function login(email, password) {
    return new Promise(function (resolve, reject) {
        let data = {
            docEmail: email,
            docPassword: password
        }

        let url = 'http://127.0.0.1:8080/doctors/authenticate';
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }

        axios.post(url, data, axiosConfig)
            .then(handleResponse)
            .then(user => {
                console.log(user)
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                resolve(user);
            });
    })
}

function handleResponse(response) {
    if (response.status === 400) {
        // auto logout if 401 response returned from api
        //logout();
        //location.reload(true);
        return Promise.reject(response.error);
    }
    console.log(response.data)
    return JSON.stringify(response.data)
};