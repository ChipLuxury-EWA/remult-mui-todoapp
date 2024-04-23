import { useState, useEffect } from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useSetAllCompletedMutation,
} from "../task.api";
import { Task } from "../../shared/entities/Task";
import { remult } from "remult";
const taskRepo = remult.repo(Task);

const useTaskQueryHook = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    return taskRepo
      .liveQuery({
        limit: 30,
        orderBy: { createdAt: "asc" },
        // where: { completed: true },
      })
      .subscribe((info) => setTasks(info.applyChanges));
  }, []);

  const {
    data: allTasks,
    // error: allTasksError,
    // isLoading: allTasksLoading,
    // isError: foo1,
    isSuccess: isAllTasksSuccess,
  } = useGetTasksQuery({});

  isAllTasksSuccess && console.log(allTasks);

  const [
    addTask,
    { data: addTaskAns, error: addTaskError, isLoading: isAddingTask, isError: isAddingTaskError, isSuccess: isAddedTaskSuccess },
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

  const [
    updateTask,
    {
      data: updateTaskAns,
      error: updateTaskError,
      isLoading: isUpdatingTask,
      isError: isErrorUpdatingTask,
      isSuccess: isUpdatedTaskSuccessfully,
    },
  ] = useUpdateTaskMutation();

  const [
    setAllCompleted,
    {
      data: setAllTaskAns,
      error: setAllTaskError,
      isLoading: isSettingAllTask,
      isError: isErrorSetAllTask,
      isSuccess: isSetAllSuccessfully,
    },
  ] = useSetAllCompletedMutation();

  const isLoading = isDeletingTask || isAddingTask || isUpdatingTask || tasks.length === 0;

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
    updateTask,
    updateTaskAns,
    updateTaskError,
    isUpdatingTask,
    isErrorUpdatingTask,
    isUpdatedTaskSuccessfully,
    setAllCompleted,
    setAllTaskAns,
    setAllTaskError,
    isSettingAllTask,
    isErrorSetAllTask,
    isSetAllSuccessfully,
  };
};

export default useTaskQueryHook;
