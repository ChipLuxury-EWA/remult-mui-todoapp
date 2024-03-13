import { useState, useEffect } from "react";
import { useDeleteTaskMutation, useAddTaskMutation } from "../task.api";
import { Task } from "../../shared/entities/Task";
import { remult } from "remult";
const taskRepo = remult.repo(Task);

const useTaskQueryHook = () => {
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

    const [
        addTask,
        {
            data: addTaskAns,
            error: addTaskError,
            isLoading: isAddingTask,
            isError: isAddingTaskError,
            isSuccess: isAddedTaskSuccess,
        },
    ] = useAddTaskMutation();

    const [
        deleteTask,
        {
            data: deleteTaskAns,
            error: deleteTaskError,
            isLoading: isDeletingTask,
            isError: isErrorDeletingTask,
            isSuccess: isDeletedSuccessfully,
        },
    ] = useDeleteTaskMutation();

    const isLoading = isDeletingTask || isAddingTask || tasks.length === 0;

    return {
        tasks,
        isLoading,
        deleteTask,
        deleteTaskAns,
        deleteTaskError,
        isDeletingTask,
        isErrorDeletingTask,
        isDeletedSuccessfully,
        addTask,
        addTaskAns,
        addTaskError,
        isAddingTask,
        isAddingTaskError,
        isAddedTaskSuccess,
    };
};

export default useTaskQueryHook;
