import { Hall } from "@/lib/type";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import DisplayHall from "./display-hall";
import { toast } from "react-hot-toast";

// make this as functional argument
  // const [halls, setHalls] = useState<Hall[]>([]);
const HallForm = ({
  halls,
  setHalls,
  setTotalHallCapacity
}: {
  halls: Hall[],
  setHalls: React.Dispatch<React.SetStateAction<Hall[]>>,
  setTotalHallCapacity: React.Dispatch<React.SetStateAction<number>>
}) => {
  
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
    toast.success("Deleted hall data")
  }
  const handleEditData = (index: number, hallData: Hall) => {
    setHalls(prevData => {
      const newData = [...prevData];
      newData[index] = hallData;
      return newData;
    });
    toast.success("Edited Hall data")
  }
  return (
    <div className="container form-group !p-2">
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