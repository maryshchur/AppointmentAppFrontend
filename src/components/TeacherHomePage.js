import React, {Component} from "react";
import axios from "../utils/axios";
import AvailableTimeRangeForm from "./calendar/AvailableTimeRangeForm";
import AllAvailableLessons from "./allTeachers/AllAvailableLessons";
import IconButton from "@mui/material/IconButton";
import {CssBaseline, Divider, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";

let data;

class TeacherHomePage extends Component {
    state = {
        isOpen: true,
        availableTime: [],
        value: 0,
        errorMessage:undefined,
        rightVar: [],
        numbers :['Upcoming lessons', 'Booking request', 'All activity(history)', 'Available time']
    };
    handleDrawerToggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    };
    handleOpenLessonsHistory;
    handleOpenFutureLessons;

    handleOpenAvailableTime = () => {
        this.setState({errorMessage:[]});
        this.setState({rightVar:[]});
        axios.get("/teacher/free-hours").then(response => {
            this.setState({availableTime: response.data}, () =>
                this.setState({rightVar: ( <AvailableTimeRangeForm availableTime={this.state.availableTime}/>)})
            );
        }, error => {
            this.setState({errorMessage: error.response.data.message});
        });

    };
    handleOpenUpcomingRequest=()=>{
        this.setState({rightVar:[]});
        this.setState({errorMessage:[]});
        axios.get("/teacher/upcoming-lessons").then(response => {
            this.setState({availableTime: []});
            this.setState({availableTime: response.data}, () =>
                this.setState({rightVar: ( <AvailableTimeRangeForm availableTime={this.state.availableTime}/>)})
            );
        }, error => {
            this.setState({errorMessage: error.response.data.message});
        });
    };

    handleOpenBookingRequest=()=>{
        this.setState({errorMessage:[]});
        this.setState({rightVar:[]});
        axios.get("/teacher/booking-request").then(response => {
            this.setState({availableTime: []});
            this.setState({availableTime: response.data}, () =>
                this.setState({rightVar: ( <AvailableTimeRangeForm availableTime={this.state.availableTime}/>)})
            );
        }, error => {
            this.setState({errorMessage: error.response.data.message});
        });
    };
    render() {
        const numbers = ['Upcoming lessons', 'Booking request', 'All activity(history)', 'Available time'];
        return (
            <Grid container spacing={3}>
                {/*<Grid item  xs={12}>*/}
                <Grid item xs={12} sm={3}>
                    <Divider/>
                    {/*<List>*/}
                        <ul>
                          {numbers.map((text,index) =>(
                            <ListItem button key={index}>
                                <ListItemIcon>{index === 2 ?
                                    <IconButton
                                        color="primary"
                                        onClick={this.handleOpenLessonsHistory}
                                    >
                                        {/*<ArchiveIcon/> */}
                                    </IconButton> :
                                    index === 0 ? <IconButton
                                            color="primary"
                                            onClick={this.handleOpenUpcomingRequest}
                                        >
                                            {/*<AssignmentIcon/> */}
                                    </IconButton> :
                                        index === 3 ? <IconButton
                                            color="primary"
                                            onClick={this.handleOpenAvailableTime}
                                        >
                                            {/*<EventAvailableIcon/>*/}
                                        </IconButton> : <IconButton
                                            color="primary"
                                            onClick={this.handleOpenBookingRequest}
                                        >
                                            {/*<EventIcon/>*/}
                                        </IconButton>}</ListItemIcon>
                                {/*// <ListItemIcon>{if(index  === 3)   <ArchiveIcon/> : <EventIcon/> </ListItemIcon>*/}
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                        </ul>
                    {/*</List>*/}

                </Grid>

                <Grid item xs={12} sm={9}  style={{marginTop:6}}>
                    <Divider/>
                    <CssBaseline/>

                    <main
                        // className={classes.content}
                    >
                        {/*<Toolbar/>*/}
                        {this.state.rightVar}
                       <h2>{this.state.errorMessage}</h2>
                        {/*<AvailableTimeRangeForm/>*/}
                    </main>
                </Grid>
                {/*</Grid>*/}
            </Grid>

        )
    }
}

export default TeacherHomePage;
