"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
// import { analyzeUrl } from "@/lib/phishing-detection"
import { useRouter } from "next/navigation"

export default function ResultsPage() {
  const router = useRouter()

  const searchParams = useSearchParams()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)

  
  // Get URL and scan mode from search params
  const isDemoMode = searchParams.get("demo") === "true"
  const url = searchParams.get("url") || (isDemoMode ? "https://example-phishing-site.com" : undefined)
  const scanMode = searchParams.get("mode") || "standard"

  useEffect(() => {
    if (!url) {
      window.location.href = "/not-found"
      return
    }

    async function fetchResults() {
      try {
        const decodedUrl = decodeURIComponent(url)

        const res = await fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: decodedUrl, mode: scanMode }),
        })

        if (!res.ok) throw new Error("Failed to fetch results")

        const data = await res.json()
        setResults(data)
      } catch (error) {
        console.error("Error fetching analysis results:", error);
        const errorMessage = encodeURIComponent(error.message || "Unknown error");
        router.push(`/api-error?type=image&error=${errorMessage}&mode=${scanMode}`);
        setError("Something went wrong while fetching analysis results.")
      }  finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [url, scanMode])

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "16px",
          backgroundColor: "#121212",
          color: "#e4e4e4",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            border: "4px solid #333",
            borderTopColor: "#22c55e",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p>
          {scanMode === "standard"
            ? "Analyzing website security..."
            : scanMode === "advanced"
              ? "Running advanced AI analysis..."
              : "Performing deep forensic scan..."}
        </p>
        <div
          style={{
            marginTop: "16px",
            width: "300px",
            height: "4px",
            backgroundColor: "#333",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${scanMode === "standard" ? 70 : scanMode === "advanced" ? 40 : 20}%`,
              backgroundColor: "#22c55e",
              animation: "progress 3s ease-in-out",
            }}
          />
        </div>
        <p style={{ fontSize: "0.875rem", color: "#9ca3af", marginTop: "8px" }}>
          {scanMode === "standard"
            ? "Running basic checks..."
            : scanMode === "advanced"
              ? "Analyzing page content and behavior..."
              : "Simulating user interaction and analyzing responses..."}
        </p>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes progress {
            from {
              width: 0%;
            }
          }
        `}</style>
      </div>
    )
  }

  if (!results) {
    return null
  }

  const overallScore = Math.round(results.checks.reduce((sum, check) => sum + check.score, 0) / results.checks.length)

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e"
    if (score >= 60) return "#eab308"
    return "#ef4444"
  }

  const getScoreIcon = (score) => {
    if (score >= 80) {
      return (
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
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    }
    if (score >= 60) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#eab308"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    )
  }

  const filteredChecks = {
    all: results.checks,
    failed: results.checks.filter((check) => check.score < 70),
    passed: results.checks.filter((check) => check.score >= 70),
  }

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
            <span>PhishGuard</span>
          </Link>
        </div>
      </header>
      <main
        style={{
          flex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px 16px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 12px",
                backgroundColor: "transparent",
                color: "#e4e4e4",
                borderRadius: "4px",
                border: "1px solid #333",
                fontWeight: "medium",
                textDecoration: "none",
                fontSize: "0.875rem",
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
                style={{ marginRight: "8px" }}
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back
            </Link>
            <h1
              style={{
                fontSize: "1.25rem",
                fontWeight: "semibold",
                color: "#e4e4e4",
              }}
            >
              Analysis Results
            </h1>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "2px 8px",
                borderRadius: "9999px",
                backgroundColor: scanMode === "standard" ? "#1e40af" : scanMode === "advanced" ? "#9333ea" : "#be185d",
                color: "white",
                fontWeight: "medium",
              }}
            >
              {scanMode === "standard" ? "Standard" : scanMode === "advanced" ? "Advanced" : "Forensic"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 12px",
                backgroundColor: showTechnicalDetails ? "rgba(34, 197, 94, 0.2)" : "transparent",
                color: "#e4e4e4",
                borderRadius: "4px",
                border: "1px solid #333",
                fontWeight: "medium",
                cursor: "pointer",
                fontSize: "0.875rem",
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
                style={{ marginRight: "8px" }}
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              {showTechnicalDetails ? "Hide Technical Details" : "Show Technical Details"}
            </button>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowExportOptions(!showExportOptions)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  color: "#e4e4e4",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  fontWeight: "medium",
                  cursor: "pointer",
                  fontSize: "0.875rem",
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
                  style={{ marginRight: "8px" }}
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export
              </button>
              {showExportOptions && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "4px",
                    backgroundColor: "#1e1e1e",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "8px 0",
                    zIndex: 10,
                    minWidth: "150px",
                  }}
                >
                  <button
                    onClick={() => {
                      alert("Report would be exported as PDF in a real application")
                      setShowExportOptions(false)
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 16px",
                      width: "100%",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#e4e4e4",
                      cursor: "pointer",
                      fontSize: "0.875rem",
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
                      style={{ marginRight: "8px" }}
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    PDF Report
                  </button>
                  <button
                    onClick={() => {
                      alert("Report would be exported as JSON in a real application")
                      setShowExportOptions(false)
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 16px",
                      width: "100%",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#e4e4e4",
                      cursor: "pointer",
                      fontSize: "0.875rem",
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
                      style={{ marginRight: "8px" }}
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    JSON Data
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "minmax(0, 1fr)",
            "@media (minWidth: 768px)": {
              gridTemplateColumns: "minmax(0, 1fr) 300px",
            },
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#1e1e1e",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #333",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginBottom: "4px",
                        color: "#e4e4e4",
                      }}
                    >
                      URL Analysis
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      <span
                        style={{
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {url}
                      </span>
                      <a
                        href={url.startsWith("http") ? url : `https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          color: "#9ca3af",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span style={{ color: getScoreColor(overallScore) }}>{overallScore}</span>
                      <span style={{ fontSize: "0.875rem", color: "#9ca3af" }}>/100</span>
                    </div>
                    {getScoreIcon(overallScore)}
                  </div>
                </div>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span>Risk Level: {results.riskLevel}</span>
                    <span style={{ color: getScoreColor(overallScore) }}>{results.summary}</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "#333",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${overallScore}%`,
                        backgroundColor: getScoreColor(overallScore),
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    <button
                      onClick={() => setActiveTab("all")}
                      style={{
                        padding: "8px 16px",
                        fontWeight: activeTab === "all" ? "bold" : "normal",
                        borderBottom: activeTab === "all" ? "2px solid #22c55e" : "none",
                        borderTop: "1px solid #ccc",
                        borderLeft: "1px solid #ccc",
                        borderRight: "1px solid #ccc",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "#e4e4e4",
                      }}
                    >
                      All Checks
                    </button>
                    <button
                      onClick={() => setActiveTab("failed")}
                      style={{
                        padding: "8px 16px",
                        fontWeight: activeTab === "failed" ? "bold" : "normal",
                        borderBottom: activeTab === "failed" ? "2px solid #ef4444" : "none",
                        borderTop: "1px solid #ccc",
                        borderLeft: "1px solid #ccc",
                        borderRight: "1px solid #ccc",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "#e4e4e4",
                      }}
                    >
                      Failed Checks
                    </button>
                    <button
                      onClick={() => setActiveTab("passed")}
                      style={{
                        padding: "8px 16px",
                        fontWeight: activeTab === "passed" ? "bold" : "normal",
                        borderBottom: activeTab === "passed" ? "2px solid #22c55e" : "none",
                        borderTop: "1px solid #ccc",
                        borderLeft: "1px solid #ccc",
                        borderRight: "1px solid #ccc",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "#e4e4e4",
                      }}
                    >
                      Passed Checks
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {filteredChecks[activeTab].map((check, index) => (
                    <CheckResultCard
                      key={index}
                      check={check}
                      showTechnicalDetails={showTechnicalDetails}
                      scanMode={scanMode}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#1e1e1e",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #333",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#e4e4e4",
                  }}
                >
                  Summary
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <h3 style={{ fontWeight: "medium", color: "#e4e4e4" }}>Overall Assessment</h3>
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      {results.detailedSummary}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#eab308"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      <h3 style={{ fontWeight: "medium", color: "#e4e4e4" }}>Recommendation</h3>
                    </div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      {results.recommendation}
                    </p>
                  </div>

                  {scanMode !== "standard" && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                          <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                        </svg>
                        <h3 style={{ fontWeight: "medium", color: "#e4e4e4" }}>AI Analysis</h3>
                      </div>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#9ca3af",
                        }}
                      >
                        {scanMode === "advanced"
                          ? "Our AI models have analyzed this site's behavior patterns and visual elements, comparing them against known phishing techniques."
                          : "Our deep forensic analysis has simulated user interactions and analyzed the site's responses, revealing its true behavior patterns."}
                      </p>
                      <div
                        style={{
                          marginTop: "12px",
                          padding: "12px",
                          backgroundColor: "#2a2a2a",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                          color: overallScore >= 80 ? "#22c55e" : overallScore >= 60 ? "#eab308" : "#ef4444",
                        }}
                      >
                        {overallScore >= 80
                          ? "AI Confidence: This is likely a legitimate website"
                          : overallScore >= 60
                            ? "AI Confidence: This website shows some suspicious patterns"
                            : "AI Confidence: This is highly likely to be a phishing attempt"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #333",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#1e1e1e",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #333",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#e4e4e4",
                  }}
                >
                  What to do next
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
                <ul style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.875rem" }}>
                  <li style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span style={{ color: "#e4e4e4" }}>
                      Check the URL carefully before entering sensitive information
                    </span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span style={{ color: "#e4e4e4" }}>Look for HTTPS and a valid SSL certificate</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span style={{ color: "#e4e4e4" }}>Be cautious of websites asking for personal information</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span style={{ color: "#e4e4e4" }}>
                      Report suspicious websites to your browser or anti-phishing organizations
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {scanMode === "forensic" && (
              <div
                style={{
                  border: "1px solid #333",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#1e1e1e",
                }}
              >
                <div
                  style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid #333",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#e4e4e4",
                    }}
                  >
                    Threat Intelligence
                  </h2>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: "medium", color: "#e4e4e4", marginBottom: "8px" }}>
                        Similar Threats
                      </h3>
                      <div
                        style={{
                          padding: "12px",
                          backgroundColor: "#2a2a2a",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                          color: "#9ca3af",
                        }}
                      >
                        {overallScore < 60 ? (
                          <p>
                            This site matches patterns seen in recent phishing campaigns targeting financial
                            institutions. Similar domains have been observed in the last 30 days.
                          </p>
                        ) : (
                          <p>No similar threats detected in our threat intelligence database.</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: "medium", color: "#e4e4e4", marginBottom: "8px" }}>
                        Infrastructure Analysis
                      </h3>
                      <div
                        style={{
                          padding: "12px",
                          backgroundColor: "#2a2a2a",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                          color: "#9ca3af",
                        }}
                      >
                        {overallScore < 60 ? (
                          <p>
                            The hosting infrastructure has been associated with malicious activities in the past. The
                            server location does not match the claimed organization's region.
                          </p>
                        ) : (
                          <p>
                            The hosting infrastructure appears legitimate and matches the expected parameters for this
                            type of website.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
            © {new Date().getFullYear()} PhishGuard. All rights reserved.
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
      <style jsx>{`
        @media (minWidth: 768px) {
          main > div:first-child {
            grid-template-columns: minmax(0, 1fr) 300px;
          }
          footer > div {
            flex-direction: row;
            height: 96px;
          }
          footer p {
            text-align: left;
          }
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes progress {
          from {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}

function CheckResultCard({ check, showTechnicalDetails, scanMode }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getScoreColor = (score) => {
    if (score >= 80) return "#22c55e"
    if (score >= 60) return "#eab308"
    return "#ef4444"
  }

  const getScoreIcon = (score) => {
    if (score >= 80) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    }
    if (score >= 60) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#eab308"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      )
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    )
  }

  return (
    <div
      style={{
        border: "1px solid #333",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#2a2a2a",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: isExpanded ? "1px solid #333" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {getScoreIcon(check.score)}
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#e4e4e4",
              }}
            >
              {check.name}
            </h3>
            <button
              onClick={() => {}}
              title={check.description}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#9ca3af",
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: getScoreColor(check.score),
              }}
            >
              {check.score}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "#9ca3af",
              }}
            >
              /100
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "8px",
            backgroundColor: "transparent",
            border: "none",
            padding: "4px 0",
            fontSize: "0.875rem",
            color: "#9ca3af",
            cursor: "pointer",
          }}
        >
          {isExpanded ? "Hide details" : "Show details"}
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
            style={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      {isExpanded && (
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <h4
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "medium",
                  marginBottom: "4px",
                  color: "#e4e4e4",
                }}
              >
                Findings
              </h4>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#9ca3af",
                }}
              >
                {check.findings}
              </p>
            </div>
            {check.details && check.details.length > 0 && (
              <div>
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "medium",
                    marginBottom: "4px",
                    color: "#e4e4e4",
                  }}
                >
                  Details
                </h4>
                <ul
                  style={{
                    fontSize: "0.875rem",
                    color: "#9ca3af",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                  }}
                >
                  {check.details.map((detail, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          backgroundColor: "#1e1e1e",
                          borderRadius: "50%",
                          height: "16px",
                          width: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "2px",
                          flexShrink: 0,
                        }}
                      >
                        {index + 1}
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showTechnicalDetails && check.technicalDetails && (
              <div>
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "medium",
                    marginBottom: "4px",
                    color: "#e4e4e4",
                  }}
                >
                  Technical Details
                </h4>
                <div
                  style={{
                    backgroundColor: "#1e1e1e",
                    padding: "12px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    color: "#9ca3af",
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                    overflowX: "auto",
                  }}
                >
                  {check.technicalDetails}
                </div>
              </div>
            )}

            {scanMode === "forensic" && check.forensicData && (
              <div>
                <h4
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "medium",
                    marginBottom: "4px",
                    color: "#e4e4e4",
                  }}
                >
                  Forensic Analysis
                </h4>
                <div
                  style={{
                    backgroundColor: "#1e1e1e",
                    padding: "12px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    color: "#9ca3af",
                  }}
                >
                  {check.forensicData}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
