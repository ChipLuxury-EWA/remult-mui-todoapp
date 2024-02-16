import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/entities/Task";
import { TaskController } from "../shared/controllers/Tasks.controller";

export const api = remultExpress({
    entities: [Task],
    controllers: [TaskController],
});
