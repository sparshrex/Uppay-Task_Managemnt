import { createSlice } from '@reduxjs/toolkit';
import avatar1 from '../assets/Ellipse12.png';
import avatar2 from '../assets/Ellipse14.png';
import avatar3 from '../assets/Ellipse15.png';

// Default tasks if no data exists in localStorage
const initialTasks = [
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
      { id: 1, name: 'John', avatar: avatar2 },
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
      { id: 1, name: 'Doe', avatar: avatar1 },
      { id: 2, name: 'Jane', avatar: avatar3 },
    ],
  },
];

// Helper function to load tasks from localStorage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : initialTasks;
};

// Save tasks to localStorage whenever the state changes
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(), // Load tasks from localStorage
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state); // Save tasks to localStorage
    },
    updateTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveTasksToLocalStorage(state); // Save tasks to localStorage
      }
    },
  },
});

export const { addTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
