# HRone Frontend Task - JSON Schema Builder

A dynamic JSON schema builder component built with React and shadcn/ui that allows users to create, edit, and manage JSON schemas through an intuitive interface.

👋👋👋👋Before reaching to onclusion please check all the features here as in the visula field you will find the button to add deleet modify and nested too but in json you will find the correct json structure  40sec of your time is worthit for me thank you.

## 🎯 Project Overview

This project is a comprehensive JSON schema builder that enables users to dynamically create and manage data schemas. Users can add fields, edit field names and types, delete fields, and create nested objects with recursive capabilities. The application provides both visual and JSON preview modes for real-time schema generation.I have made it more clean and intutive as when you add item json view and visual view in the visual view you will be able to add delete and modify if you choose nested then there will be a button appearing in the visual field named nested that will allow you to have nested json structure.

## ✨ Key Features

### 🔧 Core Functionality
- **Dynamic Field Addition**: Add new fields with custom names and types
- **Field Name Editing**: Double-click or use "Modify" button to edit field names
- **Field Type Management**: Change field types with dropdown selection
- **Field Deletion**: Remove unwanted fields with delete button
- **Nested Object Support**: Create and manage nested objects recursively
- **Duplicate Prevention**: Smart validation prevents duplicate field names


- **Visual Schema View**: Card-based layout showing field hierarchy
- **JSON Preview Tab**: Real-time JSON structure display
- **Nested Mode**: Dedicated interface for adding fields to nested objects
- **Animated Popups**: Beautiful error dialogs for duplicate field names
- **Responsive Design**: Works seamlessly on all screen sizes

### 🔄 Real-time Features
- **Live JSON Generation**: Instant JSON preview as you build
- **Dynamic Updates**: Changes reflect immediately in both views
- **Context-Aware Validation**: Checks for duplicates at appropriate levels

## 🛠️ Technologies Used

### Frontend Framework
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server

### UI Components & Styling
- **shadcn/ui**: Professional component library with consistent design
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives

## 📋 How It Works

### Project Structure
```
src/
├── App.jsx                    # Main application component with state management
├── Components/
│   ├── Add.jsx               # Form container component
│   ├── Show.jsx              # Schema display container component
│   ├── SchemaForm.jsx        # Reusable form component for adding fields
│   ├── SchemaView.jsx        # Schema display with tabs and rendering logic
│   ├── FieldItem.jsx         # Individual field rendering and editing
│   ├── DuplicateFieldDialog.jsx # Animated popup for duplicate field errors
│   └── ui/                   # shadcn/ui components
├── lib/
│   └── utils.js              # Utility functions
└── main.jsx                  # Application entry point
```

### Component Architecture

#### 🏗️ **Component Hierarchy**
```
App.jsx (State Management)
├── Add.jsx (Form Container)
│   ├── SchemaForm.jsx (Reusable Form)
│   └── DuplicateFieldDialog.jsx (Error Popup)
└── Show.jsx (Display Container)
    └── SchemaView.jsx (Schema Display)
        └── FieldItem.jsx (Individual Fields)
```

#### 📦 **Component Responsibilities**

**App.jsx**
- Global state management (schema, nested mode, validation)
- Data flow coordination between components
- Business logic for field operations

**Add.jsx**
- Form state management
- Validation handling
- Conditional rendering for nested mode

**SchemaForm.jsx**
- Reusable form component
- Field name and type inputs
- Form submission handling

**Show.jsx**
- Editing state management
- Coordination with SchemaView

**SchemaView.jsx**
- Tab management (Visual/JSON)
- Schema rendering logic
- JSON generation

**FieldItem.jsx**
- Individual field display
- Inline editing functionality
- Action buttons (Modify, Nested, Delete)

**DuplicateFieldDialog.jsx**
- Error popup display
- Animated dialog management

### State Management
The application uses React's `useState` hook for state management:
- **Schema State**: Stores the complete field structure
- **Nested Mode State**: Tracks when user is in nested object mode
- **Current Parent State**: Manages the current nested object context
- **Editing State**: Manages inline field editing

### Data Flow
1. **User Input**: User enters field name and selects type in SchemaForm
2. **Validation**: Add component checks for duplicate field names
3. **State Update**: Valid fields are added to schema state in App
4. **UI Update**: Components re-render with new data
5. **JSON Generation**: SchemaView generates real-time JSON preview

## 🎮 Usage Guide

### Adding Fields
1. **Root Level**: Use the form on the left to add fields to the main schema
2. **Nested Level**: Click "Nested" button on any nested field to enter nested mode
3. **Field Types**: Select from String, Number, or Nested types
4. **Validation**: System prevents duplicate field names with animated popup

### Editing Fields
1. **Modify Button**: Click "Modify" button to edit field name
2. **Double-click**: Double-click field name or type to edit inline
3. **Type Changes**: Changing field type automatically updates default values
4. **Save Changes**: Press Enter or click ✓ to save, Escape or ✗ to cancel

### Managing Nested Objects
1. **Enter Nested Mode**: Click "Nested" button on any nested field
2. **Add Nested Fields**: Form changes to orange theme for nested context
3. **Exit Nested Mode**: Click "Exit Nested" to return to root level
4. **Recursive Nesting**: Nested objects can contain other nested objects

### Viewing Schema
1. **Visual Tab**: See field hierarchy with color-coded types
2. **JSON Tab**: View real-time JSON structure with default values
3. **Field Count**: See total number of fields in the schema


## 📄 License

This project is created as part of the HRone Frontend task assignment.

---

**Built with ❤️ using React, shadcn/ui, and modern web technologies**
