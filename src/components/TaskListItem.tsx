import { ListItem, ListItemButton, ListItemIcon, TextField, Checkbox, IconButton, CircularProgress } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Task } from "../shared/entities/Task";
import { remult } from "remult";
import { useSnackbar } from "notistack";
import useTaskQueryHook from "../redux/hooks/useTaskQueryHook";

const taskRepo = remult.repo(Task);

const TaskListItem = ({ task }: { task: Task }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState(task.title);

    useEffect(() => {
        //update task with remult live query
        setTaskTitle(task.title);
    }, [task]);

    const {
        deleteTask,
        isLoading,
        isDeletedSuccessfully,
        isErrorDeletingTask,
        deleteTaskError,
        updateTask,
        updateTaskAns,
        updateTaskError,
        isErrorUpdatingTask,
        isUpdatedTaskSuccessfully,
    } = useTaskQueryHook();

    useEffect(() => {
        isDeletedSuccessfully && enqueueSnackbar(`Deleted ${task.title}`, { variant: "success" });
        isErrorDeletingTask && enqueueSnackbar((deleteTaskError as { message: string }).message, { variant: "error" });
    }, [isDeletedSuccessfully, isErrorDeletingTask, deleteTaskError, enqueueSnackbar, task]);

    useEffect(() => {
        isUpdatedTaskSuccessfully && enqueueSnackbar(`Saved ${updateTaskAns?.title}`, { variant: "success" });
        isErrorUpdatingTask && enqueueSnackbar((updateTaskError as { message: string }).message, { variant: "error" });
    }, [isUpdatedTaskSuccessfully, isErrorUpdatingTask, updateTaskError, updateTaskAns, enqueueSnackbar]);

    const setCompleted = (completed: boolean) => updateTask({ ...task, completed });

    const saveTask = () => {
        if (task.title === taskTitle) return;
        updateTask({ ...task, title: taskTitle });
    };

    return (
        <ListItem
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={task.id}
            disablePadding
            secondaryAction={
                isLoading ? (
                    <CircularProgress />
                ) : (
                    isHover && (
                        <>
                            {taskRepo.metadata.apiDeleteAllowed() && (
                                <IconButton edge="end" onClick={() => deleteTask(task)}>
                                    <Delete />
                                </IconButton>
                            )}
                        </>
                    )
                )
            }
        >
            <ListItemButton role={undefined} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={task.completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <TextField
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    onBlur={() => saveTask()}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            saveTask();
                        }
                    }}
                    InputProps={{ style: { fontSize: 22 } }}
                    sx={{ "& fieldset": { border: "none" } }}
                    margin="none"
                    fullWidth
                    size="small"
                    variant="outlined"
                />
            </ListItemButton>
        </ListItem>
    );
};

export default TaskListItem;
