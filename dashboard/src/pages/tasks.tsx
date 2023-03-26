import React, { useState } from "react";
import TaskTable from "../Reusable/table/Table";
import Header from "../componenets/header";

type Task = {
  id: number;
  title: string;
  status: string;
};

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Task 1", status: "Open" },
    { id: 2, title: "Task 2", status: "Closed" },
    { id: 3, title: "Task 3", status: "Open" },
  ]);

  return (
    <>
    <Header />
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      <TaskTable tasks={tasks} />
    </div>
    </>
  );
}

export default TasksPage;
