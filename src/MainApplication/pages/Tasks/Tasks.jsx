import React, { useState, useEffect } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('app_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Learn React Hooks', category: 'Study', priority: 'High', status: 'In Progress' },
      { id: 2, title: 'Build Dashboard Layout', category: 'Project', priority: 'Medium', status: 'Done' }
    ];
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Study');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [search, setSearch] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Study');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editStatus, setEditStatus] = useState('To Do');

  useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      category,
      priority,
      status
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setCategory('Study');
    setPriority('Medium');
    setStatus('To Do');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditStatus(task.status);
  };

  const handleSaveEdit = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, title: editTitle, category: editCategory, priority: editPriority, status: editStatus } : t
    ));
    setEditingId(null);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.category.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityColor = (p) => {
    if (p === 'High') return '#ef4444';
    if (p === 'Medium') return '#f59e0b';
    return '#10b981';
  };

  return (
    <div style={{ 
      padding: '20px 15px', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 6px 0', fontSize: '22px', color: '#0f172a' }}>Task Manager</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Organize your daily studies and project goals.</p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '25px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>Add New Task</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '12px',
          marginBottom: '15px' 
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Task Title *</label>
            <input 
              type="text" 
              placeholder="e.g. Finish React Project..." 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', backgroundColor: '#fff' }}
            >
              <option value="Study">Study</option>
              <option value="Project">Project</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Priority</label>
            <select 
              value={priority} 
              onChange={e => setPriority(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', backgroundColor: '#fff' }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', backgroundColor: '#fff' }}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <button type="submit" style={{
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          padding: '9px 18px',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '13px',
          cursor: 'pointer',
          width: '100%',
          maxWidth: '150px'
        }}>
          + Add Task
        </button>
      </form>

      {/* Search Bar Only (No filter buttons) */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search tasks by title or category..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '10px 14px', 
            borderRadius: '8px', 
            border: '1px solid #cbd5e1', 
            fontSize: '13px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Tasks List Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '15px' 
      }}>
        {filteredTasks.map(task => (
          <div key={task.id} style={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}>
            {editingId === task.id ? (
              /* Edit Mode */
              <div>
                <input 
                  type="text" 
                  value={editTitle} 
                  onChange={e => setEditTitle(e.target.value)}
                  style={{ width: '100%', padding: '6px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '8px', boxSizing: 'border-box', fontSize: '13px' }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                  <select 
                    value={editCategory} 
                    onChange={e => setEditCategory(e.target.value)}
                    style={{ padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Study">Study</option>
                    <option value="Project">Project</option>
                    <option value="Personal">Personal</option>
                  </select>

                  <select 
                    value={editPriority} 
                    onChange={e => setEditPriority(e.target.value)}
                    style={{ padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <select 
                  value={editStatus} 
                  onChange={e => setEditStatus(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '10px' }}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleSaveEdit(task.id)}
                    style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setEditingId(null)}
                    style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Normal View Mode */
              <>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '6px' }}>
                    {/* Priority Badge */}
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: getPriorityColor(task.priority),
                      backgroundColor: '#f8fafc',
                      border: `1px solid ${getPriorityColor(task.priority)}`,
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      {task.priority}
                    </span>

                    {/* Dynamic Status Badge (بدل كلمه Pending) */}
                    <span style={{
                      fontSize: '11px',
                      color: task.status === 'Done' ? '#10b981' : task.status === 'In Progress' ? '#0284c7' : '#64748b',
                      backgroundColor: task.status === 'Done' ? '#d1fae5' : task.status === 'In Progress' ? '#e0f2fe' : '#f1f5f9',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontWeight: '600'
                    }}>
                      {task.status || 'To Do'}
                    </span>
                  </div>

                  <h3 style={{ 
                    margin: '0 0 6px 0', 
                    fontSize: '15px', 
                    color: '#0f172a',
                    textDecoration: task.status === 'Done' ? 'line-through' : 'none'
                  }}>
                    {task.title}
                  </h3>

                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Category: <strong style={{ color: '#334155' }}>{task.category}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <button 
                    onClick={() => handleStartEdit(task)}
                    style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '30px 0' }}>
            No tasks found.
          </p>
        )}
      </div>

    </div>
  );
}