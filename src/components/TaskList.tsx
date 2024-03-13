import { Task } from "../shared/entities/Task";
import { List, Paper, IconButton, ListItemButton, LinearProgress } from "@mui/material";
import { FactCheck, PlaylistRemove, Logout } from "@mui/icons-material";

import TaskListItem from "./TaskListItem";
import { TaskController } from "../shared/controllers/Tasks.controller";
import useTaskQueryHook from "../redux/hooks/useTaskQueryHook";

const TaskList = ({ signOut }: { signOut: () => void }) => {
    const { tasks, isLoading } = useTaskQueryHook();

    const tasksListItems = tasks.map((task: Task) => {
        return <TaskListItem key={task.id} task={task} />;
    });

    const setAllCompleted = async (completed: boolean) => {
        await TaskController.setAllTasksCompleted(completed);
    };

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
            </ListItemButton>
        </List>
    );
};

export default TaskList;
