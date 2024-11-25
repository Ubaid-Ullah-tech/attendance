import React, { useState, useEffect } from 'react';

const MarkAttendance = () => {
  // Define the initial students and their attendance status
  const initialStudents = [
    { id: 1, name: 'Student 1', status: '' },
    { id: 2, name: 'Student 2', status: '' },
    { id: 3, name: 'Student 3', status: '' },
    { id: 4, name: 'Student 4', status: '' },
    { id: 5, name: 'Student 5', status: '' },
  ];

  // State to manage students
  const [students, setStudents] = useState(initialStudents);
  const [submitted, setSubmitted] = useState(false);

  // Load attendance from localStorage on component mount
  useEffect(() => {
    const savedAttendance = JSON.parse(localStorage.getItem('attendance'));
    if (savedAttendance) {
      setStudents(savedAttendance);
      setSubmitted(true);
    }
  }, []);

  // Function to handle attendance marking
  const markAttendance = (id, status) => {
    if (!submitted) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, status } : student
        )
      );
    }
  };

  // Function to handle submission of attendance
  const handleSubmit = () => {
    localStorage.setItem('attendance', JSON.stringify(students));
    setSubmitted(true); // Prevent further changes
    alert('Submitted succesfully')  
};

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>
      <ul className="mb-4">
        {students.map((student) => (
          <li key={student.id} className="flex items-center mb-2">
            <span className="mr-4">{student.name}</span>
            {student.status ? (
              <span className={`badge ${student.status === 'Present' ? 'bg-green-500' : 'bg-red-500'} text-white px-2 py-1 rounded`}>
                {student.status}
              </span>
            ) : (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2 disabled:bg-gray-400"
                  onClick={() => markAttendance(student.id, 'Present')}
                  disabled={submitted} // Disable if submitted
                >
                  Present
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded disabled:bg-gray-400"
                  onClick={() => markAttendance(student.id, 'Absent')}
                  disabled={submitted} // Disable if submitted
                >
                  Absent
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={submitted} // Disable if already submitted
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default MarkAttendance;
