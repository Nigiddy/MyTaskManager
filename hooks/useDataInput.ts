/**
 * hooks/useDataInput.ts
 * Owns the data entry CRUD state: entries, form data, add, edit, delete.
 */
import { useState } from 'react';
import type { DataEntry, DataSection } from '@/types';

export function useDataInput(currentSection: DataSection | undefined) {
  const [entries, setEntries] = useState<DataEntry[]>([]);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const handleInputChange = (fieldId: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (sectionId: string) => {
    if (!currentSection) return false;
    const requiredFields = currentSection.fields.filter(f => f.required);
    const hasAllRequired = requiredFields.every(f => formData[f.id]);
    if (!hasAllRequired) return false;

    if (isEditing !== null) {
      setEntries(prev =>
        prev.map(entry =>
          entry.id === isEditing
            ? { ...entry, data: formData, updatedAt: new Date() }
            : entry
        )
      );
      setIsEditing(null);
    } else {
      const newEntry: DataEntry = {
        id: Date.now(),
        sectionId,
        data: formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setEntries(prev => [newEntry, ...prev]);
    }
    setFormData({});
    return true;
  };

  const handleEdit = (entry: DataEntry) => {
    setFormData(entry.data);
    setIsEditing(entry.id);
  };

  const handleDelete = (entryId: number) => {
    setEntries(prev => prev.filter(e => e.id !== entryId));
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setFormData({});
  };

  return { entries, formData, isEditing, handleInputChange, handleSubmit, handleEdit, handleDelete, cancelEdit };
}
