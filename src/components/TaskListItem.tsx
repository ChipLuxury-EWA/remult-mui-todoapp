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
    const { deleteTask, isLoading, isDeletedSuccessfully, isErrorDeletingTask, deleteTaskError } = useTaskQueryHook();

    useEffect(() => {
        isDeletedSuccessfully && enqueueSnackbar(`Deleted ${task.title}`, { variant: "success" });
        isErrorDeletingTask && enqueueSnackbar((deleteTaskError as { message: string }).message, { variant: "error" });
    }, [isDeletedSuccessfully, isErrorDeletingTask, deleteTaskError, enqueueSnackbar, task]);

    // TODO tompo add loading state to setCompleted
    const setCompleted = async (completed: boolean) => await taskRepo.save({ ...task, completed });

    const saveTask = async () => {
        if (task.title === taskTitle) return;
        try {
            await taskRepo.save({ ...task, title: taskTitle });
        } catch (error) {
            enqueueSnackbar((error as { message: string }).message, { variant: "error" });
        }
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
