import React from "react";
import {makeStyles} from "@mui/styles";
import {AppBar, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import {isUserLoggedIn} from "../../service/LocalStorageService";
import {Link} from "react-router-dom";


const Header = (props) => {

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight:2,
        },
        title: {
            justifyContent: "space-between",
        },
        link: {
            flexGrow: 1,
        },
    }));

    const linkStyle = {
        textDecoration: 'none'
    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutUser = () => {
        sessionStorage.removeItem('authorization');
       // sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userrole');
        window.location.href = "/";
    };

    const userLoggedIn = (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                // anchorEl={}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                // transformOrigin={{anchorEl
                //     vertical: 'top',
                //     horizontal: 'right',
                // }}
                open={open}
                onClose={handleClose}
            >
                {/*<Hidden mdUp={sessionStorage.getItem('userrole') === "ROLE_GUEST"}>*/}
                    <MenuItem><Link to="/profile" style={linkStyle}>My Profile</Link></MenuItem>
               {/*// </Hidden>*/}
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
        </div>
    );

    const userNotLoggedIn = (
        <div>
            <Link to="/"><Button style={{ color: '#FFF' }}>Sign In</Button></Link>
            <Link to="/registration"><Button style={{ color: '#FFF' }}>Sign Up</Button></Link>
        </div>
    );

    const adminLinks = (
        <Link to="/admin-panel"><Button style={{ color: '#FFF' }}>Admin Panel</Button></Link>
    );

    const managerLinks = (
        <div>
            <Link to="/home-page"><Button style={{ color: '#FFF' }}></Button></Link>
        </div>
    );

    let headerLinks;
    if (sessionStorage.getItem('Authorization') !== null) {
        headerLinks = userLoggedIn;
    }
    else {
        headerLinks = userNotLoggedIn;
    }

    let userRoleLinks;
    if(isUserLoggedIn()){
        userRoleLinks = (<div></div>);
    }else if (sessionStorage.getItem('userrole') === "ROLE_ADMIN") {
        userRoleLinks = adminLinks;
    } else if (sessionStorage.getItem('userrole') === "ROLE_TEACHER") {
        userRoleLinks = managerLinks;
    } else if (sessionStorage.getItem('userrole') === "ROLE_STUDENT") {
    userRoleLinks = managerLinks;
    }

    return (
        <div
            className={classes.root}
        >
            <AppBar position="static" style={{ background: '#64b5f6' }}>
                <Toolbar
                    className={classes.title}
                >
                    {userRoleLinks}
                    {headerLinks}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;