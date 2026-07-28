import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Model from "./Model";
import DeleteModel from "./DeleteModel";
import { useTask } from "../contexts/TaskContext";
import Button from "./Button";
import { Pencil, Trash } from "@phosphor-icons/react";

const CustomTable = ({
  tasks,
  handleDeleteWithSnackbar,
  handleUpdateWithSnackbar,
}) => {
  const { handleCancel } = useTask();
  const [selectedTask, setSelectedTask] = useState(null);
  const [open, setIsOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOPen] = useState(false);

  const handleClosed = () => {
    setIsOpen(false);
  };
  const handleClick = (t) => {
    // console.log("task", t);
    setIsOpen(true);
    setSelectedTask(t);
  };

  const handleDeleteClick = (t) => {
    // console.log("task", t);
    setDeleteModelOPen(true);
    setSelectedTask(t);
  };

  const confirmDelete = (t) => {
    handleDeleteWithSnackbar(t);
    setTimeout(() => {
      setDeleteModelOPen(false);
    }, 6000);
  };

  const cancelDelete = () => {
    handleCancel();
    setDeleteModelOPen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.taskDescription}</TableCell>
                  <TableCell>{task.taskPriority}</TableCell>
                  <TableCell>{task.taskDate}</TableCell>
                  <TableCell
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button onClick={() => handleClick(task)} icon={Pencil}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(task)}
                      icon={Trash}
                      className="bg-red-500 hover:bg-red-300">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="align-center text-center">
                  {" "}
                  No Tasks
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Model
        mode="edit"
        isOpen={open}
        isClosed={handleClosed}
        content={selectedTask}
        onSave={handleUpdateWithSnackbar}
      />
      <DeleteModel
        isOpen={deleteModelOpen}
        handleDelete={confirmDelete}
        task={selectedTask}
        handleCancel={cancelDelete}
      />
    </>
  );
};
export default CustomTable;
