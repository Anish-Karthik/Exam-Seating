import { Hall } from "@/lib/type";
import { useState } from "react";
import { Button } from "./ui/button";

const DisplayHall = ({ defaultIsEdit, hall, onDelete, onEdit, index, setEditingIndex }: { setEditingIndex:  React.Dispatch<React.SetStateAction<boolean[]>>,defaultIsEdit: boolean, hall: Hall, onDelete: (index: number) => void, index: number, onEdit: (index: number, hallData: Hall) => void }) => {
  const [hallData, setHallData] = useState<Hall>(hall);
  const [isEditing, setIsEditing] = useState<boolean>(defaultIsEdit);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHallData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBenchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHallData(prevState => ({
      ...prevState,
      benches: {
        ...prevState.benches,
        [name]: value
      }
    }));
  };

  const toggleEdit = (index: number) => {
    setEditingIndex((prevState) => {
      const newArr = [...prevState];
      newArr[index] = !newArr[index];
      return newArr;
    })
    setIsEditing(prevState => !prevState);
  }

  const handleSave = (index: number) => {
    toggleEdit(index);
    onEdit(index, hallData);
  };

  return (
    <div className='flex flex-col-reverse'>
    <div className="flex gap-2">
      <div className="form-group">
        <label htmlFor={`hallno-${index}`}>Hall Number</label>
        {isEditing ? <input
          type="number"
          className="form-control"
          id={`hallno-${index}`}
          name="hallno"
          value={hallData.hallno}
          onChange={handleInputChange}
        />: (
          <div className="form-control" id={`hallno-${index}`}>
            {hallData.hallno}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`dept-${index}`}>Department</label>
        {isEditing ? <input
          type="text"
          className="form-control"
          id={`dept-${index}`}
          name="dept"
          value={hallData.dept}
          onChange={handleInputChange}
        />: (
          <div className="form-control" id={`dept-${index}`}>
            {hallData.dept}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`studentsPerBench-${index}`}>Students Per Bench</label>
        {isEditing ? <select
          className="form-control"
          id={`studentsPerBench-${index}`}
          name="studentsPerBench"
          value={hallData.studentsPerBench}
          onChange={handleInputChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select> : (
          <div className="form-control" id={`studentsPerBench-${index}`}>
            {hallData.studentsPerBench}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`studentsPerHall-${index}`}>Students Per Hall</label>
        {isEditing ? <input
          type="number"
          className="form-control"
          id={`studentsPerHall-${index}`}
          name="studentsPerHall"
          value={hallData.studentsPerHall}
          onChange={handleInputChange}
        />: (
          <div className="form-control" id={`studentsPerHall-${index}`}>
            {hallData.studentsPerHall}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`benchesRows-${index}`}>Number of Rows</label>
        {isEditing ? <input
          type="number"
          className="form-control"
          id={`benchesRows-${index}`}
          name="rows"
          value={hallData.benches.rows}
          onChange={handleBenchInputChange}
        />: (
          <div className="form-control" id={`benchesRows-${index}`}>
            {hallData.benches.rows}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`benchesCols-${index}`}>Number of Columns</label>
        {isEditing ? <input
          type="number"
          className="form-control"
          id={`benchesCols-${index}`}
          name="cols"
          value={hallData.benches.cols}
          onChange={handleBenchInputChange}
        />: (
          <div className="form-control" id={`benchesCols-${index}`}>
            {hallData.benches.cols}
          </div>
        )}
      </div>
      {isEditing ? (
        <Button variant={"outline"} className='rounded-full text-green-800 border-green-800 text-xl px-3'
          onClick={handleSave}
        >
          Save
        </Button>
      ) : (
        <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 text-xl px-3'
          onClick={toggleEdit}
        >
          Edit
        </Button>
      )}
      {isEditing && (
        <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3'
          onClick={toggleEdit}
        >
          Cancel
        </Button>
      )}
      <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3'
        onClick={() => onDelete(index)}
      >
        Delete
      </Button>
    </div>
  </div>
  );
}

export default DisplayHall;