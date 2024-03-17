import { Paper, TextField, IconButton, Box, CircularProgress } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import useTaskQueryHook from "../redux/hooks/useTaskQueryHook";

const AddNewTask = () => {
    const [taskTitle, setTaskTitle] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const { addTask, isAddingTask, isAddedTaskSuccess, addTaskAns, isAddingTaskError, addTaskError } = useTaskQueryHook();

    useEffect(() => {
        if (isAddedTaskSuccess) {
            enqueueSnackbar(`Added: ${addTaskAns.title}`, { variant: "success" });
            setTaskTitle("");
        } else if (isAddingTaskError) {
            enqueueSnackbar((addTaskError as { message: string }).message, { variant: "error" });
        }
    }, [isAddedTaskSuccess, isAddingTaskError, addTaskAns, addTaskError, enqueueSnackbar]);

    const addNewTask = async (e: FormEvent) => {
        e.preventDefault();
        addTask(taskTitle);
    };

    return (
        <Paper elevation={5}>
            <Box component="form" onSubmit={addNewTask} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                    id="newTask"
                    variant="outlined"
                    color="primary"
                    placeholder="Add new Task..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    sx={{ "& fieldset": { border: "none" } }}
                    margin="dense"
                    fullWidth
                    autoFocus
                />

                <IconButton type="submit" size="medium" sx={{ mr: 0.5 }}>
                    {isAddingTask ? <CircularProgress size={25} /> : <AddTask />}
                </IconButton>
            </Box>
        </Paper>
    );
};

export default AddNewTask;
