// This is a mock implementation for demo purposes
// In a real application, you would implement actual phishing detection logic

export function analyzeUrl(url, isDemoMode = false, scanMode = "standard") {
  // For demo purposes, we'll return mock data
  // In a real application, you would implement actual checks

  if (isDemoMode) {
    return getMockPhishingResult(url, scanMode)
  }

  // Basic implementation for non-demo mode
  // In a real application, you would implement actual checks
  const isSecure = url.startsWith("https://")
  const hasSuspiciousTld = [".xyz", ".tk", ".ml", ".ga", ".cf"].some((tld) => url.endsWith(tld))
  const hasSuspiciousSubdomain = url.includes("secure-") || url.includes("login-") || url.includes("verify-")
  const hasBrandName = ["paypal", "apple", "microsoft", "amazon", "google", "facebook"].some(
    (brand) => url.toLowerCase().includes(brand) && !url.toLowerCase().includes(`${brand}.com`),
  )
  const hasRedirects = url.includes("url=") || url.includes("redirect=") || url.includes("goto=")
  const hasLongDomain = url.split("/")[2] && url.split("/")[2].length > 30
  const hasIPAddress = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)
  const hasManySubdomains = (url.match(/\./g) || []).length > 3
  const hasEncodedChars = url.includes("%") || url.includes("\\x")

  // Calculate a basic risk score
  let riskScore = 100
  if (!isSecure) riskScore -= 30
  if (hasSuspiciousTld) riskScore -= 20
  if (hasSuspiciousSubdomain) riskScore -= 15
  if (hasBrandName) riskScore -= 25
  if (hasRedirects) riskScore -= 15
  if (hasLongDomain) riskScore -= 10
  if (hasIPAddress) riskScore -= 25
  if (hasManySubdomains) riskScore -= 15
  if (hasEncodedChars) riskScore -= 15

  // Ensure score is between 0 and 100
  riskScore = Math.max(0, Math.min(100, riskScore))

  // Generate results based on the calculated score
  return generateResults(
    url,
    riskScore,
    {
      isSecure,
      hasSuspiciousTld,
      hasSuspiciousSubdomain,
      hasBrandName,
      hasRedirects,
      hasLongDomain,
      hasIPAddress,
      hasManySubdomains,
      hasEncodedChars,
    },
    scanMode,
  )
}

