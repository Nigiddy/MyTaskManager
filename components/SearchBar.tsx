// src/components/layout/SearchBar.tsx
'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="relative flex-1 max-w-md">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
        size={20}
      />
      <Input
        type="search"
        placeholder="Search tasks, projects, or goals..."
        className="h-12 w-full rounded-full border-0 bg-transparent pl-12 text-white placeholder:text-secondary focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-opacity-50"
      />
    </div>
  );
}