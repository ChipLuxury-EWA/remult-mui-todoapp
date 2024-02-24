import { remult } from "remult";
import { Box, Grid } from "@mui/material";
import { Task } from "./shared/entities/Task";

import AddNewTask from "./components/AddNewTask";
import TaskList from "./components/TaskList";

const taskRepo = remult.repo(Task);

// TODO tompo add footer
function App({ signOut, maxWidth }: { signOut: () => void; maxWidth: number }) {
    return (
        <Box padding={2} display="flex" alignItems="center" justifyContent="center">
            <Grid container maxWidth={maxWidth} direction="column" justifyContent="flex-start" alignItems="stretch">
                {taskRepo.metadata.apiInsertAllowed() && (
                    <Grid item xs={12}>
                        <AddNewTask />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <TaskList signOut={signOut} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