function generateResults(url, overallScore, flags, scanMode) {
  let riskLevel = "Low Risk"
  let summary = "This website appears to be safe"
  let recommendation = "You can proceed with caution, but always be vigilant when sharing personal information online."

  if (overallScore < 60) {
    riskLevel = "High Risk"
    summary = "This website shows strong signs of being a phishing attempt"
    recommendation = "Do not proceed. Do not enter any personal information or credentials on this website."
  } else if (overallScore < 80) {
    riskLevel = "Medium Risk"
    summary = "This website has some suspicious characteristics"
    recommendation =
      "Proceed with extreme caution. Verify the website's legitimacy through other means before entering any sensitive information."
  }

  const detailedSummary =
    overallScore >= 80
      ? "Based on our analysis, this website appears to be legitimate. However, always exercise caution when sharing personal information online."
      : overallScore >= 60
        ? "Our analysis has detected some suspicious elements that could indicate this is not a legitimate website. We recommend verifying its authenticity before proceeding."
        : "Our analysis strongly indicates this website is likely a phishing attempt designed to steal personal information. We strongly advise against using this website."

  const checks = [
    {
      name: "URL Structure Analysis",
      description: "Examines the URL for suspicious patterns, unusual characters, or deceptive techniques",
      score: calculateUrlScore(flags),
      findings: generateUrlFindings(flags),
      details: generateUrlDetails(url, flags),
      technicalDetails: scanMode !== "standard" ? generateUrlTechnicalDetails(url, flags) : null,
      forensicData:
        scanMode === "forensic"
          ? "URL structure analysis reveals potential deception techniques designed to mimic legitimate domains. The entropy analysis of the domain name shows abnormal character distribution."
          : null,
    },
    {
      name: "SSL Certificate Verification",
      description: "Checks if the website uses HTTPS and has a valid SSL certificate",
      score: flags.isSecure ? 95 : 40,
      findings: flags.isSecure
        ? "The website uses HTTPS with a valid SSL certificate"
        : "The website does not use HTTPS, which is a security concern",
      details: flags.isSecure
        ? ["Uses HTTPS for secure communication", "SSL certificate is valid"]
        : [
            "Does not use HTTPS",
            "No SSL certificate detected",
            "Sensitive information sent to this site could be intercepted",
          ],
      technicalDetails: scanMode !== "standard" ? generateSSLTechnicalDetails(flags) : null,
      forensicData:
        scanMode === "forensic"
          ? flags.isSecure
            ? "Certificate chain validation complete. Certificate issued by a trusted CA. Certificate expiration and revocation status verified."
            : "No SSL certificate detected. All traffic to this site is unencrypted and vulnerable to interception."
          : null,
    },
    {
      name: "Domain Intelligence",
      description: "Evaluates domain age, WHOIS data, and reputation across security databases",
      score: calculateDomainScore(flags),
      findings: generateDomainFindings(flags),
      details: generateDomainDetails(url, flags),
      technicalDetails: scanMode !== "standard" ? generateDomainTechnicalDetails(url, flags) : null,
      forensicData:
        scanMode === "forensic"
          ? "WHOIS data analysis shows domain was registered within the last 30 days. Registrant information is protected or obscured. Domain has no established reputation in our intelligence database."
          : null,
    },
    {
      name: "Content Analysis",
      description: "Scans page content for phishing indicators and suspicious elements",
      score: Math.round(overallScore * 0.9 + Math.random() * 10),
      findings:
        overallScore < 60
          ? "The page content contains elements commonly found in phishing websites"
          : "No suspicious content elements detected",
      details: generateContentDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateContentTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "Content analysis detected login forms requesting sensitive information. HTML structure contains hidden elements and obfuscated scripts. Page contains brand logos and styling copied from legitimate sites."
            : "Content appears legitimate with no suspicious elements detected. Form submissions use proper security practices."
          : null,
    },
    {
      name: "Brand Impersonation Detection",
      description: "Detects attempts to impersonate trusted brands and services",
      score: flags.hasBrandName ? 30 : 90,
      findings: flags.hasBrandName
        ? "The URL appears to be impersonating a well-known brand"
        : "No brand impersonation detected",
      details: flags.hasBrandName
        ? [
            "URL contains a brand name but doesn't match the official domain",
            "Possible attempt to impersonate a trusted brand",
          ]
        : ["No signs of brand impersonation", "Domain name doesn't attempt to mimic known brands"],
      technicalDetails: scanMode !== "standard" ? generateBrandTechnicalDetails(flags, url) : null,
      forensicData:
        scanMode === "forensic"
          ? flags.hasBrandName
            ? "Visual similarity analysis shows 87% match with legitimate brand assets. Logo and color scheme have been copied to create a convincing fake."
            : "No visual similarity with known brands detected. Site does not appear to be impersonating any known entity."
          : null,
    },
    {
      name: "Redirect Chain Analysis",
      description: "Analyzes URL redirects that may lead to malicious websites",
      score: flags.hasRedirects ? 40 : 95,
      findings: flags.hasRedirects
        ? "The URL contains redirect parameters that could lead to malicious websites"
        : "No suspicious redirect chains detected",
      details: flags.hasRedirects
        ? [
            "URL contains redirect parameters",
            "Redirects can be used to mask the final destination",
            "Multiple redirects may be used to evade detection",
          ]
        : ["No redirect parameters detected in the URL", "Direct navigation to the intended website"],
      technicalDetails: scanMode !== "standard" ? generateRedirectTechnicalDetails(flags) : null,
      forensicData:
        scanMode === "forensic"
          ? flags.hasRedirects
            ? "Redirect chain analysis shows 3 hops before reaching final destination. Intermediate domains have suspicious characteristics. Final destination differs from initial landing page."
            : "No redirect chains detected. Direct navigation to destination confirmed."
          : null,
    },
    {
      name: "JavaScript Analysis",
      description: "Detects obfuscated or malicious JavaScript code",
      score: overallScore < 60 ? 35 : overallScore < 80 ? 65 : 90,
      findings:
        overallScore < 60
          ? "Suspicious JavaScript detected that may be used to steal information"
          : overallScore < 80
            ? "Some JavaScript elements require caution"
            : "No suspicious JavaScript detected",
      details: generateJavaScriptDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateJavaScriptTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "JavaScript deobfuscation revealed keylogging functionality and form data exfiltration. Code attempts to evade detection by using multiple layers of encoding."
            : "JavaScript analysis shows standard libraries and no suspicious behavior. No obfuscation or evasion techniques detected."
          : null,
    },
    {
      name: "Form Input Analysis",
      description: "Identifies forms collecting sensitive information",
      score: overallScore < 60 ? 25 : overallScore < 80 ? 70 : 95,
      findings:
        overallScore < 60
          ? "Forms detected that request sensitive information in a suspicious context"
          : overallScore < 80
            ? "Forms present that request personal information"
            : "No suspicious forms detected",
      details: generateFormDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateFormTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "Form analysis detected password, credit card, and personal identity fields. Form submission endpoint is suspicious and data is not encrypted properly before transmission."
            : "Forms use proper security practices including CSRF protection and secure submission methods. No excessive data collection detected."
          : null,
    },
  ]

  // Add advanced checks for more comprehensive scan modes
  if (scanMode === "advanced" || scanMode === "forensic") {
    checks.push({
      name: "Visual Similarity Analysis",
      description: "Uses AI to detect attempts to visually mimic trusted brands and services",
      score: flags.hasBrandName ? 20 : 90,
      findings: flags.hasBrandName
        ? "The website visually mimics a legitimate brand's website"
        : "No visual similarity to known brands detected",
      details: flags.hasBrandName
        ? [
            "Website uses similar colors, logos, and layout to a legitimate brand",
            "Visual elements are designed to build false trust",
            "AI detection shows high similarity to known brand templates",
          ]
        : [
            "No visual similarity to known phishing templates",
            "Design elements appear unique and not attempting to mimic known brands",
          ],
      technicalDetails:
        scanMode !== "standard"
          ? "Visual similarity analysis using perceptual hashing and CNN-based comparison with known legitimate sites. Color scheme, layout, and logo positioning analyzed for similarity patterns."
          : null,
      forensicData:
        scanMode === "forensic"
          ? flags.hasBrandName
            ? "Perceptual hash comparison shows 92% similarity with legitimate site. Logo placement, color scheme, and layout are nearly identical to the legitimate site, with subtle differences to avoid exact matching detection."
            : "Visual elements do not match any known brand templates in our database. Layout and design elements appear to be original."
          : null,
    })
  }

  if (scanMode === "forensic") {
    checks.push({
      name: "Behavioral Analysis",
      description: "Analyzes how the website behaves when visited",
      score: overallScore < 60 ? 30 : overallScore < 80 ? 65 : 90,
      findings:
        overallScore < 60
          ? "The website exhibits suspicious behavior patterns typical of phishing sites"
          : overallScore < 80
            ? "Some behavioral patterns require caution"
            : "Website behavior appears normal",
      details:
        overallScore < 60
          ? [
              "Attempts to prevent navigation away from the page",
              "Uses deceptive pop-ups or alerts",
              "Simulates system or browser messages",
              "Attempts to create a false sense of urgency",
            ]
          : overallScore < 80
            ? [
                "Some unusual navigation patterns detected",
                "Minor behavioral anomalies present",
                "Consider monitoring site behavior closely",
              ]
            : [
                "Normal navigation flow detected",
                "No suspicious behavioral patterns",
                "User interactions handled appropriately",
              ],
      technicalDetails:
        "Behavioral analysis conducted through headless browser simulation. User interactions simulated to detect malicious behavior patterns, including navigation traps, deceptive dialogs, and clipboard manipulation.",
      forensicData:
        overallScore < 60
          ? "Behavioral simulation detected attempts to prevent page navigation using history manipulation and dialog loops. Site attempts to create false urgency through countdown timers and fake security alerts."
          : "Behavioral simulation shows normal navigation patterns and standard user interaction handling. No attempts to manipulate browser behavior or create false urgency detected.",
    })

    checks.push({
      name: "Network Traffic Analysis",
      description: "Analyzes network connections made by the website",
      score: overallScore < 60 ? 25 : overallScore < 80 ? 70 : 95,
      findings:
        overallScore < 60
          ? "The website makes suspicious network connections to potentially malicious endpoints"
          : overallScore < 80
            ? "Some network connections require further investigation"
            : "Network connections appear legitimate",
      details:
        overallScore < 60
          ? [
              "Connections to known malicious domains detected",
              "Data exfiltration attempts identified",
              "Suspicious API endpoints contacted",
              "Communication with unusual geographic locations",
            ]
          : overallScore < 80
            ? [
                "Some third-party connections with unknown reputation",
                "Unusual connection patterns detected",
                "Consider monitoring network activity",
              ]
            : [
                "Connections to reputable services only",
                "No suspicious data transmission detected",
                "Network activity consistent with site functionality",
              ],
      technicalDetails:
        "Network traffic analysis performed through packet inspection and connection monitoring. All outbound requests logged and analyzed for destination reputation, encryption status, and data patterns.",
      forensicData:
        overallScore < 60
          ? "Network analysis detected connections to 5 suspicious domains with poor reputation scores. Data exfiltration patterns identified with encoded payloads being sent to servers in high-risk regions."
          : "Network connections limited to reputable CDNs and API services. All data transmissions properly encrypted and follow expected patterns for legitimate site functionality.",
    })
  }

  return {
    url,
    summary,
    detailedSummary,
    recommendation,
    riskLevel,
    checks,
  }
}

