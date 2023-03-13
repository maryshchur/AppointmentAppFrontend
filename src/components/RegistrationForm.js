import React, {Component} from "react";
import axios from "../utils/axios";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";

const gridStyles = {
    marginTop: 30
};
const textFieldStyles = {
    width: 300,
    minWidth: 100,
    maxWidth: 300
};

const buttomStyles = {
    marginTop: 20,
    marginBottom: 20
};
class RegistrationForm extends Component {

    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        role: undefined,
        confirmationPassword: undefined,
        errorMessages: {},
        education:undefined,
        currentWorkPlace:undefined,
        yearsOfExperiences:undefined,
        minimalLessonDuration:undefined,
        id: undefined,
        image: undefined

    };
    isNotValid = () => {
        return (this.state.lastName === undefined  || this.state.image===undefined|| this.state.role === undefined ||
            this.state.password === undefined || this.state.firstName === undefined
            || this.state.email === undefined || this.state.confirmationPassword !== this.state.password);
    };

    onChangeFirstName = (event) => {
        this.setState({firstName: event.target.value});
    };
    onChangeLastName = (event) => {
        this.setState({lastName: event.target.value});
    };
    onChangeEmail = (event) => {
        this.setState({email: event.target.value});
    };
    onChangePassword = (event) => {
        this.setState({password: event.target.value});
    };
    onChangeEducation = (event) => {
        this.setState({education: event.target.value});
    };
    onChangeCurrentWorkPlace = (event) => {
        this.setState({currentWorkPlace: event.target.value});
    };
    onChangeYearsOfExperiences = (event) => {
        this.setState({yearsOfExperiences: event.target.value});
    };
    onChangeMinimalLessonDuration = (event) => {
        this.setState({minimalLessonDuration: event.target.value});
    };
    onChangeConfirmationPassword = (event) => {
        let confirmationPassword = event.target.value;
        this.setState({confirmationPassword});
        if (confirmationPassword !== this.state.password) {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: "Passwords do not match"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };

    handleChangeRole = (event)=>{
        this.setState({role: event.target.value});
    };

    putData = () => {
        let url;
        if(this.state.role==='Teacher'){
            url = '/registration-teacher';
        } else url = '/registration';
        axios.post(url, this.state).then(response => {
            this.setState({id: response.data},
                () => this.uploadImage()
            );
        }, error => {
            let errors = {};
            console.log('error');
            console.log(error);
            console.log(error.response.data);
            error.response.data.forEach(err => {
                errors[[err.name]] = err.message;
            });
            this.setState({errorMessages: errors}, () => console.log(this.state));
        });
    };
    checkMimeType = (event) => {
        let files = event.target.files[0];
        if ((files.type !== 'image/png') && (files.type !== 'image/jpeg') && (files.type !== 'image/gif')) {
            this.setState({err: files.type + ' is not a supported format'});
        } else {
            this.setState({err: ('')});
            return true;
        }
    };


    checkFileSize = (event) => {
        let files = event.target.files[0];
        let size = 4000000;
        if (files.size > size) {
            this.setState({err: 'image is too large, please pick a smaller file'});
            return false
        } else {
            this.setState({err: ('')});
            return true;
        }
    };
    handleClickAddImage = (event) => {
        if (this.checkMimeType(event) && (this.checkFileSize(event))) {
            this.setState({
                image: event.target.files[0]
            })
        }
    };
    uploadImage = () => {
        const formData = new FormData();
        formData.append('file', this.state.image);
        axios.put(`/upload-photo/${this.state.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            this.props.history.push("/");
        })
    };
    render() {
        const teacher = (
            <Grid container direction='column' alignItems='center' alignContent='center'>
                <TextField type="education" style={textFieldStyles} label="Education" onChange={this.onChangeEducation}
                           // helperText={this.state.errorMessages["firstName"]}
                           // error={this.state.errorMessages["firstName"] !== undefined}
                />
                <TextField type="currentWorkPlace" style={textFieldStyles} label="Current work place" onChange={this.onChangeCurrentWorkPlace}
                    // helperText={this.state.errorMessages["firstName"]}
                    // error={this.state.errorMessages["firstName"] !== undefined}
                />
                <TextField type="yearsOfExperiences" style={textFieldStyles} label="Years Of Experiences" onChange={this.onChangeYearsOfExperiences}
                    // helperText={this.state.errorMessages["firstName"]}
                    // error={this.state.errorMessages["firstName"] !== undefined}
                />
                <TextField type="minimalLessonDuration" style={textFieldStyles} label="Minimal lesson's duration" onChange={this.onChangeMinimalLessonDuration}
                    // helperText={this.state.errorMessages["firstName"]}
                    // error={this.state.errorMessages["firstName"] !== undefined}
                />
            </Grid>
        );
        let data;
        if (this.state.role==='Teacher'){
            data=teacher;
        }
        return (
            <Grid container spacing={-2} direction='column' alignItems='center' alignContent='center'
                  style={gridStyles}
            >
                <Typography variant='h4' color='primary' paragraph='true'>Create Account</Typography>
                <Typography variant='subtitle1' color='primary'>Please choose role </Typography>
                <FormControl required >
                    <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                    <Select style={{   width: 150}}
                        // labelId="demo-simple-select-required-label"
                        // id="demo-simple-select-required"
                        value={this.state.role}
                        onChange={this.handleChangeRole}
                        // className={classes.selectEmpty}
                    >
                        <MenuItem value={'Teacher'}>Teacher</MenuItem>
                        <MenuItem value={'Student'}>Student</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant='subtitle1' color='textPrimary'>Please fill in all fields to create an
                    account</Typography>
                <TextField type="firstName" style={textFieldStyles} label="First name" onChange={this.onChangeFirstName}
                           helperText={this.state.errorMessages["firstName"]}
                           error={this.state.errorMessages["firstName"] !== undefined}
                />
                <TextField type="lastName" label="Last name" style={textFieldStyles} onChange={this.onChangeLastName}
                           helperText={this.state.errorMessages["lastName"]}
                           error={this.state.errorMessages["lastName"] !== undefined}
                />
                <TextField type="email" label="Email" style={textFieldStyles} onChange={this.onChangeEmail}
                           helperText={this.state.errorMessages["email"]}
                           error={this.state.errorMessages["email"] !== undefined}
                />

                {data}
                <IconButton
                    color="primary"
                    component="label"
                >
                    {/*<AddAPhotoIcon/>*/}
                    <input type='file' multiple='true'
                           style={{display: "none"}}
                           onChange={this.handleClickAddImage}
                    />
                </IconButton>
                <FormControl>
                    <InputLabel htmlFor="Password">Password</InputLabel>
                    <Input id="Password" type="password"
                           placeholder="Password"
                           style={textFieldStyles}
                           onChange={this.onChangePassword}
                    />
                    {this.state.errorMessages["password"] !== undefined &&
                    <FormHelperText style={textFieldStyles}
                                    htmlFor="Password"
                                    error={true}>
                        {this.state.errorMessages["password"]}
                    </FormHelperText>}
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="Repeat Password">Repeat Password</InputLabel>
                    <Input type="password"
                           placeholder="Repeat Password"
                           id={"Repeat Password"}
                           style={textFieldStyles}
                           onChange={this.onChangeConfirmationPassword}
                           helperText={this.state.errorMessages["confirmationPassword"]}
                           error={this.state.errorMessages["confirmationPassword"] !== undefined}
                    />
                    {this.state.errorMessages["confirmationPassword"] !== undefined &&
                    <FormHelperText style={textFieldStyles}
                                    htmlFor="Repeat Password"
                                    error={true}>
                        {this.state.errorMessages["confirmationPassword"]}
                    </FormHelperText>}
                </FormControl>
                <Button style={buttomStyles} variant="contained" color="primary" onClick={this.putData}
                        size="large"
                        disabled={this.isNotValid()}>Sign
                    up </Button>
                <div>
                    <Typography variant='subtitle1'>Already have an account? <Link to={"/"}>Sign in</Link></Typography>
                </div>
            </Grid>
        );
    }
}
export default RegistrationForm;