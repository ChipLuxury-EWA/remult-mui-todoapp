import { useEffect, useState } from "react";
import { remult } from "remult";
import { Task } from "../shared/Task";
import { List, Paper } from "@mui/material";
import TaskListItem from "./TaskListItem";

const taskRepo = remult.repo(Task);

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskRepo
      .find({
        orderBy: { createdAt: "asc" },
        // where: { completed: true },
      })
      .then(setTasks);
  }, []);

  const tasksListItems = tasks.map((task: Task) => {
    return <TaskListItem key={task.id} task={task} tasks={tasks} setTasks={setTasks} />;
  });

  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      <Paper>{tasksListItems}</Paper>
    </List>
  );
};

export default TaskList;