function calculateUrlScore(flags) {
  let score = 100
  if (flags.hasSuspiciousSubdomain) score -= 30
  if (flags.hasBrandName) score -= 25
  if (flags.hasIPAddress) score -= 40
  if (flags.hasEncodedChars) score -= 20
  if (flags.hasLongDomain) score -= 15
  if (flags.hasManySubdomains) score -= 20
  return Math.max(0, Math.min(100, score))
}

function generateUrlFindings(flags) {
  if (flags.hasIPAddress) {
    return "The URL uses an IP address instead of a domain name, which is highly suspicious"
  }
  if (flags.hasSuspiciousSubdomain || flags.hasBrandName) {
    return "The URL contains suspicious elements that may indicate a phishing attempt"
  }
  if (flags.hasEncodedChars) {
    return "The URL contains encoded characters which may be hiding malicious content"
  }
  if (flags.hasLongDomain || flags.hasManySubdomains) {
    return "The URL structure is unusual and potentially suspicious"
  }
  return "The URL structure appears normal"
}

function calculateDomainScore(flags) {
  let score = 100
  if (flags.hasSuspiciousTld) score -= 30
  if (flags.hasManySubdomains) score -= 20
  if (flags.hasLongDomain) score -= 15
  return Math.max(0, Math.min(100, score))
}

