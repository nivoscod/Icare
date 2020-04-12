import React, { Component } from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import { userActions } from '../../js/actions';

class Login extends Component {
        // reset login status
        //this.props.logout();
        state = {
            email: '',
            password: '',
            submitted: false
        };
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.loginAction(email, password);
        }
    }
    
    render() {
        return (
            <div className="login-background">
                <div className="login-wrapper">
                    <div className="login-title"> <h1> User Login </h1></div>

                    <div className="login-img"><img src="./img/Login.png" alt=""></img></div>
                    

                    <div className="input-container">
                        <i className="fa fa-envelope icon"></i>
                        <input className="input-field" type="text" placeholder="Email" name="email" onChange={this.handleChange} />
                    </div>

                    <div className="input-container">
                        <i className="fa fa-key icon"></i>
                        <input className="input-field" type="password" placeholder="Password" name="password" onChange={this.handleChange} />
                    </div>

                    <div className="login">
                        <button type="submit" onClick={this.handleSubmit}>LOGIN</button>
                        {this.props.loggingIn &&
                            <img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    loginAction: userActions.login
};

export default connect(mapState, actionCreators)(Login);
