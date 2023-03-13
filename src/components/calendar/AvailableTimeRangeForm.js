import React, {Component} from "react";

import {WeekView} from '@devexpress/dx-react-scheduler-material-ui';
import {
    Scheduler,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AppointmentTooltip,
    AppointmentForm,
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import { EditingState, IntegratedEditing, ViewState} from '@devexpress/dx-react-scheduler';
import axios from "../../utils/axios";
import {Button, Grid, Paper, Toolbar} from "@mui/material";
// import {
//     AppointmentForm,
//     Appointments, AppointmentTooltip,
//     ConfirmationDialog, DateNavigator,
//     EditingState,
//     IntegratedEditing,
//     Scheduler,
//     ViewState,
//     WeekView
// } from "@devexpress/dx-react-scheduler";

const Appointment = ({
                         children, style, ...restProps
                     }) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: '#FFC107',
            borderRadius: '8px',
        }}
    >
        {children}
    </Appointments.Appointment>
);

function approveBooking(data) {
    console.log(data);
    axios.get(`/approve-booking/${data}`).then(response => {
            //TODO update page with new values
        }
        , error => {
            this.setState({errorMessage: error.response.data.message});
        });
}

function declineBooking(data) {
    axios.get(`/decline-booking/${data}`).then(response => {
            //TODO update page with new values
        }
        , error => {
            this.setState({errorMessage: error.response.data.message});
        });
}

const Content = (({children, appointmentData, classes, ...restProps}) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
        <Grid container alignItems="center">
            <Grid item xs={3}/>
            <Grid item xs={3}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => declineBooking(appointmentData.id)}
                >Decline
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => approveBooking(appointmentData.id)}
                >Approve
                </Button>
            </Grid>
            <Grid item xs={3}/>
        </Grid>
    </AppointmentTooltip.Content>
));

const today1 = new Date();
const currentDate = today1.getFullYear() + '-' + (today1.getMonth() + 1) + '-' + today1.getDate();

class AvailableTimeRangeForm extends Component {
    state = {
        addedAppointment: {}
    };
    constructor(props) {
        super(props);
        this.state = {
            data: undefined,

            //currentDate: '2018-06-27',
        };

        this.commitChanges = this.commitChanges.bind(this);
    }
    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
    }


    render() {
        const { currentDate, data } = this.state;
        return (

            <Paper
                style={{width: 1000}}
            >
                <Scheduler
                    // height={800}
                    data={this.props.availableTime}

                >
                    <ViewState
                        defaultCurrentDate={"2020-12-13"}
                    />
                    <EditingState
                        onCommitChanges={this.commitChanges}

                    />
                    <IntegratedEditing />
                    <WeekView
                        startDayHour={9}
                        endDayHour={19}
                    />
                    <ConfirmationDialog  />
                    <Toolbar/>
                    <DateNavigator/>

                    <Appointments/>
                    {/*{this.props.isNonApproved && appointmentComponent={Appointment}}*/}

                    <AppointmentTooltip
                        showCloseButton
                        contentComponent={Content}
                        // showOpenButton
                    />
                    <AppointmentForm
                        readOnly
                    />

                </Scheduler>
            </Paper>
        )
    }
}

export default AvailableTimeRangeForm;