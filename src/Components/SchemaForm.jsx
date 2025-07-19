import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'

const SchemaForm = ({ 
  fieldName, 
  fieldType, 
  onFieldNameChange, 
  onFieldTypeChange, 
  onSubmit, 
  isDisabled 
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fieldName">Field Name</Label>
        <Input
          id="fieldName"
          value={fieldName}
          onChange={onFieldNameChange}
          placeholder="Enter field name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fieldType">Field Type</Label>
        <Select value={fieldType} onValueChange={onFieldTypeChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="nested">Nested</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isDisabled}
      >
        + Add Item
      </Button>
    </form>
  )
}

export default SchemaForm 