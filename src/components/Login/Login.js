import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {
    render() {
        return (
            <div className="login-background">
                <div className="login-wrapper">
                    <div className="login-title"> <h1> User Login </h1></div>

                    <div className="login-img"><img src="./img/Login.png"></img></div>
                    

                    <div class="input-container">
                        <i class="fa fa-envelope icon"></i>
                        <input class="input-field" type="text" placeholder="Email" name="email" />
                    </div>

                    <div class="input-container">
                        <i class="fa fa-key icon"></i>
                        <input class="input-field" type="password" placeholder="Password" name="password" />
                    </div>

                    <div className="login">
                        <button type="submit">LOGIN</button>
                    </div>

                 


                </div>
            </div>
        );
    }
}

export default Login;