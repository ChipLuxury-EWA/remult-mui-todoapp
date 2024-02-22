import { Entity, Fields, Allow } from "remult";

@Entity("tasks", {
    allowApiCrud: Allow.authenticated,
    allowApiInsert: "admin",
    allowApiDelete: "admin",
})
export class Task {
    @Fields.string({ dbName: "_id", valueConverter: { fieldTypeInDb: "dbid" } })
    id = "";
    @Fields.string({
        validate: (task) => {
            if (task.title.length < 3) throw "Title to short";
        },
        allowApiUpdate: "admin",
    })
    title = "";
    @Fields.boolean()
    completed = false;
    @Fields.createdAt()
    createdAt?: Date;
}
