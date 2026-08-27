import React, { useState, useEffect } from 'react';

export default function Resources() {
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('app_resources');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'React Official Documentation', url: 'https://react.dev', category: 'React', description: 'The official guide to learn React framework.' },
      { id: 2, title: 'JavaScript Info', url: 'https://javascript.info', category: 'JavaScript', description: 'Modern JavaScript tutorial from basics to advanced.' },
      { id: 3, title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com', category: 'CSS', description: 'Utility-first CSS framework for rapid UI development.' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('app_resources', JSON.stringify(resources));
  }, [resources]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('React');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const newResource = {
      id: Date.now(),
      title,
      url: url.startsWith('http') ? url : `https://${url}`,
      category,
      description
    };

    setResources([newResource, ...resources]);
    setTitle('');
    setUrl('');
    setDescription('');
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const filteredResources = resources.filter(res =>
    res.title.toLowerCase().includes(search.toLowerCase()) ||
    res.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a' }}>Learning Resources</h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>
            Save and manage your favorite study links and tools.
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
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
          {isFormOpen ? 'Close Form' : '+ Add Resource'}
        </button>
      </div>

      {/* Add Resource Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#f8fafc',
          border: '1px solid #cbd5e1',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '25px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <h2 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>Add New Resource</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Resource title (e.g., React Docs)..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
            <input 
              type="text" 
              placeholder="URL (e.g., https://react.dev)..." 
              value={url} 
              onChange={(e) => setUrl(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="React">React</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="Design">Design</option>
              <option value="General">General</option>
            </select>
            <input 
              type="text" 
              placeholder="Short description..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>

          <button type="submit" style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            alignSelf: 'flex-start'
          }}>
            Save Resource
          </button>
        </form>
      )}

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search resources by title or category..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ width: '100%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #e2e8f0', boxSizing: 'border-box' }}
        />
      </div>

      {/* Resources Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
        {filteredResources.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', gridColumn: '1 / -1', margin: '40px 0' }}>No resources found.</p>
        ) : (
          filteredResources.map(res => (
            <div key={res.id} style={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    {res.category}
                  </span>
                  <button 
                    onClick={() => handleDelete(res.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Delete
                  </button>
                </div>

                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#0f172a' }}>{res.title}</h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
                  {res.description || 'No description provided.'}
                </p>
              </div>

              <a 
                href={res.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  padding: '8px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Visit Resource ↗
              </a>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
