import { baseApi } from "./base.api";
import { remult, } from "remult";
import { Task } from "../shared/entities/Task";
import { TaskController } from "../shared/controllers/Tasks.controller";
import { buildEndPoints, toQueryFn } from "./api.tools.ts";


const taskRepo = remult.repo(Task);

const taskApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        ...buildEndPoints(taskRepo, "Task", build),
        setAllCompleted: build.mutation({
            queryFn: async (completed: boolean) => {
                return toQueryFn(() => TaskController.setAllTasksCompleted(completed));
            },
            invalidatesTags: ["Task"],
        }),
    }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useSetAllCompletedMutation } = taskApi;



