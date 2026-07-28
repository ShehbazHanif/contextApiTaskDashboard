import Model from "./Model";
import { useState } from "react";

import { useTheme } from "../contexts/ThemeContext";
import { useTask } from "../contexts/TaskContext";
const Header = ({ handleAddWithSnackbar }) => {
  const { theme, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (task) => {
    handleAddWithSnackbar(task);
    setOpen(false);
  };
  return (
    <>
      <div className="border border-[#e2e8f0] rounded-[16px] p-2 shadow-md flex gap-4 justify-between items-center">
        <h2>Task Dashboard</h2>
        <div>
          <button
            className="bg-[#4ade80] text-white px-4 py-2 rounded-md hover:bg-[#22c55e] transition duration-300 m-2"
            onClick={handleOpen}>
            Add Task
          </button>
          <button
            className="bg-[#4ade80] text-white px-4 py-2 rounded-md hover:bg-[#22c55e] transition duration-300 "
            onClick={toggleTheme}>
            Switch to {theme === "light" ? "dark" : "light"}
          </button>
        </div>
      </div>
      <Model isOpen={open} isClosed={handleClose} onSave={handleSave} />
    </>
  );
};
export default Header;
