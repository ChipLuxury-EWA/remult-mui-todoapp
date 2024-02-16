import { Paper, TextField, IconButton, Box } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { Task } from "../shared/entities/Task";
import { remult } from "remult";
import { useSnackbar } from "notistack";

const taskRepo = remult.repo(Task);

const AddNewTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const addNewTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newTask = await taskRepo.insert({ title: taskTitle });
      setTaskTitle("");
      enqueueSnackbar(`Add: ${newTask.title}`, { variant: "success" });
    } catch (error) {
      enqueueSnackbar((error as { message: string }).message, { variant: "error" });
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
          variant="outlined"
          color="primary"
          placeholder="Add new Task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          sx={{ "& fieldset": { border: "none" } }}
          margin="dense"
          fullWidth
          autoFocus
        />

        <IconButton type="submit" size="medium" sx={{ mr: 0.5 }}>
          <AddTask />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default AddNewTask;
