"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ImageUploadAnalyzer() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [scanMode, setScanMode] = useState("standard") // standard, advanced, forensic
  const fileInputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // Clear any previous analyzed image when the component mounts
    localStorage.removeItem("analyzedImage")
  }, [])

  const handleImageChange = (e) => {
    setError("")
    const file = e.target.files[0]

    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    setImage(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange({ target: { files: e.dataTransfer.files } })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!image) {
      setError("Please upload an image to analyze")
      return
    }

    setIsLoading(true)

    // Store the image in localStorage for the results page
    if (preview) {
      localStorage.setItem("analyzedImage", preview)
    }

    // In a real application, you would upload the image to your server
    // For demo purposes, we'll just redirect to the results page
    setTimeout(() => {
      router.push(`/image-analysis?mode=${scanMode}`)
    }, 2000)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          border: "2px dashed #333",
          borderRadius: "8px",
          padding: "30px 20px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
          cursor: "pointer",
        }}
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {preview ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "4px",
                objectFit: "contain",
              }}
            />
            <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>Click or drag to replace the image</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <div>
              <p style={{ color: "#e4e4e4", fontWeight: "medium", marginBottom: "4px" }}>
                Drag and drop an image here, or click to browse
              </p>
              <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                Upload screenshots of suspicious messages, websites, or QR codes
              </p>
            </div>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>{error}</p>}


      <button
        onClick={handleSubmit}
        disabled={isLoading || !image}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "12px 20px",
          backgroundColor: "#22c55e",
          color: "white",
          borderRadius: "4px",
          border: "none",
          fontWeight: "medium",
          cursor: isLoading || !image ? "not-allowed" : "pointer",
          opacity: isLoading || !image ? 0.7 : 1,
        }}
      >
        {isLoading ? (
          <div
            style={{
              width: "16px",
              height: "16px",
              border: "2px solid #ffffff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0z"></path>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        )}
        <span>{isLoading ? "Analyzing..." : "Analyze Image"}</span>
      </button>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