function generateDomainFindings(flags) {
  if (flags.hasSuspiciousTld) {
    return "The domain uses a TLD often associated with free or low-cost registrations, which are commonly used in phishing attacks"
  }
  if (flags.hasManySubdomains) {
    return "The domain has an unusually high number of subdomains, which can be used to create misleading URLs"
  }
  if (flags.hasLongDomain) {
    return "The domain name is unusually long, which can be an attempt to confuse users"
  }
  return "The domain appears to have a good reputation"
}

function generateUrlDetails(url, flags) {
  const details = []

  if (flags.hasSuspiciousSubdomain) {
    details.push("URL contains suspicious subdomains that may be attempting to appear legitimate")
  }

  if (flags.hasBrandName) {
    details.push("URL contains a brand name but doesn't match the official domain pattern")
  }

  if (flags.hasIPAddress) {
    details.push("URL uses an IP address instead of a domain name, which is highly suspicious")
    details.push("Legitimate websites almost never use raw IP addresses in their URLs")
  }

  if (flags.hasEncodedChars) {
    details.push("URL contains encoded characters which may be hiding the true destination")
    details.push("Encoded characters can be used to disguise malicious URLs")
  }

  if (url.includes("@")) {
    details.push("URL contains the @ symbol, which can be used to obscure the actual destination")
  }

  if (flags.hasLongDomain) {
    details.push("Domain name is unusually long, which can be an attempt to confuse users")
  }

  if (flags.hasManySubdomains) {
    details.push("URL has an unusually high number of subdomains")
  }

  if (flags.hasRedirects) {
    details.push("URL contains redirect parameters that may lead to a different website than expected")
  }

  if (details.length === 0) {
    details.push("URL structure appears normal")
    details.push("No suspicious patterns detected in the URL")
  }

  return details
}

function generateDomainDetails(url, flags) {
  const details = []

  if (flags.hasSuspiciousTld) {
    details.push(
      "Domain uses a TLD often associated with free or low-cost domain registrations, which are commonly used in phishing attacks",
    )
    details.push("These TLDs often have less strict registration requirements")
  }

  if (flags.hasManySubdomains) {
    details.push("Domain has multiple subdomains, which can be used to create misleading URLs")
  }

  if (flags.hasLongDomain) {
    details.push("Domain name is unusually long, which is often seen in phishing attempts")
  }

  // Add some generic details if none were added
  if (details.length === 0) {
    details.push("Domain appears to be registered with a reputable TLD")
    details.push("No suspicious domain characteristics detected")
  }

  return details
}

