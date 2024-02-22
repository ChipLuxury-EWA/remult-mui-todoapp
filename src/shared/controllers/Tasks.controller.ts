import { BackendMethod, remult, Allow } from "remult";
import { Task } from "../entities/Task";

export class TaskController {
    @BackendMethod({ allowed: Allow.authenticated })
    //write as a regular function, not anonyms fat arrow 
    static async setAllTasksCompleted(completed: boolean) {
        console.log("first");
        const taskRepo = remult.repo(Task);

        for (const task of await taskRepo.find()) {
            await taskRepo.save({ ...task, completed });
        }
    }
}
