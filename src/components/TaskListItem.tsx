import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Delete, Save } from "@mui/icons-material";
import React, { useState } from "react";
import { Task } from "../shared/Task";
import { remult } from "remult";

const taskRepo = remult.repo(Task);

const TaskListItem = ({
  task,
  tasks,
  setTasks,
}: {
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const setTask = (value: Task) =>
    setTasks((tasks: Task[]) => tasks.map((t) => (t === task ? value : t)));

  const setCompleted = async (completed: boolean) =>
    setTask(await taskRepo.save({ ...task, completed }));

  const setTitle = (title: string) => setTask({ ...task, title });

  const saveTask = async () => {
    try {
      setTask(await taskRepo.save(task));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      await taskRepo.delete(task);
      setTasks(tasks.filter((t) => t !== task));
    } catch (error) {
      console.error(error as { message: string });
    }
  };

  return (
    <ListItem
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      key={task.id}
      disablePadding
      secondaryAction={
        isHover && (
          <>
            <IconButton edge="end" onClick={saveTask}>
              <Save />
            </IconButton>
            <IconButton edge="end" onClick={deleteTask}>
              <Delete />
            </IconButton>
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
          value={task.title}
          onChange={(e) => setTitle(e.target.value)}
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
