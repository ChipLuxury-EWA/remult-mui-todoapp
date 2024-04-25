import { useEffect, useState } from "react";
import { Task } from "../shared/entities/Task";
import { List, Paper, IconButton, ListItemButton, LinearProgress, CircularProgress } from "@mui/material";
import { FactCheck, PlaylistRemove, Logout } from "@mui/icons-material";

import TaskListItem from "./TaskListItem";
import useTaskQueryHook from "../redux/hooks/useTaskQueryHook";

const TaskList = ({ signOut }: { signOut: () => void }) => {
    const { tasks, isLoading, setAllCompleted, isSettingAllTask } = useTaskQueryHook();
    const [tasksList, setTasksList] = useState(tasks); // re render the comp when tasks is

    useEffect(() => {
        setTasksList(tasks);
    }, [tasks, isLoading]);

    const tasksListItems = tasksList.map((task: Task) => {
        return <TaskListItem key={task.id + task.title} task={task} />;
    });

    if (isLoading) return <LinearProgress />;

    return (
        <List>
            <Paper>{tasksListItems}</Paper>
            <ListItemButton>
                <IconButton onClick={() => setAllCompleted(true)} edge="start">
                    <FactCheck />
                </IconButton>
                <IconButton onClick={() => setAllCompleted(false)}>
                    <PlaylistRemove />
                </IconButton>
                <IconButton onClick={() => signOut()}>
                    <Logout />
                </IconButton>
                {isSettingAllTask && <CircularProgress />}
            </ListItemButton>
        </List>
    );
};

export default TaskList;
