import React, {Component} from "react";
import UserCard from "./UserCard";
import CustomPagination from "../utils/CustomPagination";
import {Grid} from "@mui/material";

const paginationStyle = {
    padding: 20
};

class AllTeachers extends Component {
    render() {
        return (
            <Grid container
                  justify="center">
                <div style={{
                   flexBasis: '75%'
                }}>
                    {/*margin: '1%',*/}
                    {this.props.teachers.map((item) =>
                        (<UserCard key={item.id}
                                   item={item}
                                   allSubscription = {this.props.allSubscription}
                                   getAllSubscriptionTeachers = { this.props.getAllSubscriptionTeachers}
                                   getAllTeachers={this.props.getAllTeachers}
                                   isNotUserPage={this.props.isNotUserPage}/>)
                    )}
                </div>
                <Grid container
                      style={paginationStyle}
                      justify="center">
                    <CustomPagination
                        activepage={this.props.activePage}
                        totalPages={this.props.totalPages}
                        itemsCountPerPage={this.props.itemsCountPerPage}
                        totalItemsCount={this.props.totalItemsCount}
                        onChange={this.props.handlePageChange}
                    />
                </Grid>
            </Grid>
        )
    };
}

export default AllTeachers;