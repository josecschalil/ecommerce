"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 20,
}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    // Generate page numbers with ellipsis logic
    const generatePageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        // Show all pages if total pages is less than max visible
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Always include first page
        pages.push(1);

        // Calculate start and end of visible page range
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        // Adjust if we're near the beginning
        if (currentPage <= 3) {
          endPage = 4;
        }

        // Adjust if we're near the end
        if (currentPage >= totalPages - 2) {
          startPage = totalPages - 3;
        }

        // Add ellipsis after first page if needed
        if (startPage > 2) {
          pages.push("ellipsis-start");
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
          pages.push("ellipsis-end");
        }

        // Always include last page
        pages.push(totalPages);
      }

      return pages;
    };

    setPageNumbers(generatePageNumbers());
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-6 backdrop-blur-md bg-white/25 rounded-2xl border border-white/30 shadow-xl">
      {/* Items count */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} products
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg border transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-100/50 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white/60 border-gray-200 text-gray-700 hover:bg-white/80 hover:border-gray-300 hover:shadow-md"
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {pageNumbers.map((pageNumber, index) => (
          <React.Fragment key={index}>
            {pageNumber === "ellipsis-start" ||
            pageNumber === "ellipsis-end" ? (
              <span className="px-3 py-2 text-gray-500">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <button
                onClick={() => onPageChange(pageNumber)}
                className={`min-w-[40px] h-10 px-3 py-2 rounded-lg border transition-all duration-200 font-medium ${
                  currentPage === pageNumber
                    ? "bg-gray-900 border-gray-600 text-white shadow-md"
                    : "bg-white/60 border-gray-200 text-gray-700 hover:bg-white/80 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {pageNumber}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100/50 border-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white/60 border-gray-200 text-gray-700 hover:bg-white/80 hover:border-gray-300 hover:shadow-md"
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Items per page selector (optional) */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show:</span>
        <select
          onChange={(e) => onPageChange(1, parseInt(e.target.value))}
          className="bg-white/60 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          value={itemsPerPage}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>per page</span>
      </div>
    </div>
  );
};

export default Pagination;
