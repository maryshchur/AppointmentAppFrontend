import React, {Component} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import UserCard from "./UserCard";
import AllTeachers from "./AllTeachers";
import axios from "../../utils/axios";

const itemsNumber = 10;

class MainStudentsPage extends Component {
    state = {
        teachers: [],
        subscriptionsTeacher : [],
        activePage: 1,
        totalItemsCount: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
    };
    componentDidMount() {
        this.getAllSubscriptionTeachers();
        this.getAllTeachers(this.state.activePage);

    };
    handlePageChange = (event, pageNumber) => {
        this.getAllSubscriptionTeachers();
        this.setState({activePage: pageNumber});
        this.getAllTeachers(pageNumber)
    };
    getAllTeachers = (pageNumber) => {
        axios.get(`/student/all-teachers?page=${pageNumber}&pageSize=${itemsNumber}`).then(
            response => {
                let totalPages = response.data.totalPages;
                let itemsCountPerPage = response.data.numberOfElements;
                let totalItemsCount = response.data.totalElements;
                let data = response.data.content;
                console.log(data);
                this.setState({
                    teachers: data,
                    totalPages: totalPages,
                    itemsCountPerPage: itemsCountPerPage,
                    totalItemsCount: totalItemsCount
                })
            }
        )
    };
    getAllSubscriptionTeachers = () => {
        axios.get('/student/subscription').then(
            response => {
                let data = response.data;
                console.log("subc");
                console.log(data);
                this.setState({
                    subscriptionsTeacher: data
                })
            }
        )
    };
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', background: '#f2f7ff'}}>
                <div style={{flexBasis: '30%', margin: '2%'}}>
                    <Card sx={{display: 'flex'}}>
                        <CardContent
                            // sx={{flex: '1 0 auto'}}
                        >
                            <Typography component="div" variant="h5">
                               test
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                               tst
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <AllTeachers teachers={this.state.teachers}
                             // isNotUserPage={true}
                             allSubscription = {this.state.subscriptionsTeacher}
                             getAllTeachers={() => this.getAllTeachers(this.state.activePage)}
                             getAllSubscriptionTeachers = {() => this.getAllSubscriptionTeachers()}
                             activepage={this.state.activePage}
                             totalPages={this.state.totalPages}
                             itemsCountPerPage={this.state.itemsCountPerPage}
                             totalItemsCount={this.state.totalItemsCount}
                             handlePageChange={this.handlePageChange}
                />

                />
            </div>
        )
    };
}

export default MainStudentsPage;