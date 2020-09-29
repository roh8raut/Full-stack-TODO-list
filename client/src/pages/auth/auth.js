import React, { Component } from 'react'
import { compose } from 'redux'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Login from '../../components/login/login';
import Signup from '../../components/signup/signup';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { changeTab, doLogin } from '../../actions/loginactions';
import { Redirect } from 'react-router'


const styles = {
    fixedWidth: {
        width: "80%",
        margin: "5% 10%"
    }
}


class Auth extends Component {

    constructor(props) {
        super(props)
    }

    handleChange = (e) => {
        // e.persist();
        const value = (this.props.tabValue === "/") ? "/login" : "/";
        this.props.handleTabChange(value);
    }

    handleLoginSubmit = (values) => {
        // e.preventDefault()
        console.log("login clicked", values);
        this.props.handleLoginSubmit(values);
    }

    render() {
        if (this.props.isAuthUser) {
            console.log("authenticated user");
            return <Redirect to="/tasks" />
        }
        return (
            <>
                <AppBar position="static" color="default" style={{ width: "50%", marginLeft: "25%", marginTop: "3%" }}>
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
                    {this.props.tabValue === "/" && <Signup fixedWidth={this.props.classes.fixedWidth} isEmpty={this.isEmpty} />}
                    {this.props.tabValue === "/login" && <Login fixedWidth={this.props.classes.fixedWidth} onSubmit={this.handleLoginSubmit} isLoading={this.props.isLoading} errorMsg={this.props.error} />}
                </AppBar>
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.authReducer)
    return {
        tabValue: state.tabsReducer.tabValue,
        isLoading: state.authReducer.isLoading,
        isAuthUser: state.authReducer.isAuthUser,
        error: state.authReducer.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleTabChange: (data) => dispatch(changeTab(data)),
        handleLoginSubmit: (values) => dispatch(doLogin(values))
    }
}


export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Auth)
