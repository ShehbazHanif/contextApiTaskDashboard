import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import Header from "./components/Header";
import CustomTable from "./components/CustomTable";

import Model from "./components/Model";
import SearchAndFilter from "./components/SearchAndFilter";
import { Snackbar, Alert } from "@mui/material";
import { useDebounce } from "./hooks/useDebonce";
import { useTask } from "./contexts/TaskContext";
function App() {
  const options = [
    {
      label: "Low",
      value: "low",
    },
    {
      label: "High",
      value: "high",
    },
    {
      label: "Normal",
      value: "normal",
    },
  ];
  const { task, handleAdd, handleDelete, handleUpdate } = useTask();
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" | "info" | "warning"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // console.log("task", task);

  const debouncedSearch = useDebounce(search, 5000); // Debounce the search input with a delay of 500ms
  // console.log("debouncedSearch", debouncedSearch);
  const filterTasks = task.filter((task) => {
    return (
      task.taskName.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
      (priority === "" || task.taskPriority.toLowerCase() === priority)
    );
  });
  const handleAddWithSnackbar = (task) => {
    handleAdd(task);
    showSnackbar("Task added successfully!", "success");
  };
  const handleDeleteWithSnackbar = (task) => {
    handleDelete(task);
    showSnackbar("Task deleted successfully!", "error");
  };
  const handleUpdateWithSnackbar = (task) => {
    handleUpdate(task);
    showSnackbar("Task update successfully!", "success");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return; // don't close if user clicked elsewhere
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto  my-4 border border-[#EAEA3A] p-4 rounded-[16px] bg-white dark:bg-[#EAEA3A] text-black dark:text-white ">
        <Header handleAddWithSnackbar={handleAddWithSnackbar} />
        <SearchAndFilter
          options={options}
          placeholder="Search tasks..."
          handleSearchChange={handleSearchChange}
          handlePriorityChange={handlePriorityChange}
        />
        <CustomTable
          tasks={filterTasks}
          handleUpdateWithSnackbar={handleUpdateWithSnackbar}
          handleDeleteWithSnackbar={handleDeleteWithSnackbar}
        />
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