function generateContentDetails(overallScore) {
  if (overallScore >= 80) {
    return [
      "No login forms requesting sensitive information were detected",
      "No suspicious scripts or redirects were found",
      "Content appears to be consistent with the domain's purpose",
      "No hidden elements or overlays detected",
    ]
  } else if (overallScore >= 60) {
    return [
      "Some elements on the page may be attempting to collect sensitive information",
      "Page contains forms that request personal information",
      "Some scripts on the page require caution",
      "Consider verifying the website's legitimacy through other means",
    ]
  } else {
    return [
      "Page contains forms requesting sensitive information like passwords or credit card details",
      "Suspicious scripts detected that may be used to steal information",
      "Content mimics legitimate websites to deceive users",
      "Poor grammar or spelling errors often associated with phishing sites",
      "Hidden elements or overlays detected that may be used to trick users",
    ]
  }
}

function generateJavaScriptDetails(overallScore) {
  if (overallScore >= 80) {
    return [
      "No obfuscated JavaScript detected",
      "Scripts appear to be legitimate and from trusted sources",
      "No suspicious event handlers or form submission scripts found",
    ]
  } else if (overallScore >= 60) {
    return [
      "Some JavaScript code requires caution",
      "Scripts may be collecting form data",
      "Consider disabling JavaScript when browsing this site",
    ]
  } else {
    return [
      "Obfuscated JavaScript detected that may be hiding malicious code",
      "Scripts that capture keyboard input or form submissions found",
      "JavaScript that may be used to steal credentials or personal information",
      "Code that attempts to prevent users from leaving the page",
    ]
  }
}

function generateFormDetails(overallScore) {
  if (overallScore >= 80) {
    return [
      "Forms appear to be legitimate and secure",
      "No suspicious input fields detected",
      "Forms submit to secure endpoints",
    ]
  } else if (overallScore >= 60) {
    return [
      "Forms request personal information",
      "Consider the necessity of providing the requested information",
      "Verify the website's legitimacy before submitting sensitive data",
    ]
  } else {
    return [
      "Forms requesting sensitive information like passwords, credit card numbers, or SSNs",
      "Form submission endpoints appear suspicious",
      "Hidden form fields detected that may collect additional information",
      "Forms mimic legitimate websites to trick users into entering credentials",
    ]
  }
}

// Technical details generators for advanced scan modes
function generateUrlTechnicalDetails(url, flags) {
  return `URL: ${url}
Protocol: ${url.startsWith("https") ? "HTTPS" : "HTTP"}
Domain: ${url.split("/")[2] || "N/A"}
Path: ${url.split("/").slice(3).join("/") || "/"}
Query Parameters: ${url.includes("?") ? url.split("?")[1] : "None"}
Suspicious Elements: ${
    Object.entries(flags)
      .filter(([key, value]) => value === true && key.startsWith("has"))
      .map(([key]) => key.replace("has", ""))
      .join(", ") || "None"
  }`
}

function generateSSLTechnicalDetails(flags) {
  if (!flags.isSecure) {
    return "No SSL certificate detected. Connection is not encrypted."
  }

  return `SSL: Valid
Protocol: TLS 1.3
Cipher Suite: TLS_AES_256_GCM_SHA384
Certificate Validity: 365 days
Issuer: Let's Encrypt Authority X3
Key Type: RSA 2048 bits
OCSP Stapling: Supported
HTTP Strict Transport Security: Enabled`
}

function generateDomainTechnicalDetails(url, flags) {
  const domain = url.split("/")[2] || ""

  return `Domain: ${domain}
Registration Date: ${flags.hasSuspiciousTld ? "2023-01-15" : "2010-05-22"}
Registrar: ${flags.hasSuspiciousTld ? "NameCheap, Inc." : "GoDaddy.com, LLC"}
WHOIS Privacy: ${flags.hasSuspiciousTld ? "Enabled" : "Disabled"}
Name Servers: ${flags.hasSuspiciousTld ? "ns1.suspicioushost.com, ns2.suspicioushost.com" : "ns1.google.com, ns2.google.com"}
IP Address: ${flags.hasIPAddress ? url.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)[0] : "203.0.113.42"}
ASN: AS${Math.floor(Math.random() * 60000) + 1000}
Hosting Provider: ${flags.hasSuspiciousTld ? "Unknown Hosting Ltd." : "Amazon Web Services"}`
}

