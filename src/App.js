import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from './redux/taskSlice';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskSection from './components/TaskSection';
import avatar1 from './assets/Ellipse12.png';
import avatar2 from './assets/Ellipse14.png';
import avatar3 from './assets/Ellipse15.png';
import groupimage from './assets/Group 646.png';

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState('All');

  const dummyTasks = [
    {
      id: 1,
      title: 'Brainstorming',
      priority: 'Low',
      priorityColor: 'yellow',
      description: "Brainstorming brings team members' diverse experience into play.",
      comments: 12,
      files: 0,
      members: [
        { id: 1, name: 'John', avatar: avatar1 },
        { id: 2, name: 'Doe', avatar: avatar2 },
        { id: 3, name: 'Jane', avatar: avatar3 },
      ],
    },
    {
      id: 2,
      title: 'Design Review',
      priority: 'High',
      priorityColor: 'red',
      description: 'Review the design mockups for the mobile app.',
      comments: 5,
      files: 2,
      members: [
        { id: 1, name: 'John', avatar: avatar1 },
        { id: 2, name: 'Jane', avatar: avatar3 },
      ],
    },
    {
      id: 3,
      title: 'API Integration',
      priority: 'Medium',
      priorityColor: 'orange',
      description: 'Integrate the new API for user authentication.',
      comments: 3,
      files: 1,
      members: [
        { id: 1, name: 'Doe', avatar: avatar2 },
        { id: 2, name: 'Jane', avatar: avatar3 },
      ],
    },
  ];

  useEffect(() => {
    // On component mount, check local storage for saved tasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // If no tasks in Redux store, dispatch either hardcoded tasks or saved tasks
    if (tasks.length === 0) {
      if (savedTasks.length > 0) {
        savedTasks.forEach((task) => dispatch(addTask(task)));
      } else {
        dummyTasks.forEach((task) => dispatch(addTask(task)));
      }
    }
  }, [dispatch, tasks.length]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white overflow-auto">
        <Header />
        <div>
          <div className='flex justify-between m-4'>
            <h1 className="text-4xl font-semibold">Mobile App</h1>
            <img src={groupimage} alt="icon" className='cursor-pointer' />
          </div>
          <div className='flex justify-between m-1'>
            <select onChange={handleFilterChange} className="bg-gray-100 border-2 border-gray-400 p-2 rounded-md cursor-pointer">
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button className='border-2 border-gray-400 bg-gray-100 mr-4 w-24 p-2 rounded-md'>Share</button>
          </div>
        </div>
        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Conditionally rendering TaskSections based on filter */}
          {filter === 'All' ? (
            <>
              {/* Render tasks in their normal sections */}
              <TaskSection title="To Do" tasks={tasks} filter="Low" color="border-purple-400" />
              <TaskSection title="On Progress" tasks={tasks} filter="Medium" color="border-orange-400" />
              <TaskSection title="Done" tasks={tasks} filter="High" color="border-green-400" />
            </>
          ) : (
            <TaskSection title="To Do" tasks={tasks} filter={filter} color="border-purple-400" />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
