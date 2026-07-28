import { useEffect, useState } from "react";
import Input from "./Input";
import { useStepperContext } from "@mui/material/Stepper";
const Model = ({
  mode = "add",
  isOpen,
  isClosed,
  maxWidth,
  width = "500px",
  content = null,
  onSave,
}) => {
  const inital_State = {
    id: "",
    taskName: "",
    taskDescription: "",
    taskPriority: "",
    taskDate: "",
  };
  const [formData, setFormData] = useState(inital_State);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (content) {
      // console.log("content", content);
      setFormData(content);
    }
  }, [content]);

  const valiadateFeild = (name, value) => {
    let message = "";
    if (name === "taskName") {
      if (!value.trim()) {
        message = "Task name is required";
      } else if (value.trim().length < 3)
        message = "Must be at least 3 characters";
    }
    if (name === "taskDescription") {
      if (!value.trim()) message = "Description is required";
      else if (value.trim().length < 3)
        message = "Must be at least 3 characters";
    }
    if (name === "taskDate") {
      if (!value.trim()) message = "date is required";
    }

    return message;
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const message = valiadateFeild(name, value);
    setErrors((pre) => ({ ...pre, [name]: message }));
  };
  const handleOnChange = (e) => {
    // console.log("event", e);
    // console.log("event", e.target.value);
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));

    const message = valiadateFeild(name, value);
    setErrors((pre) => {
      return { ...pre, [name]: message };
    });
  };

  const handleSubmit = () => {
    onSave(formData);
    // console.log("formData", formData);
    isClosed();
    setFormData(inital_State);
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black/40 px-4">
      <div
        style={{ width: width, maxWidth: maxWidth }}
        className={`  bg-white rounded-[16px] p-4 shadow-xl`}>
        <h1 className="text-[24px] font-bold">Model</h1>
        <div>
          <Input
            label="Task Name"
            name="taskName"
            placeholder="Enter task name"
            value={formData.taskName}
            onChange={handleOnChange}
            error={errors.taskName}
          />
          <Input
            label="Task Description"
            placeholder="Enter task description"
            onChange={handleOnChange}
            name="taskDescription"
            value={formData.taskDescription}
            error={errors.taskDescription}
          />

          <select
            name="taskPriority"
            value={formData.taskPriority}
            onChange={handleOnChange}
            className="border border-gray-300 rounded-[16px] p-3 my-2 w-full">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <Input
            label="Date"
            type="date"
            placeholder="Enter Date"
            name="taskDate"
            value={formData.taskDate}
            onChange={handleOnChange}
            error={errors.taskDate}
            onBlur={handleBlur}
          />
        </div>
        <footer className="flex justify-end gap-4 mt-4">
          <button
            className="bg-[#4ade80] text-white px-4 py-2 rounded-md hover:bg-[#22c55e] transition duration-300"
            onClick={isClosed}>
            Close
          </button>
          <button
            className="bg-[#4ade80] text-white px-4 py-2 rounded-md hover:bg-[#22c55e] transition duration-300"
            onClick={handleSubmit}>
            {mode === "edit" ? "Update Task" : "Save Task"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Model;
