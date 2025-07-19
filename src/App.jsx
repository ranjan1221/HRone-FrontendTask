import React, { useState } from 'react'
import Show from './Components/Show'
import Add from './Components/Add'

const App = () => {
  const [schema, setSchema] = useState([])
  const [isNestedMode, setIsNestedMode] = useState(false)
  const [currentNestedParent, setCurrentNestedParent] = useState(null)

  // Function to check if field name already exists
  const isFieldNameExists = (fieldName, parentId = null) => {
    const checkInLevel = (fields) => {
      return fields.some(field => {
        if (field.name === fieldName) return true
        if (field.children) {
          return checkInLevel(field.children)
        }
        return false
      })
    }
    
    if (parentId) {
      // Check only within the specific nested object
      const findNestedObject = (fields) => {
        for (const field of fields) {
          if (field.id === parentId) {
            return field.children ? field.children.some(child => child.name === fieldName) : false
          }
          if (field.children) {
            const found = findNestedObject(field.children)
            if (found) return found
          }
        }
        return false
      }
      return findNestedObject(schema)
    } else {
      // Check in root level
      return checkInLevel(schema)
    }
  }

  const addFieldToSchema = (fieldName, fieldType, parentId = null) => {
    // Check for duplicate field name
    if (isFieldNameExists(fieldName, parentId)) {
      return { success: false, error: 'Field name already exists' }
    }

    // Set default values based on type
    let defaultValue = null
    if (fieldType === 'string') {
      defaultValue = ''
    } else if (fieldType === 'number') {
      defaultValue = 0
    }

    const newField = {
      id: Date.now() + Math.random(),
      name: fieldName,
      type: fieldType,
      defaultValue: defaultValue,
      parentId: parentId,
      children: fieldType === 'nested' ? [] : null
    }
    
    if (parentId) {
      // Add to nested object
      setSchema(prevSchema => {
        const updateNestedField = (fields) => {
          return fields.map(field => {
            if (field.id === parentId) {
              return { ...field, children: [...(field.children || []), newField] }
            }
            if (field.children) {
              return { ...field, children: updateNestedField(field.children) }
            }
            return field
          })
        }
        return updateNestedField(prevSchema)
      })
    } else {
      // Add to root level
      setSchema([...schema, newField])
    }
    
    return { success: true }
  }

  const removeFieldFromSchema = (fieldId) => {
    setSchema(prevSchema => {
      const removeFromLevel = (fields) => {
        return fields.filter(field => {
          if (field.id === fieldId) return false
          if (field.children) {
            field.children = removeFromLevel(field.children)
          }
          return true
        })
      }
      return removeFromLevel(prevSchema)
    })
  }

  const updateField = (fieldId, updates) => {
    setSchema(prevSchema => {
      const updateInLevel = (fields) => {
        return fields.map(field => {
          if (field.id === fieldId) {
            // Update default value when type changes
            let updatedField = { ...field, ...updates }
            if (updates.type && updates.type !== 'nested') {
              updatedField.defaultValue = updates.type === 'string' ? '' : 0
            }
            return updatedField
          }
          if (field.children) {
            return { ...field, children: updateInLevel(field.children) }
          }
          return field
        })
      }
      return updateInLevel(prevSchema)
    })
  }

  const enterNestedMode = (parentField) => {
    setIsNestedMode(true)
    setCurrentNestedParent(parentField)
  }

  const exitNestedMode = () => {
    setIsNestedMode(false)
    setCurrentNestedParent(null)
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className="text-center mb-8">
          <h1 className='text-2xl font-semibold text-gray-700 mb-4'>
            HRone Frontend task
          </h1>
          <h2 className='text-4xl font-bold text-gray-900 mb-2'>
            Schema Builder
          </h2>
          <p className="text-gray-600">
            Create and manage your data schemas with ease
          </p>
        </div>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className="space-y-4">
            <Add 
              onAddField={addFieldToSchema} 
              isNestedMode={isNestedMode}
              currentNestedParent={currentNestedParent}
              onExitNestedMode={exitNestedMode}
              isFieldNameExists={isFieldNameExists}
            />
          </div>
          <div className="space-y-4">
            <Show 
              schema={schema} 
              onRemoveField={removeFieldFromSchema}
              onUpdateField={updateField}
              onAddField={addFieldToSchema}
              onEnterNestedMode={enterNestedMode}
              isNestedMode={isNestedMode}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App