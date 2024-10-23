import React, { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { FaTasks, FaProjectDiagram } from 'react-icons/fa'; // Icons
import './Base.css'; // Custom CSS for styling

export default function Base() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [projectTitle, setProjectTitle] = useState('');

  useEffect(() => {
    const projectData = localStorage.getItem('projectData');
    if (projectData) {
      const parsedData = JSON.parse(projectData);
      setProjectTitle(parsedData.title);
      fetchAllTasks(parsedData.title);
    } else {
      setError('No project data found in local storage.');
    }
  }, []);

  // Fetch tasks from API
  const fetchAllTasks = async (title) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/getTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      if (data.tasks) {
        setTasks(data.tasks);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks.');
    }
  };

  const totalTasks = tasks.length;

  // Initialize counts for statuses and priorities
  let completedTasksCount = 0;
  let inProgressTasksCount = 0;
  let pendingTasksCount = 0;

  let highPriorityCount = 0;
  let mediumPriorityCount = 0;
  let lowPriorityCount = 0;

  // Normalize status function to avoid inconsistencies
  const normalizeStatus = (status) => {
    const normalized = status.trim().toLowerCase();
    return normalized === 'completed' ? 'completed' :
           normalized === 'in-progress' ? 'in-progress' : 'pending';
  };

  // Normalize priority function
  const normalizePriority = (priority) => {
    const normalized = priority.trim().toLowerCase();
    return normalized === 'high' ? 'high' : normalized === 'medium' ? 'medium' : 'low';
  };

  tasks.forEach(task => {
    const normalizedStatus = normalizeStatus(task.status);
    const normalizedPriority = normalizePriority(task.Priority);

    // Count statuses
    if (normalizedStatus === 'completed') completedTasksCount++;
    if (normalizedStatus === 'in-progress') inProgressTasksCount++;
    if (normalizedStatus === 'pending') pendingTasksCount++;

    // Count priorities
    if (normalizedPriority === 'high') highPriorityCount++;
    if (normalizedPriority === 'medium') mediumPriorityCount++;
    if (normalizedPriority === 'low') lowPriorityCount++;
  });

  // Prepare data for task status and priorities
  const taskStatusData = [
    { name: 'Completed', value: completedTasksCount },
    { name: 'In Progress', value: inProgressTasksCount },
    { name: 'Pending', value: pendingTasksCount }
  ];

  const taskPriorityData = [
    { name: 'High', value: highPriorityCount },
    { name: 'Medium', value: mediumPriorityCount },
    { name: 'Low', value: lowPriorityCount }
  ];

  return (
    <div className="base-container">
      <div className="header">
        <FaProjectDiagram className="icon" />
        <h1>Project: {projectTitle}</h1>
      </div>
      {error && <p className="error">{error}</p>}

      {/* Main grid container for two rows of charts */}
      <div className="chart-grid">

        {/* First row: Task Status */}
        <div className="chart-item">
          <h2><FaTasks className="icon" /> Task Status - Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskStatusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#00C49F">
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FFBB28', '#FF8042'][index % 3]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h2><FaTasks className="icon" /> Task Status - Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%" 
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#00C49F', '#FFBB28', '#FF8042'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Second row: Task Priority */}
        <div className="chart-item">
          <h2><FaTasks className="icon" /> Task Priority - Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskPriorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FF8042">
                {taskPriorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#FF8042', '#FFBB28', '#00C49F'][index % 3]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-item">
          <h2><FaTasks className="icon" /> Task Priority - Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskPriorityData}
                dataKey="value"
                nameKey="name"
                cx="50%" 
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {taskPriorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#FF8042', '#FFBB28', '#00C49F'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}