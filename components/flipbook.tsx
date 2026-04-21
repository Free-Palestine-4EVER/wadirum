"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, BookOpen, X, ZoomIn, ZoomOut } from "lucide-react"

const bookPages = [
  { src: "/book/IMG_4115.jpg", alt: "Cover - Wadi Rum Destination Guide" },
  { src: "/book/IMG_4116.jpg", alt: "Pages 1-2 - Desert Ecstasy" },
  { src: "/book/IMG_4117.jpg", alt: "Pages 3-4 - Map of Jordan & Location" },
  { src: "/book/IMG_4118.jpg", alt: "Pages 5-6 - Transportation & Conservation" },
  { src: "/book/IMG_4119.jpg", alt: "Pages 7-8 - Conservation & Visitors Center" },
  { src: "/book/IMG_4120.jpg", alt: "Pages 9-10 - Visitors Center & Community" },
  { src: "/book/IMG_4121.jpg", alt: "Pages 11-12 - Vertical Landscape & History of IRAM" },
  { src: "/book/IMG_4122.jpg", alt: "Pages 13-14 - History & Inscriptions" },
  { src: "/book/IMG_4123.jpg", alt: "Pages 15-16 - A Living Desert & Wildlife" },
  { src: "/book/IMG_4125.jpg", alt: "Pages 17-18 - Exercise with Nature" },
  { src: "/book/IMG_4126.jpg", alt: "Pages 19-20 - Sites and Stories" },
  { src: "/book/IMG_4127.jpg", alt: "Pages 21-22 - Attractions & Sites" },
  { src: "/book/IMG_4128.jpg", alt: "Pages 23-24 - Springs & Rock Bridges" },
  { src: "/book/IMG_4129.jpg", alt: "Pages 25-26 - Wadi Rum Map" },
  { src: "/book/IMG_4130.jpg", alt: "Pages 27-28 - Activities & Adventures" },
  { src: "/book/IMG_4131.jpg", alt: "Pages 29-30 - Stargazing & Rules" },
]

export function FlipBook() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next")
  const [isZoomed, setIsZoomed] = useState(false)

  const totalPages = bookPages.length

  const goToPage = useCallback(
    (direction: "next" | "prev") => {
      if (isFlipping) return
      if (direction === "next" && currentPage >= totalPages - 1) return
      if (direction === "prev" && currentPage <= 0) return

      setIsFlipping(true)
      setFlipDirection(direction)

      setTimeout(() => {
        setCurrentPage((prev) => (direction === "next" ? prev + 1 : prev - 1))
        setIsFlipping(false)
      }, 400)
    },
    [isFlipping, currentPage, totalPages]
  )

  const openBook = () => {
    setIsOpen(true)
    setCurrentPage(0)
    setIsZoomed(false)
    document.body.style.overflow = "hidden"
  }

  const closeBook = () => {
    setIsOpen(false)
    setIsZoomed(false)
    document.body.style.overflow = ""
  }

  return (
    <>
      {/* Book Preview Card */}
      <div
        onClick={openBook}
        className="group cursor-pointer relative mx-auto max-w-sm"
      >
        {/* Book shadow effect */}
        <div className="absolute -bottom-3 left-4 right-4 h-6 bg-black/20 rounded-full blur-lg" />

        {/* Book */}
        <div className="relative bg-gradient-to-r from-amber-900 to-amber-800 rounded-r-lg rounded-l-sm shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
          {/* Spine effect */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-950 to-amber-900 z-10" />
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-amber-700/50 z-10" />

          <Image
            src={bookPages[0].src}
            alt="Wadi Rum Destination Guide"
            width={400}
            height={560}
            className="w-full h-auto"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-4 shadow-lg">
              <BookOpen className="w-8 h-8 text-amber-700" />
            </div>
          </div>
        </div>

        <p className="text-center mt-4 text-amber-700 font-semibold group-hover:text-amber-600 transition-colors">
          Click to read the guide
        </p>
      </div>

      {/* Fullscreen Reader Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/50 text-white">
            <h3 className="text-sm font-medium">
              Wadi Rum Destination Guide
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <button
                onClick={closeBook}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close book"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Book Content */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4">
            {/* Previous button */}
            <button
              onClick={() => goToPage("prev")}
              disabled={currentPage === 0 || isFlipping}
              className="absolute left-2 md:left-6 z-20 p-2 md:p-3 bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed rounded-full transition-all text-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Page display */}
            <div
              className={`relative transition-transform duration-300 ${
                isZoomed ? "scale-100 md:scale-110 cursor-grab" : ""
              }`}
              style={{ perspective: "1200px" }}
            >
              <div
                className={`relative transition-all duration-400 ${
                  isFlipping
                    ? flipDirection === "next"
                      ? "animate-flip-next"
                      : "animate-flip-prev"
                    : ""
                }`}
              >
                <Image
                  src={bookPages[currentPage].src}
                  alt={bookPages[currentPage].alt}
                  width={1200}
                  height={850}
                  className={`max-h-[75vh] md:max-h-[80vh] w-auto mx-auto rounded-sm shadow-2xl ${
                    isZoomed ? "max-h-[90vh]" : ""
                  }`}
                  priority
                />
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={() => goToPage("next")}
              disabled={currentPage === totalPages - 1 || isFlipping}
              className="absolute right-2 md:right-6 z-20 p-2 md:p-3 bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed rounded-full transition-all text-white"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          {/* Page dots / progress */}
          <div className="py-3 px-4 bg-black/50">
            <div className="flex justify-center items-center gap-1 max-w-md mx-auto">
              {bookPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isFlipping) setCurrentPage(i)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "bg-amber-500 w-6"
                      : "bg-white/30 hover:bg-white/50 w-1.5"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes flipNext {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(-15deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
        @keyframes flipPrev {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          50% {
            transform: rotateY(15deg);
            opacity: 0.7;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
        .animate-flip-next {
          animation: flipNext 0.4s ease-in-out;
        }
        .animate-flip-prev {
          animation: flipPrev 0.4s ease-in-out;
        }
      `}</style>
    </>
  )
}
