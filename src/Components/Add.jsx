import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import SchemaForm from './SchemaForm'
import DuplicateFieldDialog from './DuplicateFieldDialog'

const Add = ({ onAddField, isNestedMode, currentNestedParent, onExitNestedMode, isFieldNameExists }) => {
  const [fieldName, setFieldName] = useState('')
  const [fieldType, setFieldType] = useState('')
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false)
  const [duplicateError, setDuplicateError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check for duplicate field name
    const parentId = isNestedMode ? currentNestedParent.id : null
    if (isFieldNameExists(fieldName, parentId)) {
      setDuplicateError(`Field name "${fieldName}" already exists${isNestedMode ? ` in "${currentNestedParent.name}"` : ''}`)
      setShowDuplicateDialog(true)
      return
    }
    
    // Call the parent function to add the field to schema
    const result = onAddField(fieldName, fieldType, parentId)
    
    if (result && result.success) {
      // Reset form only on success
      setFieldName('')
      setFieldType('')
    }
  }

  const handleDuplicateDialogClose = () => {
    setShowDuplicateDialog(false)
    setDuplicateError('')
  }

  const handleFieldNameChange = (e) => setFieldName(e.target.value)
  const handleFieldTypeChange = (value) => setFieldType(value)

  if (isNestedMode) {
    return (
      <>
        <Card className="max-w-md mx-auto border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-orange-800">Add to Nested Object</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onExitNestedMode}
                className="text-orange-600 border-orange-300 hover:bg-orange-100"
              >
                Exit Nested
              </Button>
            </div>
            <p className="text-sm text-orange-600">
              Adding fields to: <span className="font-mono font-semibold">"{currentNestedParent.name}"</span>
            </p>
          </CardHeader>
          <CardContent>
            <SchemaForm
              fieldName={fieldName}
              fieldType={fieldType}
              onFieldNameChange={handleFieldNameChange}
              onFieldTypeChange={handleFieldTypeChange}
              onSubmit={handleSubmit}
              isDisabled={!fieldName || !fieldType}
            />
          </CardContent>
        </Card>

        <DuplicateFieldDialog
          isOpen={showDuplicateDialog}
          onOpenChange={setShowDuplicateDialog}
          errorMessage={duplicateError}
          onClose={handleDuplicateDialogClose}
        />
      </>
    )
  }

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Add New Field</CardTitle>
        </CardHeader>
        <CardContent>
          <SchemaForm
            fieldName={fieldName}
            fieldType={fieldType}
            onFieldNameChange={handleFieldNameChange}
            onFieldTypeChange={handleFieldTypeChange}
            onSubmit={handleSubmit}
            isDisabled={!fieldName || !fieldType}
          />
        </CardContent>
      </Card>

      <DuplicateFieldDialog
        isOpen={showDuplicateDialog}
        onOpenChange={setShowDuplicateDialog}
        errorMessage={duplicateError}
        onClose={handleDuplicateDialogClose}
      />
    </>
  )
}

export default Add