import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (WrappedComponent) => {
    const HOC = (props) => (
        <WrappedComponent isLoggedIn={props.isAuthUser} {...props} />
    )
    return connect(mapStateToProps)(HOC)
}

const mapStateToProps = (state) => {
    return {
        isAuthUser: state.authReducer.isAuthUser
    }
}
