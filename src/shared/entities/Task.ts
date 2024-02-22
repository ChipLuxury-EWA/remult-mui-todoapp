import { Entity, Fields, Allow } from "remult";

@Entity("tasks", {
  allowApiCrud: Allow.authenticated,
})
export class Task {
  @Fields.cuid()
  id = "";
  @Fields.string({
    validate: (task) => {
      if (task.title.length < 3) throw "Title to short";
    },
  })
  title = "";
  @Fields.boolean()
  completed = false;
  @Fields.createdAt()
  createdAt?: Date;
}
