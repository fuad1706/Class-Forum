import React, { useState, useEffect, useRef } from "react";
import { Moon, Trash2 } from "lucide-react";

const App = () => {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [students, setStudents] = useState([]);
  const [time, setTime] = useState(0);

  const nameInputRef = useRef(null);

  // ⏱️ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addStudent = () => {
    if (!studentName || !studentClass) return;

    setStudents([
      ...students,
      {
        id: Date.now(),
        name: studentName,
        class: studentClass,
      },
    ]);

    setStudentName("");
    setStudentClass("");

    // 🔥 Auto-focus after adding
    nameInputRef.current.focus();
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const focusInput = () => {
    nameInputRef.current.focus();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      {/* TIMER */}
      <div className="p-2 text-center flex justify-around font-semibold">
        <div>Class Time: {formatTime(time)}</div>
        No of Student: {students.length}
      </div>

      {/* Header */}
      <div className="flex w-full justify-between bg-black items-center px-4 py-2">
        <h1 className="text-white text-lg font-semibold">CreedClassRoom</h1>
        <Moon className="w-5 h-5 text-white" />
      </div>

      {/* Form */}
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-3">Student Management</h1>

        <input
          ref={nameInputRef}
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 mr-2 mb-2"
        />

        <input
          type="text"
          placeholder="Enter Student Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="border p-2 mr-2 mb-2"
        />

        <div className="flex gap-2">
          <button
            onClick={addStudent}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Student
          </button>

          {/* 🎯 FOCUS BUTTON */}
          <button onClick={focusInput} className="border px-4 py-2 rounded">
            Focus Name Input
          </button>
        </div>

        {/* Student List */}
        <div className="mt-6">
          {students.length === 0 ? (
            <p className="text-gray-500">No students added yet</p>
          ) : (
            <ul className="space-y-2">
              {students.map((student) => (
                <li
                  key={student.id}
                  className="border p-3 rounded flex justify-between items-center"
                >
                  <span>
                    <strong>{student.name}</strong> — {student.class}
                  </span>

                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
