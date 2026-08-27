import React, { useState, useEffect } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('app_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Finish React Hooks lesson', priority: 'High', status: 'In Progress' },
      { id: 2, title: 'Submit Portfolio project', priority: 'Medium', status: 'Pending' },
      { id: 3, title: 'Review JavaScript ES6+', priority: 'Low', status: 'Done' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // CRUD Operations
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, title: taskTitle, priority } : t));
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        priority: priority,
        status: 'Pending'
      };
      setTasks([newTask, ...tasks]);
    }
    setTaskTitle('');
    setPriority('Medium');
    setIsFormOpen(false);
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTaskTitle(task.title);
    setPriority(task.priority);
    setIsFormOpen(true);
  };

  const toggleStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Stats
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const done = tasks.filter(t => t.status === 'Done').length;

  // Search Filtering Only (No status buttons)
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityColor = (p) => {
    if (p === 'High') return '#ef4444';
    if (p === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a' }}>My Tasks</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>
            {pending + inProgress} remaining · {done} completed
          </p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setTaskTitle('');
            setIsFormOpen(!isFormOpen);
          }}
          style={{
            backgroundColor: '#1e293b',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {isFormOpen ? 'Close Form' : '+ Add Task'}
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
        {[
          { label: 'Total', count: total },
          { label: 'Pending', count: pending },
          { label: 'In Progress', count: inProgress },
          { label: 'Done', count: done }
        ].map((stat, idx) => (
          <div key={idx} style={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ margin: 0, color: '#0f172a', fontSize: '24px' }}>{stat.count}</h2>
            <span style={{ color: '#64748b', fontSize: '13px' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Form Area */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #cbd5e1',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '25px',
          display: 'flex',
          gap: '10px'
        }}>
          <input 
            type="text" 
            placeholder="Enter task title..." 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <button type="submit" style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            {editingId ? 'Update' : 'Save'}
          </button>
        </form>
      )}

      {/* Search Input Only */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}
        />
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', margin: '40px 0' }}>No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} style={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '15px 20px',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: getPriorityColor(task.priority)
                }}></span>
                <span style={{
                  fontWeight: '500',
                  color: task.status === 'Done' ? '#94a3b8' : '#0f172a',
                  textDecoration: task.status === 'Done' ? 'line-through' : 'none'
                }}>
                  {task.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: getPriorityColor(task.priority),
                  padding: '3px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#f8fafc'
                }}>
                  {task.priority}
                </span>

                <select 
                  value={task.status} 
                  onChange={(e) => toggleStatus(task.id, e.target.value)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px'
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <button 
                  onClick={() => handleEdit(task)}
                  style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '13px' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}