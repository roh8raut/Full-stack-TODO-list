import React, { Component } from 'react'
import { compose } from 'redux'
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Login from '../../components/login/login';
import Signup from '../../components/signup/signup';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { changeTab, doLogin, doSignUp } from '../../actions/loginactions';
import { Redirect } from 'react-router'
import { authMessageSelector } from '../../reducers/authreducer';



const styles = (theme) => {
    return {
        fixedWidth: {
            width: "80%",
            margin: "5% 10%",
            '& label.Mui-focused': {
                color: '#5e2222',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#5e2222',
                },
                '&:hover fieldset': {
                    borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#5e2222',
                },
            },
        },
        container: {
            justifyContent: "center",
            width: "80%",
            [theme.breakpoints.up('sm')]: {
                width: "40%"
            },
            backgroundColor: "#decdc3",
            '& span.MuiTab-wrapper': {
                color: "#2d4059"
            }
        }
    }
}


class Auth extends Component {

    handleChange = (e) => {
        // e.persist();
        const value = (this.props.tabValue === "/") ? "/login" : "/";
        this.props.handleTabChange(value);
    }

    handleLoginSubmit = (values) => {
        // e.preventDefault()
        this.props.handleLoginSubmit(values);
    }

    handleSignUp = (values) => {
        this.props.handleSignUp(values);
    }

    render() {
        if (this.props.isAuthUser) {
            return <Redirect to="/tasks" />
        }
        return (
            <Grid container style={{ justifyContent: "center" }}>
                <AppBar position="static" color="default" className={this.props.classes.container}>
                    <Tabs
                        value={this.props.tabValue}
                        variant="fullWidth"
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={this.handleChange}
                    >
                        <Tab label="SIGN UP" value="/" />
                        <Tab label="LOGIN" value="/login" />
                    </Tabs>
                    {this.props.tabValue === "/" && <Signup fixedWidth={this.props.classes.fixedWidth} onSubmit={this.handleSignUp} isLoading={this.props.isLoading} msg={this.props.msg} />}
                    {this.props.tabValue === "/login" && <Login fixedWidth={this.props.classes.fixedWidth} onSubmit={this.handleLoginSubmit} isLoading={this.props.isLoading} msg={this.props.msg} />}
                </AppBar>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        tabValue: state.tabsReducer.tabValue,
        isLoading: state.authReducer.isLoading,
        isAuthUser: state.authReducer.isAuthUser,
        msg: authMessageSelector(state)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleTabChange: (data) => dispatch(changeTab(data)),
        handleLoginSubmit: (values) => dispatch(doLogin(values)),
        handleSignUp: (values) => dispatch(doSignUp(values)),
    }
}


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Auth)
