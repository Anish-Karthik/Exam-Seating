import { Hall } from "@/lib/type";
import { useState } from "react";
import { Button } from "./ui/button";
import DisplayHall from "./display-hall";


const HallForm = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [editingArray, setEditingArray] = useState<boolean[]>([]);

  const handleSubmit = () => {
    setEditingArray(prevArray => [...prevArray, true]);
    setHalls(prevHalls => [...prevHalls, {
      hallno: 0,
      dept: '',
      studentsPerBench: 1,
      studentsPerHall: 0,
      isSameYearPerBenchAllowed: false,
      benches: {
        rows: 0,
        cols: 0,
        total: 0
      }
    }]);
  };

  const handleDeleteData = (index: number) => {
    setHalls(prevData => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  }
  const handleEditData = (index: number, hallData: Hall) => {
    setHalls(prevData => {
      const newData = [...prevData];
      newData[index] = hallData;
      return newData;
    });
  }
  return (
    <div className="container">
      <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 text-xl px-3'
        onClick={handleSubmit}
      >
        Add Hall
      </Button>
      {halls.map((hall, index) => (
        <div className='flex' key={index}>
          <DisplayHall hall={hall} onDelete={handleDeleteData} index={index} onEdit={handleEditData} setEditingIndex={setEditingArray} defaultIsEdit={editingArray[index]} />
        </div>
      ))}
    </div>
  );
};

export default HallForm;