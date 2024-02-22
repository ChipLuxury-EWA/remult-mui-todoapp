import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/entities/Task";
import { TaskController } from "../shared/controllers/Tasks.controller";
import { MongoClient } from "mongodb";
import { MongoDataProvider } from "remult/remult-mongo";

import dotenv from "dotenv"
dotenv.config()

export const api = remultExpress({
    dataProvider: async () => {
        const client = new MongoClient(process.env.MONGO_URI!);
        await client.connect();
        return new MongoDataProvider(client.db("remult-task-app"), client);
    },
    entities: [Task],
    controllers: [TaskController],
    getUser: (req) => req.session!["user"],
});
