import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('app_user_profile');
    return saved ? JSON.parse(saved) : {
      fullName: 'Menna Khaled',
      email: 'menna.khaled@example.com',
      track: 'Front-End Development',
      currentPhase: 'React Fundamentals',
      bio: 'Computer Science student passionate about building modern web applications with React.',
      avatarUrl: ''
    };
  });

  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  useEffect(() => {
    localStorage.setItem('app_user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('app_tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      const total = parsedTasks.length;
      const completed = parsedTasks.filter(t => t.status === 'Done').length;
      setTaskStats({ total, completed });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    toast.success("Profile Updated successfully!");
  };

  return (
    <div style={{ 
      padding: '20px 15px', 
      maxWidth: '900px', 
      margin: '0 auto', 
      fontFamily: 'sans-serif',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      
      {/* Header Banner - Responsive */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justify: 'space-between',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
          {profile.avatarUrl ? (
            <img 
              src={profile.avatarUrl} 
              alt="Profile" 
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #cbd5e1'
              }}
            />
          ) : (
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#1e293b',
              color: '#fff',
              display: 'flex',
              justify: 'center',
              alignItems: 'center',
              fontSize: '28px',
              fontWeight: 'bold'
            }}>
              {profile.fullName.charAt(0)}
            </div>
          )}

          <div>
            <h1 style={{ margin: 0, color: '#0f172a', fontSize: '20px' }}>{profile.fullName}</h1>
            <p style={{ margin: '4px 0', color: '#64748b', fontSize: '13px' }}>{profile.track}</p>
            <span style={{
              fontSize: '11px',
              backgroundColor: '#e0f2fe',
              color: '#0369a1',
              padding: '3px 8px',
              borderRadius: '12px',
              fontWeight: '500',
              display: 'inline-block'
            }}>
              Active Student
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setFormData({ ...profile });
            setIsEditing(!isEditing);
          }}
          style={{
            backgroundColor: isEditing ? '#f1f5f9' : '#1e293b',
            color: isEditing ? '#475569' : '#fff',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            width: '100%',
            maxWidth: '130px'
          }}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Overview or Edit Form */}
      {isEditing ? (
        <form onSubmit={handleSave} style={{
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ marginTop: 0, color: '#0f172a', fontSize: '16px', marginBottom: '15px' }}>Edit Information</h2>
          
          {/* Image Upload Input */}
          <div style={{ marginBottom: '15px', padding: '12px', border: '1px dashed #cbd5e1', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '6px' }}>
              Profile Picture
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                style={{ fontSize: '12px', width: '100%' }}
              />
              {formData.avatarUrl && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, avatarUrl: '' }))}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                >
                  Remove Picture
                </button>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Learning Track</label>
              <input
                type="text"
                name="track"
                value={formData.track}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Current Phase</label>
              <input
                type="text"
                name="currentPhase"
                value={formData.currentPhase}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Bio</label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px'
            }}
          >
            Save Changes
          </button>
        </form>
      ) : (
        /* Main Layout - Auto Adapts on Mobile */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          
          {/* Main Profile Info */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ marginTop: 0, color: '#0f172a', fontSize: '16px', marginBottom: '12px' }}>About Me</h2>
            <p style={{ color: '#475569', lineHeight: '1.6', fontSize: '13px', marginBottom: '20px' }}>{profile.bio}</p>

            <h3 style={{ color: '#0f172a', fontSize: '14px', marginBottom: '10px' }}>Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', flexWrap: 'wrap', gap: '5px' }}>
                <span style={{ color: '#64748b' }}>Email:</span>
                <span style={{ fontWeight: '500', color: '#0f172a', wordBreak: 'break-all' }}>{profile.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px', flexWrap: 'wrap', gap: '5px' }}>
                <span style={{ color: '#64748b' }}>Current Learning Phase:</span>
                <span style={{ fontWeight: '500', color: '#0f172a' }}>{profile.currentPhase}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0f172a' }}>Task Completion</h3>
              <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#2563eb' }}>
                {taskStats.completed} / {taskStats.total}
              </p>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Tasks completed in Student Hub</span>
            </div>

            <div style={{
              backgroundColor: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#0f172a' }}>Phase Progress</h3>
              <div style={{ backgroundColor: '#f1f5f9', borderRadius: '10px', height: '8px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{ backgroundColor: '#10b981', width: '55%', height: '100%' }}></div>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>55% completed for {profile.currentPhase}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}