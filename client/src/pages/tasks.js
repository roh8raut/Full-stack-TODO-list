import React, { Component } from 'react'
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { removeUserTask, addUserTask, loadTasksFromStorage, logOutUser } from '../actions/taskaction';
import List from '../components/listwithbutton/list'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router'
import { Field, reduxForm, reset } from 'redux-form';
import { compose } from 'redux'
import validate from '../helpers/validate';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';


// import { tasksReducer } from '../reducers/tasksreducer';

const styles = (theme) => {
    return {
        list: {
            marginTop: "1rem",
            color: "#e5e5e5",
            [theme.breakpoints.up('sm')]: {
                margin: ".5rem 20rem",
                borderRadius: "30px",
                maxWidth: "50%"
            },
            backgroundColor: "#ea5455",
            '& div': {
                width: "80%",
                '& h5': {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            }
        },
        inputField: {
            '& input': {
                color: "#fbdddd"
            },
            '& label, label.Mui-focused': {
                color: '#e5e5e5',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#fbdddd',
            },
        }
    }
}

export class Tasks extends Component {


    renderAddField = ({ label, input, meta, ...custom }) => {
        return <TextField
            label={label}
            type="text"
            className={custom.className}
            autoComplete='off'
            error={meta.touched && !meta.valid}
            helperText={meta.touched && meta.error}
            {...input}
        />
    }

    componentDidMount() {
        this.props.loadTasks();
    }

    handleDeleteClick = (e, data) => {
        const targetEleId = data;
        this.props.handleDelete(targetEleId);
        e.target.innerHTML = <CircularProgress size={25} color="secondary" />
    }

    handleSubmit = ({ task }, e) => {
        this.props.handleAdd({ isCompleted: false, description: task });
    }

    handleLogout = () => {
        this.props.handleLogout()
    }


    render() {
        const tasks = this.props.tasks;
        if (!this.props.isAuthUser) {
            return <Redirect to="/" />
        }
        return (
            <Grid container justify="center" alignItems="center">
                <Grid item style={{ marginBottom: "20px" }}>
                    <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field
                            name="task"
                            label="Add Task"
                            type="text"
                            className={this.props.classes.inputField}
                            component={this.renderAddField}
                        />
                        <Fab type="submit" size="small" color="secondary" aria-label="add">
                            {this.props.isLoading ? <CircularProgress size={25} /> : <AddIcon />}
                        </Fab>
                    </form>
                </Grid>
                {tasks && tasks.map((task, i) => (
                    <List task={task} key={task._id} list={this.props.classes.list} handleClick={this.handleDeleteClick} />
                ))}
            </Grid >

        )
    }
}

const resetFormOnSuccess = (res, dispatch) => {
    dispatch(reset('Add Task'));
}

const mapStateToProps = state => {
    return {
        isLoading: state.tasksReducer.isLoading,
        isAuthUser: state.authReducer.isAuthUser,
        tasks: state.tasksReducer.tasks
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadTasks: () => dispatch(loadTasksFromStorage()),
        handleDelete: (id) => dispatch(removeUserTask(id)),
        handleAdd: (task) => dispatch(addUserTask(task)),
        handleLogout: () => dispatch(logOutUser())
    }
}

export default compose(
    reduxForm({
        form: 'Add Task',
        validate,
        onSubmitSuccess: resetFormOnSuccess
    }),
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Tasks)