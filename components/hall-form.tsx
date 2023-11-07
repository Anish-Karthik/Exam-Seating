import { Hall } from "@/lib/type";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import DisplayHall from "./display-hall";

// make this as functional argument
  // const [totalHallCapacity, setTotalHallCapacity] = useState<number>(0); 
const HallForm = ({
  setTotalHallCapacity
}: {
  setTotalHallCapacity: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [editingArray, setEditingArray] = useState<boolean[]>([]);

  useEffect(() => {
    const total = halls.reduce((acc, curr) => acc + curr.studentsPerHall, 0);
    setTotalHallCapacity(total);
  }, [halls]);

  const handleSubmit = () => {
    setEditingArray(prevArray => [...prevArray, true]);
    setHalls(prevHalls => [...prevHalls, {
      hallno: "0",
      dept: 'CSE',
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
    <div className="container !pl-0">
      <Button variant={"outline"} className='rounded-full text-blue-800 border-blue-800 text-xl px-3 mb-2'
        onClick={handleSubmit}
      >
        Add Hall
      </Button>
      <div className="flex flex-col-reverse gap-2">
        {halls.map((hall, index) => (
          <div className='flex' key={index}>
            <DisplayHall hall={hall} onDelete={handleDeleteData} index={index} onEdit={handleEditData} setEditingIndex={setEditingArray} defaultIsEdit={editingArray[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallForm;