import React, { Component } from 'react'
import { connect } from "react-redux";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

export class Tasks extends Component {
    render() {
        return (
            <div>
                {this.props.tasks && this.props.tasks.map((task, i) => (
                    <ListItem button key={i}>
                        <ListItemText primary={task.description} />
                        <Button variant="contained" color="primary">Delete</Button>
                    </ListItem>)
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.authReducer.tasks);
    return {
        isLoading: state.authReducer.isLoading,
        isAuthUser: state.authReducer.isAuthUser,
        tasks: state.authReducer.tasks
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)