import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from './ui/dialog'
import { LoadingButton } from './ui/LoadingButton'

function DeleteModal({ isDeleting, showDeleteModal,   setShowDeleteModal, confirmDelete }: { 
  isDeleting: boolean, 
  showDeleteModal:boolean,
  setShowDeleteModal: (show: boolean) => void,
  confirmDelete: () => void 
}) {
  
  const [confirmationText, setConfirmationText] = useState('')

  const confirmationPhrase = 'delete my project'

  const closeDeleteModal = () => {
 
    setShowDeleteModal(false)
    setConfirmationText('')
  }

  const handleConfirmDelete = () => {
    if (confirmationText.toLowerCase() === confirmationPhrase) {
      confirmDelete()
      setConfirmationText('')
    }
    
  }

  const isConfirmationValid = confirmationText.toLowerCase() === confirmationPhrase

  return (
    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold text-gray-900">
        Delete Confirmation
        </DialogTitle>
        <DialogDescription className="mt-3 text-base leading-normal text-gray-600">
        This action cannot be undone. The link will be permanently deleted.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-6">
        <p className="text-sm leading-relaxed text-gray-700">
        To proceed, please type: <span className="font-semibold text-red-600">delete my project</span>
        </p>
        <input
        type="text"
        value={confirmationText}
        onChange={(e) => setConfirmationText(e.target.value)}
        placeholder="Type confirmation text..."
        className={`
          w-full px-4 py-2.5 rounded-md border text-base
          transition-colors duration-200
          focus:outline-none focus:ring-2
          ${isConfirmationValid 
          ? 'border-green-500 focus:ring-green-200 bg-green-50' 
          : 'border-gray-300 focus:ring-red-200 bg-white'}
        `}
        />
      </div>

      <DialogFooter className="gap-3">
        <LoadingButton
        variant="outline"
        onClick={closeDeleteModal}
        className="text-sm font-medium hover:bg-gray-100"
        >
        Cancel
        </LoadingButton>
        <LoadingButton
        loading={isDeleting}
        variant="destructive"
        onClick={handleConfirmDelete}
        disabled={!isConfirmationValid}
        className={`
          text-sm font-medium
          ${isConfirmationValid 
          ? 'bg-red-600 hover:bg-red-700' 
          : 'bg-gray-400 cursor-not-allowed'}
          text-white
        `}
        >
        {isDeleting ? 'Deleting...' : 'Delete'}
        </LoadingButton>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
