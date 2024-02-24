import { useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "../shared/entities/Task";
import { List, Paper, IconButton, ListItemButton } from "@mui/material";
import { FactCheck, PlaylistRemove, Logout } from "@mui/icons-material";

import TaskListItem from "./TaskListItem";
import { TaskController } from "../shared/controllers/Tasks.controller";

const taskRepo = remult.repo(Task);

const TaskList = ({ signOut }: { signOut: () => void }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        return taskRepo
            .liveQuery({
                limit: 20,
                orderBy: { createdAt: "asc" },
                // where: { completed: true },
            })
            .subscribe((info) => setTasks(info.applyChanges));
    }, []);

    const tasksListItems = tasks.map((task: Task) => {
        return <TaskListItem key={task.id} task={task} />;
    });

    const setAllCompleted = async (completed: boolean) => {
        await TaskController.setAllTasksCompleted(completed);
    };

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
