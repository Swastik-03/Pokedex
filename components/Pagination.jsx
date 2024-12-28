import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-full bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-full bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
      >
        Next
        <ChevronRight className="w-5 h-5 ml-1" />
      </button>
    </div>
  )
}

