import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const FieldItem = ({ 
  field, 
  level = 0, 
  isEditing, 
  editValue, 
  editType, 
  onStartEditing, 
  onSaveEdit, 
  onCancelEdit, 
  onRemoveField, 
  onEnterNestedMode, 
  isNestedMode 
}) => {
  const indent = level * 20

  return (
    <div style={{ marginLeft: `${indent}px` }}>
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center space-x-2">
          {/* Field Name */}
          {isEditing && editType === 'name' ? (
            <div className="flex items-center space-x-1">
              <Input
                value={editValue}
                onChange={(e) => onStartEditing(field.id, e.target.value, 'name')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSaveEdit()
                  if (e.key === 'Escape') onCancelEdit()
                }}
                className="w-32 h-6 text-sm"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={onSaveEdit} className="h-6 w-6 p-0 text-green-600">✓</Button>
              <Button size="sm" variant="ghost" onClick={onCancelEdit} className="h-6 w-6 p-0 text-red-600">✗</Button>
            </div>
          ) : (
            <span 
              className="text-blue-600 cursor-pointer hover:bg-blue-50 px-1 rounded"
              onDoubleClick={() => onStartEditing(field.id, field.name, 'name')}
              title="Double-click to edit"
            >
              "{field.name}"
            </span>
          )}
          
          <span className="text-gray-500">: </span>
          
          {/* Field Type */}
          {isEditing && editType === 'type' ? (
            <div className="flex items-center space-x-1">
              <Select value={editValue} onValueChange={(value) => onStartEditing(field.id, value, 'type')}>
                <SelectTrigger className="w-24 h-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">string</SelectItem>
                  <SelectItem value="number">number</SelectItem>
                  <SelectItem value="nested">nested</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="ghost" onClick={onSaveEdit} className="h-6 w-6 p-0 text-green-600">✓</Button>
              <Button size="sm" variant="ghost" onClick={onCancelEdit} className="h-6 w-6 p-0 text-red-600">✗</Button>
            </div>
          ) : (
            <span 
              className="text-green-600 cursor-pointer hover:bg-green-50 px-1 rounded"
              onDoubleClick={() => onStartEditing(field.id, field.type, 'type')}
              title="Double-click to edit"
            >
              {field.type === 'string' || field.type === 'number' 
                ? `"${field.defaultValue !== null ? field.defaultValue : (field.type === 'string' ? '' : 0)}"`
                : `"${field.type}"`
              }
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          {/* Modify Button */}
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStartEditing(field.id, field.name, 'name')}
              className="text-blue-600 border-blue-300 hover:bg-blue-50 h-6 px-2 text-xs"
              title="Modify field"
            >
              Modify
            </Button>
          )}
          
          {/* Nested Button (for nested objects) */}
          {field.type === 'nested' && !isNestedMode && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEnterNestedMode(field)}
              className="text-orange-600 border-orange-300 hover:bg-orange-50 h-6 px-2 text-xs"
              title="Enter nested mode to add fields"
            >
              Nested
            </Button>
          )}
          
          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveField(field.id)}
            className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
            title="Delete field"
          >
            🗑️
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FieldItem 