import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

const DuplicateFieldDialog = ({ 
  isOpen, 
  onOpenChange, 
  errorMessage, 
  onClose 
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="animate-in fade-in-0 zoom-in-95 duration-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            Duplicate Field Name
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {errorMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700"
          >
            Got it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DuplicateFieldDialog 