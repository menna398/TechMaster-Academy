import React, { useState, useEffect } from 'react';

export default function Resources() {
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('app_resources');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'React Documentation', category: 'Docs', url: 'https://react.dev', description: 'Official React docs with interactive tutorials.' },
      { id: 2, title: 'JS Info', category: 'Guide', url: 'https://javascript.info', description: 'Modern JavaScript tutorial from basics to advanced.' },
      { id: 3, title: 'Tailwind CSS Docs', category: 'Docs', url: 'https://tailwindcss.com', description: 'Utility-first CSS framework documentation.' }
    ];
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Docs');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('app_resources', JSON.stringify(resources));
  }, [resources]);

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const newRes = {
      id: Date.now(),
      title,
      category,
      url: url.startsWith('http') ? url : `https://${url}`,
      description
    };

    setResources([newRes, ...resources]);
    setTitle('');
    setUrl('');
    setDescription('');
    setCategory('Docs');
  };

  const handleDelete = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(search.toLowerCase()) || 
    res.description.toLowerCase().includes(search.toLowerCase()) ||
    res.category.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1 style={{ margin: '0 0 6px 0', fontSize: '22px', color: '#0f172a' }}>Learning Resources</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>Bookmark and organize your study links & docs.</p>
      </div>

      {/* Add Resource Form */}
      <form onSubmit={handleAddResource} style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '18px',
        marginBottom: '25px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '15px', color: '#0f172a', marginBottom: '12px' }}>Add New Resource</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '12px',
          marginBottom: '12px' 
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Title *</label>
            <input 
              type="text" 
              placeholder="e.g. React Docs" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>URL *</label>
            <input 
              type="text" 
              placeholder="https://..." 
              value={url} 
              onChange={e => setUrl(e.target.value)}
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
              <option value="Docs">Docs</option>
              <option value="Guide">Guide</option>
              <option value="Video">Video</option>
              <option value="Tool">Tool</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Description</label>
          <input 
            type="text" 
            placeholder="Short note about this resource..." 
            value={description} 
            onChange={e => setDescription(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box' }}
          />
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
          maxWidth: '160px'
        }}>
          + Save Resource
        </button>
      </form>

      {/* Search Bar Only (No category buttons) */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search resources by title, description or category..." 
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

      {/* Resources Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
        gap: '15px' 
      }}>
        {filteredResources.map(res => (
          <div key={res.id} style={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  textTransform: 'uppercase'
                }}>
                  {res.category}
                </span>

                <button 
                  onClick={() => handleDelete(res.id)}
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', padding: 0 }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>

              <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#0f172a', wordBreak: 'break-word' }}>
                {res.title}
              </h3>

              <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
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
                backgroundColor: '#f8fafc',
                color: '#2563eb',
                border: '1px solid #e2e8f0',
                padding: '7px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                textDecoration: 'none',
                wordBreak: 'break-all'
              }}
            >
              Visit Link ↗
            </a>
          </div>
        ))}

        {filteredResources.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', fontSize: '13px', padding: '30px 0' }}>
            No resources found.
          </p>
        )}
      </div>

    </div>
  );
}
