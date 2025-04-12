"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PhishingDetectorForm() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [scanMode, setScanMode] = useState("standard") // standard, advanced, forensic

  function validateUrl(value) {
    // Basic URL validation
    try {
      new URL(value)
      return true
    } catch (e) {
      try {
        // Try adding https:// prefix and check again
        new URL(`https://${value}`)
        return true
      } catch (e) {
        return false
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (!url.trim()) {
      setError("URL is required")
      return
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)

    // Format the URL properly
    let formattedUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = `https://${url}`
    }

    // In a real application, you would send this to your API
    // For demo purposes, we'll just redirect to the results page
    const encodedUrl = encodeURIComponent(formattedUrl)
    router.push(`/results?url=${encodedUrl}&mode=${scanMode}`)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: "4px",
              border: error ? "1px solid #ef4444" : "1px solid #333",
              fontSize: "1rem",
              outline: "none",
              backgroundColor: "#2a2a2a",
              color: "#e4e4e4",
              ":focus": {
                borderColor: "#22c55e",
                boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.2)",
              },
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              backgroundColor: "#22c55e",
              color: "white",
              borderRadius: "4px",
              border: "none",
              fontWeight: "medium",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            )}
            <span>Analyze</span>
          </button>
        </div>
        {error && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "4px" }}>{error}</p>}
      </div>
     
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </form>
  )
}
