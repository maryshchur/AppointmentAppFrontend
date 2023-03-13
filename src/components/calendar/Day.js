import React, {Component} from "react";
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {Paper} from "@mui/material";

class Day extends Component{

    state={
        timeFrom : this.props.item.timeFrom,
        timeTo : this.props.item.timeTo,
        date : this.props.item.date
    };
    render() {
        return (
            <div>
                <Paper >
                    <Scheduler
                        data={{ startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' }}
                            //{ startDate: this.state.timeFrom, endDate: this.state.timeTo, title: 'Meeting' }}
                    >

                        <ViewState
                            currentDate='2018-11-01'
                                //{this.state.date}
                        />
                        <DayView
                            startDayHour={1}
                            endDayHour={23}
                        />
                        {/*<Appointments />*/}
                    </Scheduler>
                </Paper>
            </div>
        );
    }
}
export default Day;