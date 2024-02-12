import { Paper, TextField, IconButton, FormControl, Box } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { Task } from "../shared/Task";
import { remult } from "remult";

const taskRepo = remult.repo(Task);

const AddNewTask = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const addNewTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await taskRepo.insert({ title: taskTitle });
      console.log(newTask);
      setTaskTitle("");
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };

  return (
    <Paper sx={{ maxWidth: 360 }} elevation={5}>
      <Box
        component="form"
        onSubmit={addNewTask}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <TextField
          id="newTask"
          // label="Add new task"
          variant="outlined"
          color="primary"
          placeholder="Add new Task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ "& fieldset": { border: "none" } }}
          margin="dense"
          fullWidth
        />

        <IconButton type="submit" size="medium" sx={{ mr: 0.5 }}>
          <AddTask />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default AddNewTask;
