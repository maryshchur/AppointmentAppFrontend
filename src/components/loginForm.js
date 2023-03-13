import React, {Component} from "react";
import axios from '../utils/axios';
import LocalSessionStorageService from "../service/LocalStorageService";
import {Alert} from "@mui/lab";
import {Button, Container, CssBaseline, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {Navigation} from "@mui/icons-material";

const localStorageService = LocalSessionStorageService.getService();

const style = {
    marginTop: 40
};

class LoginForm extends Component {

    state = {
        email: undefined,
        password: undefined,
        errorMessage: '',
        role:undefined
    };

    getRole = () =>{
        axios.get("/user-role").then(response=>{
            this.setState({role:response.data});
            sessionStorage.setItem('userrole', response.data);
            this.verifyUser();
            }, error => {}
        )
    };
    verifyUser = () => {
        if (sessionStorage.getItem('userrole') === "ROLE_ADMIN") {
            window.location.href = "/admin-panel";
        } else if (sessionStorage.getItem('userrole') === "ROLE_TEACHER") {
            window.location.href = "/home-page";
        } else if (sessionStorage.getItem('userrole') === "ROLE_STUDENT") {
            window.location.href = "/all-teachers";
            // navigate('/all-teachers"', { replace: true });
        } else if (sessionStorage.getItem('userrole')=== "ROLE_GUEST") {
            window.location.href = "/welcome";
        }
    };

    getData = () => {
        axios.post("/authentication", this.state).then(response => {
            if (response !== undefined) {
                console.log(response);
                console.log('response');
                localStorageService.setAccessToken(response.data);
                // localStorageService.setId(response.data.id);
                this.getRole();
            }}, error => {
            console.log('error');
            console.log(error);
            console.log(error.response.data);
            this.setState({errorMessage: error.response.data.message});
        })
    };

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    };


    render() {

        return (
            <Container component="main" maxWidth="xs" style={style}>
                <CssBaseline/>
                {this.state.errorMessage ? <Alert severity="error">{this.state.errorMessage}</Alert> : null}
                <div>
                    <TextField
                        onChange={this.onChangeEmail}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        onChange={this.onChangePassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.getData}
                    >Sign In
                    </Button>

                    <Box mt={3}>
                        <Grid container>
                            <Grid item>Don't have an account?
                                <Link to="/registration" reloadDocument={false}>Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Container>
        );
    }
}

export default LoginForm;