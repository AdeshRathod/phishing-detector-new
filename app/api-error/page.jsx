"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ApiErrorPage() {
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(15)

  // Get error details from search params
  const type = searchParams.get("type") || "unknown" // url or image
  const error = searchParams.get("error") || "No response from server"
  const mode = searchParams.get("mode") || "standard"

  // Auto-redirect countdown
  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/"
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        color: "#e4e4e4",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          borderBottom: "1px solid #333",
          backgroundColor: "rgba(18, 18, 18, 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "56px",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 600,
              textDecoration: "none",
              color: "#e4e4e4",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>PhishGuard Advanced</span>
          </Link>
        </div>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: "24px" }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>

        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#e4e4e4",
          }}
        >
          Error Occured
        </h1>

        <div
          style={{
            padding: "24px",
            backgroundColor: "#1e1e1e",
            borderRadius: "8px",
            border: "1px solid #333",
            marginBottom: "24px",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: "1.125rem",
              color: "#9ca3af",
              marginBottom: "16px",
            }}
          >
            We encountered an error while analyzing your {type === "url" ? "URL" : "image"}:
          </p>

          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#2a2a2a",
              borderRadius: "4px",
              marginBottom: "16px",
              fontFamily: "monospace",
              color: "#ef4444",
              wordBreak: "break-word",
            }}
          >
            {error}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              textAlign: "left",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#e4e4e4",
                marginBottom: "8px",
              }}
            >
              Possible reasons:
            </h3>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                paddingLeft: "20px",
                color: "#9ca3af",
              }}
            >
              <li>The analysis server is currently unavailable</li>
              <li>Your request timed out due to high server load</li>
              <li>Network connectivity issues</li>
              {type === "image" && <li>The image format may not be supported</li>}
              {type === "url" && <li>The URL may be inaccessible or invalid</li>}
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href={type === "url" ? `/results?mode=${mode}&retry=true` : `/image-analysis?mode=${mode}&retry=true`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "#22c55e",
                color: "white",
                borderRadius: "4px",
                fontWeight: "medium",
                textDecoration: "none",
              }}
            >
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
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
              </svg>
              Retry Analysis
            </Link>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#e4e4e4",
                borderRadius: "4px",
                border: "1px solid #333",
                fontWeight: "medium",
                textDecoration: "none",
              }}
            >
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
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Return Home
            </Link>
          </div>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "#9ca3af",
          }}
        >
          Redirecting to home page in <span style={{ fontWeight: "bold" }}>{countdown}</span> seconds...
        </p>
      </main>

      <footer
        style={{
          borderTop: "1px solid #333",
          padding: "24px 16px",
          backgroundColor: "#121212",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#9ca3af",
            }}
          >
            © {new Date().getFullYear()} PhishGuard Advanced. All rights reserved.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Link
              href="/privacy"
              style={{
                fontSize: "0.875rem",
                color: "#9ca3af",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: "0.875rem",
                color: "#9ca3af",
                textDecoration: "none",
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