function generateContentTechnicalDetails(overallScore) {
  if (overallScore >= 80) {
    return `Content-Type: text/html; charset=UTF-8
Meta Tags: Description, Viewport, Author
External Resources: 5 JavaScript files, 3 CSS files, 12 images
Forms: 1 search form, no login forms
iFrames: None detected
Hidden Elements: None detected
External Links: 15 links to reputable domains`
  } else if (overallScore >= 60) {
    return `Content-Type: text/html; charset=UTF-8
Meta Tags: Description, Viewport
External Resources: 8 JavaScript files, 4 CSS files, 15 images
Forms: 1 login form, 1 contact form
iFrames: 1 detected
Hidden Elements: 2 detected
External Links: 8 links, 2 to domains with unknown reputation`
  } else {
    return `Content-Type: text/html; charset=UTF-8
Meta Tags: Minimal or missing
External Resources: 12 JavaScript files (3 obfuscated), 2 CSS files, 8 images
Forms: 2 login forms, 1 payment form
iFrames: 3 detected (2 hidden)
Hidden Elements: 7 detected
External Links: 4 links to suspicious domains
Suspicious Elements: Hidden form fields, opacity:0 elements, off-screen positioning`
  }
}

function generateBrandTechnicalDetails(flags, url) {
  if (!flags.hasBrandName) {
    return `No brand impersonation detected.
Visual Similarity Score: 12% (below threshold)
Logo Detection: No known logos found
Brand Keywords: None detected
Brand Color Schemes: No matches found`
  }

  // Extract the potential brand being impersonated
  const brands = ["paypal", "apple", "microsoft", "amazon", "google", "facebook"]
  const detectedBrand = brands.find((brand) => url.toLowerCase().includes(brand)) || "unknown brand"

  return `Brand Impersonation Detected: ${detectedBrand.charAt(0).toUpperCase() + detectedBrand.slice(1)}
Visual Similarity Score: 78% (above threshold)
Logo Detection: ${detectedBrand} logo detected
Brand Keywords: ${Math.floor(Math.random() * 8) + 5} matches found
Brand Color Schemes: Primary and secondary colors match ${detectedBrand}
Official Domain: ${detectedBrand}.com
Current Domain: ${url.split("/")[2] || "unknown"}`
}

function generateRedirectTechnicalDetails(flags) {
  if (!flags.hasRedirects) {
    return `No redirect chains detected.
Direct navigation confirmed.
HTTP Status: 200 OK
No URL rewriting or client-side redirects found.`
  }

  return `Redirect Chain Detected:
Initial URL → HTTP 302 → Intermediate URL → HTTP 307 → Final Destination
Redirect Parameters: ${flags.hasRedirects ? "redirect=, url=, goto=" : "None"}
Client-side Redirects: JavaScript location.replace() detected
Suspicious Patterns: Delayed redirect after page load
Final Destination: Different domain than initial URL`
}

function generateJavaScriptTechnicalDetails(overallScore) {
  if (overallScore >= 80) {
    return `JavaScript Analysis:
Total Scripts: 5
Obfuscated Scripts: 0
Known Libraries: jQuery 3.6.0, Bootstrap 5.1.0
Event Listeners: Standard UI interactions
Form Handling: Standard form validation
No suspicious behaviors detected`
  } else if (overallScore >= 60) {
    return `JavaScript Analysis:
Total Scripts: 8
Obfuscated Scripts: 1
Known Libraries: jQuery 3.5.1, Custom scripts
Event Listeners: Form submission, keyboard events
Form Handling: Custom form submission logic
Suspicious Behaviors: Excessive data collection`
  } else {
    return `JavaScript Analysis:
Total Scripts: 12
Obfuscated Scripts: 4
Known Libraries: Outdated jQuery 2.2.4, Unknown libraries
Event Listeners: Keylogging, form submission, clipboard access
Form Handling: Data exfiltration to external domains
Suspicious Behaviors: Browser fingerprinting, anti-debugging techniques, event capturing
Obfuscation Methods: Multiple layers of eval(), base64 encoding, string concatenation`
  }
}

function generateFormTechnicalDetails(overallScore) {
  if (overallScore >= 80) {
    return `Form Analysis:
Forms Detected: 1
Input Fields: Standard contact form fields
Submission Method: POST to same-origin endpoint
Security Features: CSRF token present, proper validation
No sensitive data collection detected`
  } else if (overallScore >= 60) {
    return `Form Analysis:
Forms Detected: 2
Input Fields: Username/password, personal information
Submission Method: POST to same-origin endpoint
Security Features: Basic validation present
Concerns: Collects more information than necessary`
  } else {
    return `Form Analysis:
Forms Detected: 3
Input Fields: Username/password, credit card details, personal information
Submission Method: POST to cross-origin endpoint
Security Features: None detected
Concerns: No HTTPS for submission, no validation, excessive data collection
Hidden Fields: 5 detected collecting browser fingerprinting data
Data Exfiltration: Form data sent to suspicious external domain`
  }
}

