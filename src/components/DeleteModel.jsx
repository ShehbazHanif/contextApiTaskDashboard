import Button from "./Button";

const DeleteModel = ({
  isOpen,
  isClosed,
  task,
  handleCancel,
  handleDelete,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0  flex items-center justify-center bg-black/20 px-4">
        {" "}
        <div className="w-[500px]  bg-white rounded-[16px] p-4 shadow-xl">
          <div>Are you sure you want to delete this task? {task.taskName}</div>
          <div className="flex justify-end items-center p-4 gap-2">
            <Button onClick={() => handleCancel()}>cancel</Button>
            <Button
              className=" bg-red-500 hover:bg-red-300"
              onClick={() => handleDelete(task)}>
              delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteModel;
