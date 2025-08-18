// src/components/layout/Header.tsx
'use client';

import { SearchBar } from './SearchBar';
import { QuickStats } from './QuickStats';
import { NotificationBell } from './NotificationBell';
import { UserProfile } from './UserProfile';

export function Header() {
  return (
    <header className="glass-panel flex h-20 items-center mx-4 mt-4 mb-6 px-6">
      <SearchBar />
      <div className="ml-auto flex items-center space-x-6">
        <QuickStats />
        <NotificationBell />
        <UserProfile />
      </div>
    </header>
  );
}