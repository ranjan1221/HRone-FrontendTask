import React, { useState } from 'react'
import SchemaView from './SchemaView'

const Show = ({ schema, onRemoveField, onUpdateField, onAddField, onEnterNestedMode, isNestedMode }) => {
  const [activeTab, setActiveTab] = useState('visual')
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [editType, setEditType] = useState('name') // 'name' or 'type'

  const startEditing = (fieldId, currentValue, type) => {
    setEditingField(fieldId)
    setEditValue(currentValue)
    setEditType(type)
  }

  const saveEdit = () => {
    if (editingField && editValue.trim()) {
      const updates = editType === 'name' ? { name: editValue.trim() } : { type: editValue.trim() }
      onUpdateField(editingField, updates)
    }
    setEditingField(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingField(null)
    setEditValue('')
  }

  return (
    <SchemaView
      schema={schema}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      editingField={editingField}
      editValue={editValue}
      editType={editType}
      onStartEditing={startEditing}
      onSaveEdit={saveEdit}
      onCancelEdit={cancelEdit}
      onRemoveField={onRemoveField}
      onEnterNestedMode={onEnterNestedMode}
      isNestedMode={isNestedMode}
    />
  )
}

export default Show