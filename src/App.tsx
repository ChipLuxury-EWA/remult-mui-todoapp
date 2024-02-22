import AddNewTask from "./components/AddNewTask";
import TaskList from "./components/TaskList";

function App({ signOut }: { signOut: () => void }) {
    return (
        <>
            <AddNewTask />
            <TaskList signOut={signOut} />
        </>
    );
}

export default App;
