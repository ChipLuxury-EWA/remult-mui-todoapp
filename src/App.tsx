import { remult } from "remult";
import { Task } from "./shared/entities/Task";

import AddNewTask from "./components/AddNewTask";
import TaskList from "./components/TaskList";

const taskRepo = remult.repo(Task);


function App({ signOut }: { signOut: () => void }) {
    return (
        <>
            {taskRepo.metadata.apiInsertAllowed() && <AddNewTask />}
            <TaskList signOut={signOut} />
        </>
    );
}

export default App;
