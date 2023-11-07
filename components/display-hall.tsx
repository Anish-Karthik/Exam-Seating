import { Hall } from "@/lib/type";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DisplayHall = ({ defaultIsEdit, hall, onDelete, onEdit, index, setEditingIndex }: { setEditingIndex:  React.Dispatch<React.SetStateAction<boolean[]>>,defaultIsEdit: boolean, hall: Hall, onDelete: (index: number) => void, index: number, onEdit: (index: number, hallData: Hall) => void }) => {
  const [hallData, setHallData] = useState<Hall>(hall);
  const [isEditing, setIsEditing] = useState<boolean>(defaultIsEdit);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (["studentsPerHall", "studentsPerbench"].includes(name)) {
      setHallData(prevState => ({
        ...prevState,
        [name]: parseInt(value)
      }));
    } else {
      setHallData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleBenchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (["rows", "cols"].includes(name)) {
      setHallData(prevState => ({
        ...prevState,
        benches: {
          ...prevState.benches,
          [name]: parseInt(value)
        }
      }));
    } else {
      setHallData(prevState => ({
        ...prevState,
        benches: {
          ...prevState.benches,
          [name]: value
        }
      }));
    }
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
        {isEditing ? <Input
          type="number"
          className="form-control"
          id={`hallno-${index}`}
          name="hallno"
          value={hallData.hallno}
          onChange={handleInputChange}
        />: (
          <div className="form-control">
            {hallData.hallno}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`dept-${index}`}>Department</label>
        {isEditing ? <Input
          type="text"
          className="form-control"
          name="dept"
          value={hallData.dept}
          onChange={handleInputChange}
        />: (
          <div className="form-control">
            {hallData.dept}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`studentsPerBench-${index}`}>Students Per Bench</label>
        {isEditing ? <Select
          name="isSameYearPerBenchAllowed"
          value={hallData.isSameYearPerBenchAllowed.toString()}
          onValueChange={(value: string) => {
            setHallData((prevState) => ({
              ...prevState,
              isSameYearPerBenchAllowed: value === "true"
            }));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Students Per Bench" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select> : (
          <div className="form-control" >

            {hallData.isSameYearPerBenchAllowed}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`studentsPerBench-${index}`}>Students Per Bench</label>
        {isEditing ? <Select
          name="studentsPerBench"
          value={hallData.studentsPerBench.toString()}
          onValueChange={(value: string) => {
            setHallData((prevState) => ({
              ...prevState,
              studentsPerBench: parseInt(value) > 1? 2: 1
            }));
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Students Per Bench" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select> : (
          <div className="form-control" >

            {hallData.studentsPerBench}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`studentsPerHall-${index}`}>Students Per Hall</label>
        {isEditing ? <Input
          type="number"
          className="form-control"
          name="studentsPerHall"
          value={hallData.studentsPerHall}
          onChange={handleInputChange}
        />: (
          <div className="form-control">
            {hallData.studentsPerHall}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`benchesRows-${index}`}>Number of Rows</label>
        {isEditing ? <Input
          type="number"
          className="form-control" 
          name="rows"
          value={hallData.benches.rows}
          onChange={handleBenchInputChange}
        />: (
          <div className="form-control" >
            {hallData.benches.rows}
          </div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`benchesCols-${index}`}>Number of Columns</label>
        {isEditing ? <Input
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
          onClick={() => handleSave(index)}
        >
          Save
        </Button>
      ) : (
        <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 text-xl px-3'
          onClick={() => toggleEdit(index)}
        >
          Edit
        </Button>
      )}
      {isEditing && (
        <Button variant={"outline"} className='rounded-full text-red-800 border-red-800 text-xl px-3'
          onClick={() => toggleEdit(index)}
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