import {Component} from "react";
import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useTheme} from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import axios from "../../utils/axios";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LocalStorageService from "../../service/LocalStorageService";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {Avatar, Fab} from "@mui/material";
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
const localStorageService = LocalStorageService.getService();

class UserCard extends Component {
    state = {
        oneTeacherAvailability: undefined,
        activePage: 1,
        totalItemsCount: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        subscribed: false
    };
    subscribe = () => {
        console.log("subscribe");
        axios.put(`/profile/subscribe/${this.props.item.id}`).then(
            response => {
                console.log("RESPONSE");
                this.props.getAllSubscriptionTeachers();
            }).catch(error => {
        });
    };

    getTeacherAvailability = (pageNumber) => {
        axios.get(`/student/${this.props.item.id}/free-time`).then(
            response => {
                console.log(response.data);
                this.setState({
                    oneTeacherAvailability: response.data
                })
            }
        )
    };

    componentDidMount() {
        console.log(this.props.allSubscription);
        if (this.props.allSubscription !== undefined)
            this.props.allSubscription.forEach(oneRecord => {
                if (oneRecord.id === this.props.item.id) {
                    console.log("True");
                    this.setState({subscribed: true});
                }
            });
    };

    bookLesson = () => {
        axios.post("/student/book-lesson", this.state).then(response => {
            this.props.getAllSubscriptionTeachers();
        }, error => {
            let errors = {};
            // error.response.data.forEach(err => {
            //     errors[[err.name]] = err.message;
            // });
            // this.setState({errorMessages: errors}, () => console.log(this.state));
        });
    };

    //   const theme = useTheme();
    render() {
        let icon;
        let text;
        if (this.state.subscribed) {
            icon = <BookmarkIcon sx={{mr: 1}}/>;
            text = <span>Unsubscribe</span>;
        } else {
            icon = <BookmarkBorderIcon color="disabled" sx={{mr: 1}}/>;
            text = <span>Subscribe</span>;
        }
        // color="disabled"
        return (
            <Card style={{display: 'flex', marginTop: '2%', maxHeight: '15em', padding: '2%',fontFamily: 'Aeonik-Regular !important'}}>
                <CardMedia style={{flexBasis: '20%', alignSelf: 'flex-start'}}
                >
                    {/*<div style={{justifyContent:"center"}}>*/}
                    <Avatar alt="Alias" src={this.props.item.image} style={{
                        // width: '100%',
                        // height: '100%',
                        width: '5.5em',
                        height: '5.5em'
                        // margin: '5%'
                    }}/>
                    {/*</div>*/}
                </CardMedia>
                <Box sx={{display: 'flex', flexDirection: 'column', flexBasis: '65%'}}>
                    <CardContent style={{textAlign: 'justify'}}>
                        {/*sx={{flex: '1 0 auto'}}*/}
                        <Typography component="div" variant="h5">
                            {this.props.item.firstName} {this.props.item.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {/*{this.props.item.yearsOfExperiences} {this.props.item.minimalLessonDuration}*/}
                            {/*{this.props.item.currentWorkPlace} {this.props.item.education}*/}
                            {this.props.item.description}
                            {/*{this.props.item.email}*/}
                            {/*{this.props.item.prize.prize} {this.props.item.prize.amountOfTime}*/}
                        </Typography>
                    </CardContent>
                </Box>
                <div style={{flexBasis: '15%', display: 'flex', flexFlow: 'column-reverse'}}>
                    {/*<Box sx={{display: 'grid', alignItems: 'center', pl: 1, pb: 1, flexBasis: '25%'}}>*/}
                    {/*{this.state.subscribed===false && Unsubscribe }*/}
                    {/*<IconButton aria-label="previous">*/}
                    {/*    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}*/}
                    {/*</IconButton>*/}
                    {/*<div style={{}}*/}
                    <Fab variant="extended" onClick={this.subscribe} size="medium" style={{marginBottom: '5%',backgroundColor:'#b0c9d1'}}>

                        {icon}
                        {text}
                    </Fab>
                    <Fab variant="extended"  size="medium" style={{marginBottom: '5%',backgroundColor:'#b0c9d1'}}
                    >
                        See schedule
                    </Fab>
                </div>
                {/*</Box>*/}
                {/*</Box>*/}
            </Card>
        /*</Card>*/

    )
    }
}

export default UserCard;

