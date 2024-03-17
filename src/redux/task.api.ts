import { baseApi } from "./base.api";
import { remult } from "remult";
import { Task } from "../shared/entities/Task";
import { TaskController } from "../shared/controllers/Tasks.controller";

const taskRepo = remult.repo(Task);

const taskApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query({
            queryFn: async ({ options }) => {
                try {
                    const data = taskRepo.toJson(await taskRepo.find({ ...options }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            providesTags: ["Task"],
        }),
        addTask: build.mutation({
            queryFn: async (taskTitle: string) => {
                try {
                    const data = taskRepo.toJson(await taskRepo.insert({ title: taskTitle }));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Task"],
        }),
        deleteTask: build.mutation({
            queryFn: async (task: Task) => {
                try {
                    const data = taskRepo.toJson(await taskRepo.delete(task));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Task"],
        }),
        updateTask: build.mutation({
            queryFn: async (task: Task) => {
                try {
                    const data = taskRepo.toJson(await taskRepo.save(task));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Task"],
        }),
        setAllCompleted: build.mutation({
            queryFn: async (completed: boolean) => {
                try {
                    const data = taskRepo.toJson(await TaskController.setAllTasksCompleted(completed));
                    return { data };
                } catch (error) {
                    return { error };
                }
            },
            invalidatesTags: ["Task"],
        }),
    }),
});

export const { useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useSetAllCompletedMutation } = taskApi;
