"use client"

import { useState } from "react"
import Link from "next/link"
import PhishingDetectorForm from "@/components/phishing-detector-form"
import ImageUploadAnalyzer from "@/components/image-upload-analyzer"

export default function Home() {
  const [activeTab, setActiveTab] = useState("url") // url or image

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
          <nav
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "16px",
            }}
          >
            <Link
              href="/"
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#e4e4e4",
                fontWeight: "bold",
              }}
            >
              Home
            </Link>
            <Link
              href="#about"
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#9ca3af",
              }}
            >
              About
            </Link>
            <Link
              href="#how-it-works"
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#9ca3af",
              }}
            >
              How It Works
            </Link>
            <Link
              href="#advanced-features"
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#9ca3af",
              }}
            >
              Advanced
            </Link>
          </nav>
        </div>
      </header>
      <main style={{ flex: 1 }}>
        <section
          style={{
            width: "100%",
            padding: "48px 16px",
            background: "linear-gradient(to bottom, #121212, #1e1e1e)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                textAlign: "center",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    lineHeight: 1.1,
                    background: "linear-gradient(90deg, #22c55e, #4ade80)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Advanced Phishing Detection
                </h1>
                <p
                  style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    color: "#9ca3af",
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  }}
                >
                  Protect yourself from sophisticated phishing attacks with our AI-powered multi-layered detection
                  system. Analyze URLs or upload screenshots to identify threats with detailed reasoning.
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  margin: "24px auto",
                }}
              >
                <div
                  style={{
                    border: "1px solid #333",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "#1e1e1e",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    <div style={{ display: "flex", gap: "2px" }}>
                      <button
                        onClick={() => setActiveTab("url")}
                        style={{
                          flex: 1,
                          padding: "10px",
                          backgroundColor: activeTab === "url" ? "#2a2a2a" : "transparent",
                          color: activeTab === "url" ? "#e4e4e4" : "#9ca3af",
                          border: "none",
                          borderRadius: "4px 4px 0 0",
                          fontWeight: activeTab === "url" ? "bold" : "normal",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
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
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        URL Analysis
                      </button>
                      <button
                        onClick={() => setActiveTab("image")}
                        style={{
                          flex: 1,
                          padding: "10px",
                          backgroundColor: activeTab === "image" ? "#2a2a2a" : "transparent",
                          color: activeTab === "image" ? "#e4e4e4" : "#9ca3af",
                          border: "none",
                          borderRadius: "4px 4px 0 0",
                          fontWeight: activeTab === "image" ? "bold" : "normal",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
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
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        Image Analysis
                      </button>
                    </div>
                    <h2
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        marginTop: "16px",
                        marginBottom: "4px",
                        color: "#e4e4e4",
                      }}
                    >
                      {activeTab === "url" ? "Check a Website" : "Analyze a Screenshot"}
                    </h2>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#9ca3af",
                      }}
                    >
                      {activeTab === "url"
                        ? "Enter a URL to analyze for potential phishing threats"
                        : "Upload a screenshot of a suspicious message or website"}
                    </p>
                  </div>
                  <div style={{ padding: "24px" }}>
                    {activeTab === "url" ? <PhishingDetectorForm /> : <ImageUploadAnalyzer />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          style={{
            width: "100%",
            padding: "48px 16px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "bold",
                  color: "#e4e4e4",
                }}
              >
                How It Works
              </h2>
              <p
                style={{
                  maxWidth: "85%",
                  color: "#9ca3af",
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                }}
              >
                Our advanced phishing detection system uses multiple layers of analysis, machine learning, and AI to
                identify even the most sophisticated phishing attempts.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "24px",
                marginTop: "32px",
              }}
            >
              {[
                {
                  title: "URL Analysis",
                  description: "Examines URL structure for suspicious patterns, redirects, and deceptive domains",
                },
                {
                  title: "SSL Verification",
                  description: "Checks for valid SSL certificates and secure connections",
                },
                {
                  title: "Domain Intelligence",
                  description: "Evaluates domain age, WHOIS data, and reputation across security databases",
                },
                {
                  title: "Content Analysis",
                  description: "Scans page content for phishing indicators and suspicious elements",
                },
                {
                  title: "Visual Similarity",
                  description: "Uses AI to detect attempts to visually mimic trusted brands and services",
                },
                {
                  title: "JavaScript Analysis",
                  description: "Identifies malicious scripts and obfuscated code commonly used in phishing",
                },
                {
                  title: "Image Analysis",
                  description: "Scans screenshots for phishing indicators, malicious QR codes, and suspicious text",
                },
                {
                  title: "Blacklist Check",
                  description: "Checks against databases of known phishing sites and malicious domains",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #333",
                    borderRadius: "8px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#1e1e1e",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    ":hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(34, 197, 94, 0.2)",
                      color: "#22c55e",
                      marginBottom: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      color: "#e4e4e4",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="advanced-features"
          style={{
            width: "100%",
            padding: "48px 16px",
            backgroundColor: "#121212",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                textAlign: "center",
                marginBottom: "32px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "bold",
                  color: "#e4e4e4",
                }}
              >
                Advanced Features
              </h2>
              <p
                style={{
                  maxWidth: "85%",
                  color: "#9ca3af",
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                }}
              >
                Our enterprise-grade phishing detection includes cutting-edge technologies to protect against the most
                sophisticated threats.
              </p>
            </div>  

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "32px",
                marginTop: "32px",
                "@media (minWidth: 768px)": {
                  gridTemplateColumns: "1fr 1fr",
                },
              }}
            >
              {[
                {
                  title: "AI-Powered Visual Analysis",
                  description:
                    "Our advanced computer vision algorithms detect visual similarities between the analyzed site and known brands, identifying sophisticated clone attempts that bypass traditional checks.",
                  icon: (
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
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  ),
                },
                {
                  title: "Image & Screenshot Analysis",
                  description:
                    "Upload screenshots of suspicious messages or websites for analysis. Our OCR technology extracts and analyzes text, detects malicious QR codes, and identifies visual phishing indicators.",
                  icon: (
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
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  ),
                },
                {
                  title: "Machine Learning Classification",
                  description:
                    "Our ML models are trained on millions of phishing examples and continuously learn from new threats, achieving over 99.5% accuracy in identifying previously unseen phishing attempts.",
                  icon: (
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
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  ),
                },
                {
                  title: "Behavioral Analysis",
                  description:
                    "We analyze how the website behaves when visited, including redirect chains, cookie usage, and JavaScript execution patterns to identify malicious behavior invisible to static analysis.",
                  icon: (
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
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                    </svg>
                  ),
                },
                {
                  title: "Real-time Threat Intelligence",
                  description:
                    "Our system connects to a network of global threat intelligence feeds, providing up-to-the-minute data on emerging phishing campaigns and zero-day threats.",
                  icon: (
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
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  ),
                },
                {
                  title: "Malware Detection",
                  description:
                    "We scan for embedded malware, malicious downloads, and drive-by attacks that can compromise your system even without entering credentials.",
                  icon: (
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
                      <path d="M20.91 8.84L8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67z"></path>
                      <path d="M3.09 8.84v7.21a2.11 2.11 0 0 0 1.09 1.85l4 2.28a2 2 0 0 0 1.95 0l4-2.28a2.11 2.11 0 0 0 1.09-1.85V8.84"></path>
                      <path d="M12 22.12V12"></path>
                      <path d="M17 5.55v-1a2.2 2.2 0 0 0-2.2-2.2h-5.6a2.2 2.2 0 0 0-2.2 2.2v1"></path>
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #333",
                    borderRadius: "8px",
                    padding: "24px",
                    backgroundColor: "#1e1e1e",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px",
                        height: "48px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#e4e4e4",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          style={{
            width: "100%",
            padding: "48px 16px",
            backgroundColor: "#1a1a1a",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "bold",
                  color: "#e4e4e4",
                }}
              >
                About PhishGuard Advanced
              </h2>
              <p
                style={{
                  maxWidth: "85%",
                  color: "#9ca3af",
                  fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                }}
              >
                PhishGuard Advanced was created to help internet users identify and avoid increasingly sophisticated
                phishing websites. Our tool provides comprehensive analysis with clear explanations to help you make
                informed decisions about website safety.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  marginTop: "16px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Link
                  href="/results?demo=true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    backgroundColor: "#22c55e",
                    color: "white",
                    borderRadius: "4px",
                    fontWeight: "medium",
                    textDecoration: "none",
                  }}
                >
                  View Demo Analysis
                </Link>
                <Link
                  href="/image-analysis?demo=true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    backgroundColor: "#22c55e",
                    color: "white",
                    borderRadius: "4px",
                    fontWeight: "medium",
                    textDecoration: "none",
                  }}
                >
                  View Image Analysis Demo
                </Link>
                <Link
                  href="#how-it-works"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    backgroundColor: "transparent",
                    color: "#e4e4e4",
                    borderRadius: "4px",
                    border: "1px solid #333",
                    fontWeight: "medium",
                    textDecoration: "none",
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
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
            "@media (minWidth: 768px)": {
              flexDirection: "row",
              height: "96px",
            },
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#9ca3af",
              "@media (minWidth: 768px)": {
                textAlign: "left",
              },
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
                ":hover": {
                  textDecoration: "underline",
                },
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
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @media (minWidth: 768px) {
          section > div > div:last-child {
            grid-template-columns: 1fr 1fr;
          }
          footer > div {
            flex-direction: row;
            height: 96px;
          }
          footer p {
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}
