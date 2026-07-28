import { createContext, useContext, useState, useRef } from "react";

const TaskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState(() => {
    return JSON.parse(localStorage.getItem("taskArray")) || [];
  });

  let timerId = useRef(null);

  const handleAdd = (task) => {
    const addTask = {
      ...task,
      id: Date.now() + Math.floor(Math.random() * 1000),
    };
    setTask((prevTasks) => {
      const newTasks = [...prevTasks, addTask];
      localStorage.setItem("taskArray", JSON.stringify(newTasks));
      console.log("newTasks", newTasks);
      return newTasks;
    });
    // showSnackbar("Task added successfully!", "success"); // 👈 trigger it
  };

  const handleUpdate = (updatedTask) => {
    // debugger;
    console.log("handleUpdates is calling :", updatedTask);
    setTask((prevTasks) => {
      const updatedTaskArray = prevTasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t,
      );
      localStorage.setItem("taskArray", JSON.stringify(updatedTaskArray));
      console.log("updatedTaskArray :", updatedTaskArray);
      return updatedTaskArray;
    });
    // console.log("result :", result);
  };

  // console.log("handleUpdate :", handleUpdate);
  const handleDelete = (deleteTask) => {
    timerId.current = setTimeout(() => {
      const updatedTask = task.filter((t) => t.id !== deleteTask.id);
      console.log("updatedTask", updatedTask);
      setTask(updatedTask);
      localStorage.setItem("taskArray", JSON.stringify(updatedTask));
    }, 5000);
  };

  const handleCancel = () => {
    clearTimeout(timerId.current);
  };
  const value = {
    timerId,
    handleDelete,
    handleCancel,
    task,
    // setTask,
    handleAdd,
    handleUpdate,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const task = useContext(TaskContext);
  if (!task) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return task;
};
