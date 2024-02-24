import { ListItem, ListItemButton, ListItemIcon, TextField, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { Task } from "../shared/entities/Task";
import { remult } from "remult";
import { useSnackbar } from "notistack";

const taskRepo = remult.repo(Task);

const TaskListItem = ({ task }: { task: Task }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isHover, setIsHover] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState(task.title);

    // TODO tompo add loading state to setCompleted
    const setCompleted = async (completed: boolean) => await taskRepo.save({ ...task, completed });

    const saveTask = async () => {
        if (task.title === taskTitle) return;
        try {
            await taskRepo.save({ ...task, title: taskTitle });
            enqueueSnackbar(`Change: ${task.title} to ${taskTitle}`, { variant: "success" });
        } catch (error) {
            enqueueSnackbar((error as { message: string }).message, { variant: "error" });
        }
    };

    const deleteTask = async () => {
        try {
            await taskRepo.delete(task);
            enqueueSnackbar(`Deleted ${task.title}`, { variant: "success" });
        } catch (error) {
            enqueueSnackbar((error as { message: string }).message, {
                variant: "error",
            });
        }
    };

    return (
        <ListItem
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={task.id}
            disablePadding
            secondaryAction={
                isHover && (
                    <>
                        {taskRepo.metadata.apiDeleteAllowed() && (
                            <IconButton edge="end" onClick={deleteTask}>
                                <Delete />
                            </IconButton>
                        )}
                    </>
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
