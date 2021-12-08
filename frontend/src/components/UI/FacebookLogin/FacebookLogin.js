import React from 'react';
import FacebookLoginButton from "react-facebook-login/dist/facebook-login-render-props";
import FacebookIcon from '@material-ui/icons/Facebook';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {facebookLogin} from "../../../store/Actions/usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        console.log(response);
        dispatch(facebookLogin(response));
    };

    return (
        <FacebookLoginButton
            appId="603135217617672"
            fields="name, email,picture"
            render={props => (
                <Button
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<FacebookIcon/>}
                onClick={props.onClick}
                >
                    Login with Facebook
                </Button>
            )}
            callback={facebookResponse}
        />
    );
};

export default FacebookLogin;