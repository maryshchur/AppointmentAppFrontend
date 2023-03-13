import React, {Component} from "react";
import axios from "../utils/axios";
import {CssBaseline, Grid, Input} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Alert} from "@mui/lab";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

class ProfileForm extends Component{
    state={
        userData : [],
        image: undefined,
        err: undefined
    };
    getData = () => {
        axios.get(`/profile`).then(
            response => {
                console.log(response.data);
                this.setState({
                    userData: response.data
                })
            }).catch(error => {
            console.dir(error.response.data);

        })
    };
    uploadImage = () => {
        const formData = new FormData();
        formData.append('file', this.state.image);
        axios.put(`/profile/updatePhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // this.props.handleClose();
        })
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
            }, () => this.uploadImage());
        }
    };

render() {
    return(
        <Grid container>
            <Grid item xs={1}/>
            <Grid xs={12} sm={10}>
                <Card
                    // style={style}
                >
                    <CardContent>
                        <CssBaseline/>
                        {this.state.err ? <Alert severity="error">{this.state.err}</Alert> : null}
                        <Grid container={"true"} justify={"space-evenly"}>
                            <Grid item xs={12} sm={8} style={{position: "relative"}}>
                                {/*<Avatar src={this.state.photo}*/}
                                {/*        style={photoLarge}*/}
                                {/*/>*/}
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0
                                }}>
                                    {/*<AddAPhotoIcon/>*/}
                                    <IconButton
                                        // color="primary"
                                        component="label"
                                    >

                                        <Input type='file' disableUnderline='true' fullWidth='true'
                                               style={{display: "none"}}
                                               onChange={this.handleClickAddImage}
                                               placeholder='Change profile picture'/>
                                    </IconButton>
                                </div>
                            </Grid>
                            <Grid container justify={"space-evenly"}>
                                <Grid xl={12} xs={12}>
                                    <Typography variant="h3" component="h3" style={{marginTop: 10}}
                                                align={"center"} color="textPrimary">
                                        {this.state.firstName} {this.state.lastName}
                                    </Typography>
                                </Grid>
                                {/*<Grid direction={"column"}>*/}
                                <Grid xs={12} sm={12}
                                >
                                    <Typography variant="h5"
                                                color="textSecondary" component="p">
                                        {this.state.phone}
                                    </Typography>
                                </Grid>
                                <Grid xs={12} sm={12}
                                >

                                    <Typography variant="h5" color="textSecondary" component="p"
                                                style={{
                                                    position: "relative",
                                                    left: "25px"
                                                }}
                                    >
                                        {this.state.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

                                        )
}
}
export default ProfileForm;