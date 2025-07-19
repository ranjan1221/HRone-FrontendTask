import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import FieldItem from './FieldItem'

const SchemaView = ({ 
  schema, 
  activeTab, 
  onTabChange, 
  editingField, 
  editValue, 
  editType, 
  onStartEditing, 
  onSaveEdit, 
  onCancelEdit, 
  onRemoveField, 
  onEnterNestedMode, 
  isNestedMode 
}) => {
  const generateSimpleSchema = (fields = schema) => {
    const schemaObj = {}
    fields.forEach(field => {
      if (field.type === 'nested' && field.children) {
        schemaObj[field.name] = generateSimpleSchema(field.children)
      } else {
        // Include default value for non-nested types
        if (field.type === 'string' || field.type === 'number') {
          schemaObj[field.name] = field.defaultValue !== null ? field.defaultValue : (field.type === 'string' ? '' : 0)
        } else {
          schemaObj[field.name] = field.type
        }
      }
    })
    return schemaObj
  }

  const renderField = (field, level = 0) => {
    const isEditing = editingField === field.id

    return (
      <div key={field.id}>
        <FieldItem
          field={field}
          level={level}
          isEditing={isEditing}
          editValue={editValue}
          editType={editType}
          onStartEditing={onStartEditing}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onRemoveField={onRemoveField}
          onEnterNestedMode={onEnterNestedMode}
          isNestedMode={isNestedMode}
        />
        
        {/* Render nested children */}
        {field.type === 'nested' && field.children && field.children.length > 0 && (
          <div className="ml-4">
            {field.children.map((child, index) => (
              <div key={child.id}>
                {renderField(child, level + 1)}
                {index < field.children.length - 1 && <span className="text-gray-500">,</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderVisualSchema = () => (
    <div className="space-y-4">
      {schema.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-lg">No fields added yet</p>
          <p className="text-sm">Add fields using the form on the left</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-2">Schema:</div>
            <div className="bg-gray-50 border border-gray-200 rounded p-3 font-mono text-sm">
              {schema.map((field, index) => (
                <div key={field.id}>
                  {renderField(field)}
                  {index < schema.length - 1 && <span className="text-gray-500">,</span>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderJsonSchema = () => (
    <Card>
      <CardContent className="p-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <pre className="text-green-400 text-sm overflow-x-auto">
            <code>
              {JSON.stringify(generateSimpleSchema(), null, 2)}
            </code>
          </pre>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Schema Builder</CardTitle>
          <div className="text-sm text-gray-500">
            {schema.length} field{schema.length !== 1 ? 's' : ''}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="visual" className="flex items-center space-x-2">
              <span>👁️</span>
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center space-x-2">
              <span>📄</span>
              <span>JSON</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="mt-6">
            {renderVisualSchema()}
          </TabsContent>
          
          <TabsContent value="json" className="mt-6">
            {renderJsonSchema()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default SchemaView 