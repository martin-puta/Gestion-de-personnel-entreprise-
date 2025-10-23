import React, { useState, useRef } from 'react';
import '../pages/Dashboard.css';

// You would use an icon library like react-icons for these.
// For simplicity, we'll just use text placeholders.
const icons = {
  search: '🔍',
  add: '➕',
  bell: '🔔',
  user: '👤',
  weather: '🌧️',
  tasks: '📋',
  projects: '📂',
};

// Main Dashboard Component
const DashBoard = () => {
  const [userName, setUserName] = useState('Martin Smith');
  const [userPostName, setUserPostName] = useState('UX/UI Designer');
  const [showUserForm, setShowUserForm] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState('https://via.placeholder.com/150'); // Placeholder image

  // Temporary states for form inputs
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempUserPostName, setTempUserPostName] = useState(userPostName);
  const [tempUserProfileImage, setTempUserProfileImage] = useState(userProfileImage);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUserProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();
    setUserName(tempUserName);
    setUserPostName(tempUserPostName);
    setUserProfileImage(tempUserProfileImage);
    setShowUserForm(false);
  };
  
  // Use state for dynamic data
  const [projects, setProjects] = useState([
    { name: 'Lead Sense', owner: 'Madam Owner', status: 'ACTIVE', priority: 'HIGH', payment: 'DONE', description: 'An excellent opportunity for an experienced UX/UI Designer to join a well-established cybersecurity.' },
    { name: 'Digiijn CRM', owner: 'Jason Pineda', status: 'ACTIVE', priority: 'DONE', payment: 'DONE', description: 'An excellent opportunity for an experienced UX/UI Designer to join a well-established cybersecurity.' },
  ]);

  const [tasks, setTasks] = useState([
    { text: 'This is an example about my task' },
    { text: 'This is an example about my task' },
    { text: 'This is an example about my task' },
  ]);

  const [meetings, setMeetings] = useState([
    { company: 'LexCorp', date: '10/09/2023', time: '11:30', duration: '30min' },
    { company: 'TVA', date: '05/10/2023', time: '09:30', duration: '45min' },
    { company: 'Arconia Mable', date: '06/11/2023', time: '12:00', duration: '60min' },
  ]);

  const todos = [
    { title: 'Dashboard Design', status: 'Ligne', description: 'Discussion for management dashboard ui design', comments: 82, likes: '1.2k' },
    { title: 'Lending page Design', status: 'Complet', description: 'Discussion for management dashboard ui design', comments: 82, likes: '128' },
    { title: 'E-Shop Mobile App', status: 'Complet', description: 'Discussion for management dashboard ui design', comments: 112, likes: '1.3k' },
    { title: 'Dashboard Design', status: 'Ligne', description: 'Discussion for management dashboard ui design', comments: 82, likes: '1.2k' },
  ];

  // State for search filter
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Use state for form visibility
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [newTask, setNewTask] = useState('');
  const [newMeeting, setNewMeeting] = useState({ company: '', date: '', time: '', duration: '' });
  const [showMeetingForm, setShowMeetingForm] = useState(false);

  // Refs for focusing inputs
  const projectInputRef = useRef(null);
  const taskInputRef = useRef(null);
  const meetingInputRef = useRef(null);

  // Functions for handling interactions
  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProject.name && newProject.description) {
      const addedProject = {
        ...newProject,
        owner: 'You',
        status: 'ACTIVE',
        priority: 'PENDING',
        payment: 'PENDING'
      };
      setProjects([...projects, addedProject]);
      setNewProject({ name: '', description: '' });
      setShowProjectForm(false);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleAddMeeting = (e) => {
    e.preventDefault();
    if (newMeeting.company && newMeeting.date && newMeeting.time) {
      setMeetings([...meetings, newMeeting]);
      setNewMeeting({ company: '', date: '', time: '', duration: '' });
      setShowMeetingForm(false);
    }
  };

  return (
    <div className="dashboard-page">
      <header className="header">
        <div className="header-left">
          <div className="page-path">Page / Dashboard</div>
          <h1 className="greeting">Hi {userName},</h1>
          <p className="subtitle">It's looking like a slow day.</p>
        </div>
        <div className="header-right">
          <div className="search-bar">
            {icons.search}
            <input
              type="text"
              placeholder="Search project or client"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-project-btn" onClick={() => setShowProjectForm(true)}>
            {icons.add} Add New Project
          </button>
          <span className="bell-icon">{icons.bell}</span>
          <div className="user-profile">
            <div className="user-info" onClick={() => setShowUserForm(!showUserForm)}>
              <span className="user-name">{userName}</span>
              <span className="user-post">{userPostName}</span>
              {/* --- MODIFIED: Use image for user icon --- */}
              <img src={userProfileImage} alt="User Profile" className="profile-image" />
              {/* --- END MODIFIED --- */}
            </div>
            {showUserForm && (
              <form className="user-form" onSubmit={handleUserUpdate}>
                <h4>Edit Profile</h4>
                <div className="form-group">
                  <label htmlFor="user-name-input">Nom:</label>
                  <input
                    id="user-name-input"
                    type="text"
                    value={tempUserName}
                    onChange={(e) => setTempUserName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-post-input">Poste Nom:</label>
                  <input
                    id="user-post-input"
                    type="text"
                    value={tempUserPostName}
                    onChange={(e) => setTempUserPostName(e.target.value)}
                    placeholder="Enter your job title"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-image-input">Photo de Profil:</label>
                  <input
                    id="profile-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="user-form-buttons">
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" className="cancel-btn" onClick={() => setShowUserForm(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="main-left">
          <div className="card welcome-card">
            <div className="welcome-text">
              <h2>Welcome, {userName}</h2>
              <p>I've Prepared A Quick Weather Report</p>
              <p>For Lagos Today,</p>
              <p>Hope You're Having A Great Day 👋</p>
            </div>
            <div className="weather-info">
              <span className="weather-icon">{icons.weather}</span>
              <div className="weather-details">
                <span className="temperature">Outdoor Temperature: <strong>35°C</strong></span>
                <span className="condition">Light Raining</span>
              </div>
            </div>
          </div>

          <div className="card latest-projects-card">
            <div className="card-header">
              <h2>Latest Projects</h2>
              <div className="card-controls">
                <select>
                  <option>Status</option>
                </select>
                <select>
                  <option>active</option>
                </select>
              </div>
            </div>
            {showProjectForm && (
              <form onSubmit={handleAddProject} className="add-project-form">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  ref={projectInputRef}
                  autoFocus
                />
                <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                ></textarea>
                <button type="submit">Add Project</button>
                <button type="button" onClick={() => setShowProjectForm(false)}>Cancel</button>
              </form>
            )}
            {filteredProjects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <div className={`status-tag status-${project.status.toLowerCase()}`}>{project.status}</div>
                </div>
                <div className="project-details">
                  <p>Owner: {project.owner}</p>
                  <p>Status: {project.status}</p>
                  <p>Priority: {project.priority}</p>
                  <p>Payment: {project.payment}</p>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="main-right">
          <div className="card next-meetings-card">
            <div className="card-header">
              <h2>Next Coming Meetings</h2>
              <button onClick={() => setShowMeetingForm(true)}>{icons.add}</button>
            </div>
            {showMeetingForm && (
              <form onSubmit={handleAddMeeting} className="add-meeting-form">
                <input
                  type="text"
                  placeholder="Company"
                  value={newMeeting.company}
                  onChange={(e) => setNewMeeting({ ...newMeeting, company: e.target.value })}
                  ref={meetingInputRef}
                  autoFocus
                />
                <input
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                />
                <input
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., 30min)"
                  value={newMeeting.duration}
                  onChange={(e) => setNewMeeting({ ...newMeeting, duration: e.target.value })}
                />
                <button type="submit">Add Meeting</button>
                <button type="button" onClick={() => setShowMeetingForm(false)}>Cancel</button>
              </form>
            )}
            {meetings.map((meeting, index) => (
              <div key={index} className="meeting-item">
                <span className="meeting-icon">{icons.user}</span>
                <div className="meeting-info">
                  <span className="company">{meeting.company}</span>
                  <span className="date">{meeting.date}</span>
                  <span className="time">{meeting.time}</span>
                  <span className="duration">{meeting.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="card create-task-card">
            <h2>Create New Task</h2>
            <div className="add-task-container">
              <input
                type="text"
                placeholder="New task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                ref={taskInputRef}
              />
              <button className="add-task-btn" onClick={handleAddTask}>
                {icons.add}
              </button>
            </div>
            <ul className="task-list">
              {tasks.map((task, index) => (
                <li key={index}>
                  <input type="checkbox" />
                  <span>{task.text}</span>
                  <button className="delete-task" onClick={() => handleDeleteTask(index)}>✖</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="card todo-card">
            <h2>ToDo</h2>
            {todos.map((todo, index) => (
              <div key={index} className="todo-item">
                <span className={`todo-status-tag status-${todo.status.toLowerCase()}`}>{todo.status}</span>
                <h4>{todo.title}</h4>
                <p>{todo.description}</p>
                <div className="todo-meta">
                  <span>💬 {todo.comments}</span>
                  <span>👍 {todo.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;