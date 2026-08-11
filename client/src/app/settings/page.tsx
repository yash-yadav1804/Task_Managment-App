'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import TopBar from '../../components/layout/TopBar';
import { Button } from '../../components/ui/Button';
import { api } from '../../lib/api';

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMsg('');
    try {
      await api.patch('/users/profile', { name, title });
      setSuccessMsg('Profile updated successfully!');
      // Force reload to update user context (simple approach)
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-outer)]">
      <TopBar title="Settings" />
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-xl mx-auto bg-[var(--bg)] border border-[var(--border)] rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-[var(--border)] bg-[var(--bg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-[var(--border)] bg-[var(--bg-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
            
            <div className="pt-4 flex items-center gap-4">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              {successMsg && <span className="text-green-500 text-sm">{successMsg}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
