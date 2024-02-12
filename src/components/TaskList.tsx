import { useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "../shared/Task";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const taskRepo = remult.repo(Task);

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskRepo.find().then(setTasks);
  }, []);

  const tasksListItems = tasks.map((task) => {
    return (
      <ListItem
        key={task.id}
        disablePadding
        secondaryAction={
          <IconButton edge="end">
            <Delete />
          </IconButton>
        }
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Checkbox edge="start" checked={task.completed} tabIndex={-1} disableRipple/>
          </ListItemIcon>
          <ListItemText id={task.title} primary={task.title} primaryTypographyProps={{fontSize: '18px'}}/>
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      <Paper>{tasksListItems}</Paper>
    </List>
  );
};

export default TaskList;
