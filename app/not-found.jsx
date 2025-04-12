import Link from "next/link"

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 16px",
        backgroundColor: "#121212",
        color: "#e4e4e4",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#eab308"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginBottom: "16px" }}
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#e4e4e4",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: "1.125rem",
          color: "#9ca3af",
          marginBottom: "32px",
        }}
      >
        We couldn't find the page you were looking for.
      </p>
      <Link
        href="/"
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
        Return to Home
      </Link>
    </div>
  )
}