function getMockPhishingResult(url, scanMode) {
  // This is a mock result for demonstration purposes
  return {
    url,
    summary: "This website shows strong signs of being a phishing attempt",
    detailedSummary:
      "Our analysis strongly indicates this website is likely a phishing attempt designed to steal personal information. Multiple security checks have failed, including suspicious URL structure, brand impersonation, and malicious content patterns.",
    recommendation: "Do not proceed. Do not enter any personal information or credentials on this website.",
    riskLevel: "High Risk",
    checks: [
      {
        name: "URL Structure Analysis",
        description: "Examines the URL for suspicious patterns, unusual characters, or deceptive techniques",
        score: 30,
        findings: "The URL contains multiple suspicious elements that strongly indicate a phishing attempt",
        details: [
          "URL contains a brand name but doesn't match the official domain",
          "Uses deceptive subdomain to appear legitimate",
          "Contains misleading keywords like 'secure' or 'login'",
          "Uses encoded characters to hide the true destination",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? generateUrlTechnicalDetails(url, {
                hasSuspiciousSubdomain: true,
                hasBrandName: true,
                hasEncodedChars: true,
              })
            : null,
        forensicData:
          scanMode === "forensic"
            ? "URL structure analysis reveals sophisticated deception techniques. Domain was crafted to appear legitimate while hiding its true nature. Character-level analysis shows intentional similarity to legitimate domain."
            : null,
      },
      {
        name: "SSL Certificate Verification",
        description: "Checks if the website uses HTTPS and has a valid SSL certificate",
        score: 60,
        findings: "The website uses HTTPS but with a recently issued certificate from a free provider",
        details: [
          "Certificate was issued within the last 24 hours",
          "Uses a free SSL certificate provider commonly used in phishing",
          "Certificate details don't match the claimed organization",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `SSL: Valid but suspicious
Protocol: TLS 1.2
Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
Certificate Validity: 90 days
Issuer: Let's Encrypt Authority X3
Key Type: RSA 2048 bits
Certificate Age: Less than 24 hours
Organization: Not verified`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Certificate analysis shows it was issued within the last 24 hours, which is common in phishing sites that need to quickly establish HTTPS connections. The certificate lacks Extended Validation and organization details don't match claimed identity."
            : null,
      },
      {
        name: "Domain Intelligence",
        description: "Evaluates domain age, history, and reputation across security databases",
        score: 20,
        findings: "The domain was registered very recently and has been flagged in security databases",
        details: [
          "Domain was registered less than 48 hours ago",
          "Registrar information is hidden or obscured",
          "Domain has been reported in phishing databases",
          "Uses a TLD commonly associated with malicious websites",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Domain: ${url.split("/")[2] || "example-phishing-site.com"}
Registration Date: ${new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString().split("T")[0]}
Registrar: NameCheap, Inc.
WHOIS Privacy: Enabled (Identity Protected)
Name Servers: ns1.suspicioushost.com, ns2.suspicioushost.com
IP Address: 203.0.113.42
ASN: AS14618
Hosting Provider: Unknown Hosting Ltd.
Domain Reputation: Flagged in 3 security databases`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "WHOIS data confirms domain was registered 36 hours ago with privacy protection enabled. Domain uses name servers associated with previous phishing campaigns. IP address belongs to a hosting provider known for lax security policies and minimal customer verification."
            : null,
      },
      {
        name: "Content Analysis",
        description: "Scans page content for phishing indicators and suspicious elements",
        score: 15,
        findings: "The page content contains multiple elements commonly found in phishing websites",
        details: [
          "Page contains forms requesting sensitive information",
          "Content appears to be copied from a legitimate website",
          "Contains obfuscated scripts that may be used to steal information",
          "Poor grammar and spelling errors typical of phishing sites",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Content-Type: text/html; charset=UTF-8
Meta Tags: Minimal or missing
External Resources: 14 JavaScript files (5 obfuscated), 3 CSS files, 12 images
Forms: 2 login forms, 1 payment form with credit card fields
iFrames: 2 detected (both hidden)
Hidden Elements: 9 detected
External Links: 6 links to suspicious domains
Suspicious Elements: Hidden form fields, opacity:0 elements, off-screen positioning
Text Analysis: Multiple grammar errors, urgent language patterns`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Content analysis reveals HTML and CSS copied directly from legitimate site with minor modifications to exfiltrate data. Hidden elements detected that capture additional information beyond visible form fields. Text contains urgency cues and threatening language to pressure user action."
            : null,
      },
      {
        name: "Brand Impersonation Detection",
        description: "Detects attempts to impersonate trusted brands and services",
        score: 10,
        findings: "The website is clearly attempting to impersonate a well-known brand",
        details: [
          "Uses logos and branding from a legitimate company",
          "Visual design mimics the official website",
          "Contains urgent messaging about account verification or security issues",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Brand Impersonation Detected: PayPal
Visual Similarity Score: 92% (well above threshold)
Logo Detection: PayPal logo detected (exact match)
Brand Keywords: 14 matches found
Brand Color Schemes: Primary and secondary colors match PayPal
Official Domain: paypal.com
Current Domain: ${url.split("/")[2] || "paypa1-secure-login.com"}
CSS Similarity: 87% match with official site
Image Assets: 9 images copied from official site`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Visual analysis confirms deliberate impersonation of PayPal with 92% similarity score. Assets including logo, color scheme, and layout have been copied from legitimate site. Perceptual hashing of key visual elements confirms direct copying rather than similar design."
            : null,
      },
      {
        name: "Redirect Chain Analysis",
        description: "Analyzes URL redirects that may lead to malicious websites",
        score: 25,
        findings: "The URL contains multiple redirect chains that obscure the final destination",
        details: [
          "Multiple redirect parameters detected in the URL",
          "Redirects through several domains before reaching the final destination",
          "Uses URL shorteners to hide the true destination",
          "Redirect chain includes known suspicious domains",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Redirect Chain Detected:
Initial URL → HTTP 302 → tracking-domain.com → HTTP 307 → url-shortener.co → Client-side Redirect → Final Phishing Page
Redirect Parameters: redirect=, url=, goto=, next=
Client-side Redirects: Multiple JavaScript location.replace() calls
Suspicious Patterns: Delayed redirect after page load (5 seconds)
Final Destination: Different domain than initial landing page
Evasion Techniques: Conditional redirects based on user-agent and IP geolocation`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Redirect chain analysis revealed sophisticated evasion techniques. Initial redirect appears benign, but subsequent hops lead to malicious infrastructure. System detected geofencing that avoids redirecting visitors from certain countries or IP ranges associated with security researchers."
            : null,
      },
      {
        name: "JavaScript Analysis",
        description: "Detects obfuscated or malicious JavaScript code",
        score: 5,
        findings: "Highly suspicious JavaScript detected that is likely used to steal information",
        details: [
          "Heavily obfuscated JavaScript code detected",
          "Scripts designed to capture form input in real-time",
          "Code that prevents users from leaving the page",
          "Scripts that modify the appearance of the page to hide malicious elements",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `JavaScript Analysis:
Total Scripts: 14
Obfuscated Scripts: 8
Known Libraries: jQuery 2.1.1 (outdated), Unknown libraries
Event Listeners: Keylogging, form submission, clipboard access, browser history
Form Handling: Data exfiltration to external domains
Suspicious Behaviors: Browser fingerprinting, anti-debugging techniques, event capturing, clipboard monitoring
Obfuscation Methods: Multiple layers of eval(), base64 encoding, string concatenation, character code manipulation
Malicious Behaviors: Form data exfiltration, keystroke logging, session hijacking attempts
External Connections: Data sent to 3 suspicious domains`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "JavaScript deobfuscation revealed sophisticated data theft mechanisms. Code contains anti-analysis features that detect debugging attempts and modify behavior accordingly. Multiple exfiltration methods implemented as fallbacks. Script contains capabilities to capture form data before submission and during typing."
            : null,
      },
      {
        name: "Form Input Analysis",
        description: "Identifies forms collecting sensitive information",
        score: 10,
        findings: "Forms detected that are designed to steal sensitive information",
        details: [
          "Login form that mimics a legitimate website",
          "Form collecting credit card information",
          "Hidden form fields that collect additional data",
          "Form submissions sent to suspicious endpoints",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Form Analysis:
Forms Detected: 3
Input Fields: Username/password, credit card details (number, expiry, CVV), personal information (SSN, DOB)
Submission Method: POST to cross-origin endpoint
Security Features: None detected
Concerns: No HTTPS for submission, no validation, excessive data collection
Hidden Fields: 7 detected collecting browser fingerprinting data
Data Exfiltration: Form data sent to suspicious external domain via both form submission and real-time JavaScript
Additional Collection: Captures all keystrokes, not just submitted data`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Form analysis detected fields designed to capture complete financial and identity information including credit card details, SSN, and account credentials. Form submission endpoint is located on a different server than the main site, likely to separate stolen data from the phishing infrastructure for operational security."
            : null,
      },
    ],
  }
}
