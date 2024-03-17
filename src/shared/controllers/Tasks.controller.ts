import { BackendMethod, remult, Allow } from "remult";
import { Task } from "../entities/Task";

export class TaskController {
    //write as a regular function, not anonyms fat arrow 
    @BackendMethod({ allowed: Allow.authenticated })
    static async setAllTasksCompleted(completed: boolean) {
        const taskRepo = remult.repo(Task);

        for (const task of await taskRepo.find()) {
            await taskRepo.save({ ...task, completed });
        }
    }
}
