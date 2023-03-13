import React, {Component} from 'react';
import {makeStyles} from "@mui/styles";
import {Avatar, Button, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));
class AllAvailableLessons extends Component{
render() {
    return (
        <div>
            <Card style={{  width: 800,height: 200}} >
                <div  style={{ display: 'flex',flexDirection: 'column'}}>
                    {/*<CardMedia>*/}
                        <Avatar  style={{  width: 200,height: 150}} variant="square" src="https://appointmentappavatars.s3.eu-central-1.amazonaws.com/IMG_20190913_150116-02.jpeg"/>
                    {/*</CardMedia>*/}

                        {/*image="https://appointmentappavatars.s3.eu-central-1.amazonaws.com/IMG_20190913_150116-02.jpeg"/>*/}



                    {/*<CardContent style={{content: {*/}
                    {/*        flex: '1 0 auto',*/}
                    {/*    }}} >*/}
                        {/*<Avatar  variant="square" src="https://appointmentappavatars.s3.eu-central-1.amazonaws.com/IMG_20190913_150116-02.jpeg"/>*/}

                        <Typography variant="h6">
                         <Link>   Mariia Shchur</Link>
                        </Typography>
                        <Typography variant="h5" color={'primary'} >
                            English lessons
                        </Typography>
                        <Typography  variant="caption" display="block" >
                            Certified Teacher with over 1 year in class experience and 2 years online experience. Hi there, my name is Andre and I am here to help you achieve your language goals in English. I have over 3 years of teaching experience working with both adults and children age 4-18. I've spent over a year teaching young learners in Suzhou, China and I am currently working as an Online English teacher.
                        </Typography>
                        <Button variant="contained" color="primary"
                                size="large">Book Lesson</Button>
                        <div>
                            <Button
                                size="small"
                                style={{
                                    marginLeft: "10px"
                                }}
                                // startIcon=
                                //     <FavoriteIcon/>
                            />
                        </div>
                    {/*</CardContent>*/}
                </div>
            </Card>
        </div>
    )
}
}
export default AllAvailableLessons;