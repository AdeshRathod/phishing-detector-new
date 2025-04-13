// This is a mock implementation for demo purposes
// In a real application, you would implement actual image analysis logic

export function analyzeImage(isDemoMode = false, scanMode = "standard") {
  // For demo purposes, we'll return mock data
  // In a real application, you would implement actual checks

  if (isDemoMode) {
    return getMockImageAnalysisResult(scanMode)
  }

  // Basic implementation for non-demo mode
  // In a real application, you would implement actual image analysis

  // Simulate a medium-risk result for uploaded images
  const overallScore = 65

  return generateResults(overallScore, scanMode)
}

function generateResults(overallScore, scanMode) {
  let riskLevel = "Low Risk"
  let summary = "This image appears to be safe"
  let recommendation =
    "The image does not appear to contain phishing content, but always be cautious with messages from unknown sources."

  if (overallScore < 60) {
    riskLevel = "High Risk"
    summary = "This image likely contains phishing content"
    recommendation =
      "Do not interact with any links, QR codes, or contact information in this image. Delete the message and block the sender."
  } else if (overallScore < 80) {
    riskLevel = "Medium Risk"
    summary = "This image has some suspicious characteristics"
    recommendation =
      "Proceed with caution. Verify the sender's identity through official channels before taking any action based on this message."
  }

  const detailedSummary =
    overallScore >= 80
      ? "Based on our analysis, this image appears to be legitimate and does not contain phishing indicators. However, always exercise caution with messages from unknown sources."
      : overallScore >= 60
        ? "Our analysis has detected some suspicious elements in this image that could indicate phishing content. We recommend verifying the sender's identity before taking any action."
        : "Our analysis strongly indicates this image contains phishing content designed to steal personal information. We strongly advise against interacting with any links or contact information in this image."

  const checks = [
    {
      name: "Text Analysis",
      description: "Examines text in the image for phishing indicators and suspicious language",
      score: calculateTextScore(overallScore),
      findings: generateTextFindings(overallScore),
      details: generateTextDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateTextTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? "Advanced NLP analysis detected language patterns consistent with social engineering. Sentiment analysis shows high urgency and threat indicators. Text contains manipulative language designed to create fear or urgency."
          : null,
    },
    {
      name: "URL Detection",
      description: "Identifies and analyzes URLs present in the image",
      score: calculateUrlScore(overallScore),
      findings: generateUrlFindings(overallScore),
      details: generateUrlDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateUrlTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "Deep URL analysis detected obfuscated phishing links using URL shorteners and redirects. Domain registration analysis shows the destination domain was registered within the last 24 hours."
            : "No suspicious URLs detected in the image. All extracted URLs point to legitimate domains with established reputation."
          : null,
    },
    {
      name: "QR Code Analysis",
      description: "Detects and analyzes QR codes in the image",
      score: calculateQrScore(overallScore),
      findings: generateQrFindings(overallScore),
      details: generateQrDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateQrTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "QR code decoding revealed a malicious URL with multiple redirects. The final destination is a known phishing domain that mimics a legitimate banking website."
            : "No QR codes detected in the image, or the QR code points to a legitimate website."
          : null,
    },
    {
      name: "Brand Impersonation",
      description: "Detects attempts to impersonate trusted brands and services",
      score: calculateBrandScore(overallScore),
      findings: generateBrandFindings(overallScore),
      details: generateBrandDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateBrandTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "Visual analysis detected unauthorized use of brand logos and styling. The image attempts to mimic official communications from a financial institution. Logo comparison shows 94% similarity to legitimate brand assets."
            : "No brand impersonation detected. The image does not contain logos or styling that mimic known brands."
          : null,
    },
    {
      name: "Social Engineering Indicators",
      description: "Identifies social engineering tactics and manipulation techniques",
      score: calculateSocialScore(overallScore),
      findings: generateSocialFindings(overallScore),
      details: generateSocialDetails(overallScore),
      technicalDetails: scanMode !== "standard" ? generateSocialTechnicalDetails(overallScore) : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "Psychological analysis detected multiple manipulation techniques including urgency, authority, and scarcity. The message creates a false sense of urgency to bypass critical thinking."
            : "No significant social engineering tactics detected. The message does not use manipulation techniques to create urgency or fear."
          : null,
    },
  ]

  // Add advanced checks for more comprehensive scan modes
  if (scanMode === "advanced" || scanMode === "forensic") {
    checks.push({
      name: "Visual Pattern Recognition",
      description: "Uses AI to detect visual patterns common in phishing content",
      score: calculateVisualScore(overallScore),
      findings: generateVisualFindings(overallScore),
      details: generateVisualDetails(overallScore),
      technicalDetails:
        scanMode !== "standard"
          ? "Visual pattern analysis using convolutional neural networks to identify layouts, color schemes, and design elements commonly used in phishing content. Comparison with database of known phishing templates."
          : null,
      forensicData:
        scanMode === "forensic"
          ? overallScore < 60
            ? "Deep visual analysis detected layout patterns matching known phishing templates. The image uses visual elements designed to appear official while containing subtle inconsistencies typical of phishing content."
            : "Visual pattern analysis shows no match with known phishing templates. The image layout and design elements appear legitimate."
          : null,
    })
  }

  if (scanMode === "forensic") {
    checks.push({
      name: "Metadata Analysis",
      description: "Examines image metadata for suspicious indicators",
      score: calculateMetadataScore(overallScore),
      findings: generateMetadataFindings(overallScore),
      details: generateMetadataDetails(overallScore),
      technicalDetails:
        "Detailed analysis of EXIF data, creation timestamps, editing software, and other metadata to identify inconsistencies or manipulation. Examination of creation and modification dates to identify suspicious patterns.",
      forensicData:
        overallScore < 60
          ? "Metadata analysis revealed the image was recently created using editing software commonly associated with phishing campaigns. EXIF data has been partially stripped to hide origin information."
          : "Metadata analysis shows consistent and expected information. No signs of manipulation or suspicious editing detected.",
    })

    checks.push({
      name: "Steganography Detection",
      description: "Detects hidden data embedded in the image",
      score: calculateSteganographyScore(overallScore),
      findings: generateSteganographyFindings(overallScore),
      details: generateSteganographyDetails(overallScore),
      technicalDetails:
        "Advanced steganography detection algorithms to identify hidden data within the image. Analysis of least significant bit (LSB) encoding, discrete cosine transform coefficients, and other steganographic techniques.",
      forensicData:
        overallScore < 60
          ? "Steganography analysis detected hidden data embedded in the image using LSB encoding. The hidden content appears to contain obfuscated JavaScript that could be used for malicious purposes."
          : "No evidence of steganography or hidden data detected in the image. All pixel data appears normal with no suspicious patterns.",
    })
  }

  return {
    summary,
    detailedSummary,
    recommendation,
    riskLevel,
    checks,
  }
}

function calculateTextScore(overallScore) {
  // Simulate text analysis score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 5 + Math.floor(Math.random() * 10)))
}

function generateTextFindings(overallScore) {
  if (overallScore < 60) {
    return "The text in the image contains suspicious language patterns typical of phishing attempts"
  } else if (overallScore < 80) {
    return "Some text elements in the image require caution"
  }
  return "No suspicious text patterns detected in the image"
}

function generateTextDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Contains urgent language designed to create panic or immediate action",
      "Includes threats about account suspension or security issues",
      "Requests personal information or credentials",
      "Contains grammatical errors or awkward phrasing typical of phishing",
    ]
  } else if (overallScore < 80) {
    return [
      "Some urgency in language but not overtly threatening",
      "Requests action but doesn't explicitly ask for sensitive information",
      "Minor language inconsistencies present",
    ]
  }
  return [
    "No urgent or threatening language detected",
    "No requests for personal information or credentials",
    "Text appears professionally written without suspicious patterns",
  ]
}

function calculateUrlScore(overallScore) {
  // Simulate URL detection score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 10 + Math.floor(Math.random() * 15)))
}

function generateUrlFindings(overallScore) {
  if (overallScore < 60) {
    return "Suspicious URLs detected in the image that likely lead to phishing websites"
  } else if (overallScore < 80) {
    return "URLs detected that require verification before clicking"
  }
  return "No suspicious URLs detected in the image"
}

function generateUrlDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Contains URLs that mimic legitimate websites with slight variations",
      "Uses URL shorteners to hide the actual destination",
      "Links to recently registered domains with poor reputation",
      "Contains encoded or obfuscated URLs to evade detection",
    ]
  } else if (overallScore < 80) {
    return [
      "Contains URLs to legitimate domains but in an unusual context",
      "Uses URL shorteners which obscure the final destination",
      "Consider verifying URLs before visiting",
    ]
  }
  return [
    "No URLs detected in the image",
    "All detected URLs point to legitimate and well-established domains",
    "No URL shorteners or redirection chains detected",
  ]
}

function calculateQrScore(overallScore) {
  // Simulate QR code analysis score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 8 + Math.floor(Math.random() * 12)))
}

function generateQrFindings(overallScore) {
  if (overallScore < 60) {
    return "Malicious QR code detected that leads to a phishing website"
  } else if (overallScore < 80) {
    return "QR code detected that requires verification before scanning"
  }
  return "No QR codes detected or QR code leads to a legitimate website"
}

function generateQrDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "QR code leads to a phishing website designed to steal credentials",
      "Destination URL mimics a legitimate service but contains subtle differences",
      "QR code destination is a recently registered domain with suspicious characteristics",
      "QR code uses multiple redirects to hide the final destination",
    ]
  } else if (overallScore < 80) {
    return [
      "QR code present but destination requires verification",
      "QR code leads to a URL shortener which obscures the final destination",
      "Consider using a secure QR scanner that previews URLs before visiting",
    ]
  }
  return [
    "No QR codes detected in the image",
    "QR code leads to a legitimate and well-established website",
    "No suspicious redirects or URL patterns in the QR code destination",
  ]
}

function calculateBrandScore(overallScore) {
  // Simulate brand impersonation score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 7 + Math.floor(Math.random() * 10)))
}

function generateBrandFindings(overallScore) {
  if (overallScore < 60) {
    return "The image appears to be impersonating a well-known brand or organization"
  } else if (overallScore < 80) {
    return "Some brand elements present that require verification"
  }
  return "No brand impersonation detected"
}

function generateBrandDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Uses logos and branding from a legitimate company without authorization",
      "Visual design mimics official communications but contains inconsistencies",
      "Attempts to establish false legitimacy through brand association",
      "Contains subtle differences from official branding to avoid detection",
    ]
  } else if (overallScore < 80) {
    return [
      "Contains some brand elements but in an unusual context",
      "Brand representation has minor inconsistencies with official styling",
      "Consider verifying the message through official channels",
    ]
  }
  return [
    "No unauthorized use of brand logos or styling",
    "If brand elements are present, they appear consistent with official usage",
    "No attempt to falsely associate with trusted brands",
  ]
}

function calculateSocialScore(overallScore) {
  // Simulate social engineering score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 12 + Math.floor(Math.random() * 15)))
}

function generateSocialFindings(overallScore) {
  if (overallScore < 60) {
    return "The image contains strong social engineering tactics designed to manipulate the recipient"
  } else if (overallScore < 80) {
    return "Some social engineering elements present that require caution"
  }
  return "No significant social engineering tactics detected"
}

function generateSocialDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Creates a false sense of urgency to prompt immediate action",
      "Uses fear tactics about security issues or account problems",
      "Impersonates authority figures to establish false trust",
      "Offers unrealistic rewards or opportunities to entice interaction",
    ]
  } else if (overallScore < 80) {
    return [
      "Contains some urgency but not overtly threatening",
      "Requests action but without extreme pressure tactics",
      "Uses mild emotional triggers to encourage response",
    ]
  }
  return [
    "No artificial urgency or pressure tactics",
    "No fear-based manipulation or threats",
    "No impersonation of authority figures or false trust establishment",
  ]
}

function calculateVisualScore(overallScore) {
  // Simulate visual pattern score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 5 + Math.floor(Math.random() * 10)))
}

function generateVisualFindings(overallScore) {
  if (overallScore < 60) {
    return "The visual design of the image matches patterns commonly seen in phishing content"
  } else if (overallScore < 80) {
    return "Some visual elements require caution"
  }
  return "No suspicious visual patterns detected"
}

function generateVisualDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Layout and design elements match known phishing templates",
      "Visual inconsistencies typical of fraudulent communications",
      "Uses design elements to create false sense of legitimacy",
      "Poor quality or misaligned visual elements typical of phishing",
    ]
  } else if (overallScore < 80) {
    return [
      "Some visual elements match patterns seen in suspicious content",
      "Minor visual inconsistencies present",
      "Design quality varies throughout the image",
    ]
  }
  return [
    "Visual design appears consistent and professional",
    "No match with known phishing visual patterns",
    "Design elements appear legitimate and consistent",
  ]
}

function calculateMetadataScore(overallScore) {
  // Simulate metadata score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 3 + Math.floor(Math.random() * 8)))
}

function generateMetadataFindings(overallScore) {
  if (overallScore < 60) {
    return "Image metadata contains suspicious indicators"
  } else if (overallScore < 80) {
    return "Some metadata elements require verification"
  }
  return "No suspicious indicators in image metadata"
}

function generateMetadataDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Recently created or modified using tools commonly associated with phishing",
      "Metadata has been partially stripped to hide origin information",
      "Creation timestamps inconsistent with claimed source",
      "Editing history suggests manipulation of original content",
    ]
  } else if (overallScore < 80) {
    return [
      "Some metadata elements appear unusual but not definitively suspicious",
      "Minor inconsistencies in creation or modification timestamps",
      "Consider verifying the source of the image",
    ]
  }
  return [
    "Metadata appears consistent and expected",
    "No signs of suspicious editing or manipulation",
    "Creation and modification information appears legitimate",
  ]
}

function calculateSteganographyScore(overallScore) {
  // Simulate steganography score based on overall risk
  return Math.max(0, Math.min(100, overallScore - 2 + Math.floor(Math.random() * 7)))
}

function generateSteganographyFindings(overallScore) {
  if (overallScore < 60) {
    return "Hidden data detected embedded within the image"
  } else if (overallScore < 80) {
    return "Some unusual patterns detected that may indicate hidden content"
  }
  return "No hidden data detected in the image"
}

function generateSteganographyDetails(overallScore) {
  if (overallScore < 60) {
    return [
      "Steganographic analysis detected hidden data using LSB encoding",
      "Hidden content appears to contain obfuscated code or tracking information",
      "Unusual pixel patterns consistent with data hiding techniques",
      "Statistical analysis indicates high probability of embedded content",
    ]
  } else if (overallScore < 80) {
    return [
      "Some statistical anomalies detected in pixel distribution",
      "Minor patterns that could indicate data hiding but not conclusive",
      "Consider further analysis if the image is from an untrusted source",
    ]
  }
  return [
    "No evidence of steganography or hidden data",
    "Pixel distribution appears normal with no suspicious patterns",
    "Statistical analysis shows no indicators of embedded content",
  ]
}

// Technical details generators for advanced scan modes
function generateTextTechnicalDetails(overallScore) {
  if (overallScore < 60) {
    return `Text Analysis:
OCR Engine: Tesseract 5.0
Confidence: 98.7%
Language: English
Extracted Text Length: 142 characters
Urgency Keywords: 7 detected
Threat Keywords: 5 detected
Request Keywords: 3 detected
Grammar Analysis: Multiple errors detected
Sentiment Analysis: Negative (0.78), Urgency (0.92)
NLP Classification: 89% match with phishing patterns`
  } else if (overallScore < 80) {
    return `Text Analysis:
OCR Engine: Tesseract 5.0
Confidence: 99.1%
Language: English
Extracted Text Length: 118 characters
Urgency Keywords: 2 detected
Threat Keywords: 1 detected
Request Keywords: 1 detected
Grammar Analysis: Minor inconsistencies
Sentiment Analysis: Neutral (0.42), Urgency (0.56)
NLP Classification: 62% match with phishing patterns`
  } else {
    return `Text Analysis:
OCR Engine: Tesseract 5.0
Confidence: 99.5%
Language: English
Extracted Text Length: 95 characters
Urgency Keywords: 0 detected
Threat Keywords: 0 detected
Request Keywords: 0 detected
Grammar Analysis: Professional writing
Sentiment Analysis: Neutral (0.31), Urgency (0.12)
NLP Classification: 8% match with phishing patterns`
  }
}

function generateUrlTechnicalDetails(overallScore) {
  if (overallScore < 60) {
    return `URL Analysis:
URLs Detected: 3
URL Types: 1 shortened, 2 direct
Domain Age: < 48 hours
TLD Analysis: .xyz, .online (high-risk TLDs)
Levenshtein Distance from Legitimate Domains: 1-2 characters
Redirect Chains: 2 detected (3 hops, 4 hops)
Domain Reputation: Flagged in 2 security databases
SSL Certificate: Recently issued (< 24 hours)
Homograph Attack: Unicode characters detected`
  } else if (overallScore < 80) {
    return `URL Analysis:
URLs Detected: 2
URL Types: 1 shortened, 1 direct
Domain Age: 3 months
TLD Analysis: .com, .net (standard TLDs)
Levenshtein Distance from Legitimate Domains: N/A
Redirect Chains: 1 detected (2 hops)
Domain Reputation: No flags in security databases
SSL Certificate: Valid, 3 months old
Homograph Attack: None detected`
  } else {
    return `URL Analysis:
URLs Detected: 1
URL Types: 1 direct
Domain Age: > 5 years
TLD Analysis: .com (standard TLD)
Levenshtein Distance from Legitimate Domains: N/A
Redirect Chains: None detected
Domain Reputation: Positive reputation in security databases
SSL Certificate: Valid, 6 months old
Homograph Attack: None detected`
  }
}

function generateQrTechnicalDetails(overallScore) {
  if (overallScore < 60) {
    return `QR Code Analysis:
QR Codes Detected: 1
QR Type: URL
Error Correction Level: L
Version: 3
Destination URL: hxxps://shortened-url.xyz/a1b2c3
Redirect Chain: 3 hops detected
Final Destination: Mimics banking website
Domain Age: < 24 hours
SSL Certificate: Recently issued
Reputation: Flagged in security databases`
  } else if (overallScore < 80) {
    return `QR Code Analysis:
QR Codes Detected: 1
QR Type: URL
Error Correction Level: M
Version: 2
Destination URL: https://url-shortener.com/a1b2c3
Redirect Chain: 1 hop detected
Final Destination: Legitimate domain
Domain Age: 2 years
SSL Certificate: Valid
Reputation: No flags in security databases`
  } else {
    return `QR Code Analysis:
QR Codes Detected: 0
No QR codes detected in the image.`
  }
}

function generateBrandTechnicalDetails(overallScore) {
  if (overallScore < 60) {
    return `Brand Analysis:
Brand Detected: PayPal
Logo Match: 92% similarity
Color Scheme Match: 89% similarity
Font Match: 76% similarity
Layout Match: 85% similarity with official communications
Visual Inconsistencies: 7 detected
Unauthorized Use: Likely
Brand Protection Database: Flagged as unauthorized`
  } else if (overallScore < 80) {
    return `Brand Analysis:
Brand Detected: Microsoft
Logo Match: 98% similarity
Color Scheme Match: 95% similarity
Font Match: 92% similarity
Layout Match: 88% similarity with official communications
Visual Inconsistencies: 2 detected
Unauthorized Use: Possible
Brand Protection Database: No flags`
  } else {
    return `Brand Analysis:
Brand Detected: None
No unauthorized brand usage detected.
If brand elements are present, they appear to be used legitimately.`
  }
}

function generateSocialTechnicalDetails(overallScore) {
  if (overallScore < 60) {
    return `Social Engineering Analysis:
Manipulation Techniques: 5 detected
Urgency Indicators: High (0.92)
Fear Indicators: High (0.87)
Authority Impersonation: Present
Reward/Opportunity Bait: Present
Scarcity Tactics: Present
Psychological Triggers: Multiple detected
Persuasion Techniques: Cialdini's principles of authority, scarcity, and urgency
Behavioral Manipulation Score: 8.7/10`
  } else if (overallScore < 80) {
    return `Social Engineering Analysis:
Manipulation Techniques: 2 detected
Urgency Indicators: Medium (0.58)
Fear Indicators: Low (0.32)
Authority Impersonation: Absent
Reward/Opportunity Bait: Present
Scarcity Tactics: Absent
Psychological Triggers: Minor detected
Persuasion Techniques: Mild use of urgency
Behavioral Manipulation Score: 4.3/10`
  } else {
    return `Social Engineering Analysis:
Manipulation Techniques: 0 detected
Urgency Indicators: Low (0.12)
Fear Indicators: Low (0.08)
Authority Impersonation: Absent
Reward/Opportunity Bait: Absent
Scarcity Tactics: Absent
Psychological Triggers: None detected
Persuasion Techniques: None detected
Behavioral Manipulation Score: 1.2/10`
  }
}

function getMockImageAnalysisResult(scanMode) {
  // This is a mock result for demonstration purposes
  return {
    summary: "This image likely contains phishing content",
    detailedSummary:
      "Our analysis strongly indicates this image contains phishing content designed to steal personal information. Multiple security checks have failed, including suspicious text patterns, malicious URLs, and social engineering tactics.",
    recommendation:
      "Do not interact with any links, QR codes, or contact information in this image. Delete the message and block the sender.",
    riskLevel: "High Risk",
    checks: [
      {
        name: "Text Analysis",
        description: "Examines text in the image for phishing indicators and suspicious language",
        score: 25,
        findings: "The text in the image contains highly suspicious language patterns typical of phishing attempts",
        details: [
          "Contains urgent language about account security issues",
          "Threatens immediate account suspension without action",
          "Requests login credentials or personal information",
          "Contains grammatical errors and awkward phrasing typical of phishing",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Text Analysis:
OCR Engine: Tesseract 5.0
Confidence: 98.2%
Language: English
Extracted Text Length: 156 characters
Urgency Keywords: 8 detected (immediate, urgent, suspended, required, now, action required, security alert, limited time)
Threat Keywords: 6 detected (suspended, unauthorized, security breach, compromised, locked, violation)
Request Keywords: 4 detected (verify, confirm, enter, provide)
Grammar Analysis: Multiple errors detected
Sentiment Analysis: Negative (0.82), Urgency (0.94)
NLP Classification: 92% match with phishing patterns`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Advanced NLP analysis detected language patterns consistent with social engineering. Text contains multiple urgency and threat indicators designed to create panic and bypass critical thinking. Linguistic analysis shows patterns consistent with non-native English speakers commonly associated with phishing campaigns."
            : null,
      },
      {
        name: "URL Detection",
        description: "Identifies and analyzes URLs present in the image",
        score: 15,
        findings: "Multiple suspicious URLs detected that likely lead to phishing websites",
        details: [
          "Contains URLs that mimic legitimate banking websites with slight variations",
          "Uses URL shorteners to hide the actual destination",
          "Links to recently registered domains with poor reputation",
          "Contains encoded characters in URLs to evade detection",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `URL Analysis:
URLs Detected: 3
URL Types: 2 shortened, 1 direct
Extracted URLs:
  - hxxps://bit.ly/3xR4Tz9
  - hxxps://tinyurl.com/y7h2x9p3
  - hxxps://secure-banking-portal.xyz/login
Domain Age: < 24 hours for final destination
TLD Analysis: .xyz (high-risk TLD)
Levenshtein Distance: 2 characters from legitimate banking domain
Redirect Chains: 2 detected (4 hops, 3 hops)
Domain Reputation: Flagged in 3 security databases
SSL Certificate: Recently issued (< 12 hours)
Homograph Attack: Unicode characters detected in domain`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Deep URL analysis revealed sophisticated obfuscation techniques. The shortened URLs lead through multiple redirects before reaching the final phishing domain. The destination website uses a recently registered domain that mimics a legitimate banking website with subtle character substitutions. The domain is hosted on infrastructure previously associated with phishing campaigns."
            : null,
      },
      {
        name: "QR Code Analysis",
        description: "Detects and analyzes QR codes in the image",
        score: 20,
        findings: "Malicious QR code detected that leads to a phishing website",
        details: [
          "QR code leads to a phishing website designed to steal credentials",
          "Destination URL mimics a legitimate banking service",
          "QR code destination is a recently registered domain",
          "Uses multiple redirects to hide the final destination",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `QR Code Analysis:
QR Codes Detected: 1
QR Type: URL
Error Correction Level: L
Version: 3
Destination URL: hxxps://bit.ly/3xR4Tz9
Redirect Chain: 3 hops detected
Final Destination: hxxps://secure-banking-portal.xyz/login
Domain Age: < 24 hours
SSL Certificate: Recently issued
Reputation: Flagged in security databases
QR Code Position: Bottom right corner of image
QR Code Size: 150x150 pixels`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "QR code decoding revealed a malicious URL with multiple redirects. The final destination is a known phishing domain that mimics a legitimate banking website. The QR code uses a low error correction level to make it harder to modify for analysis purposes. The destination website contains form fields designed to capture banking credentials and personal information."
            : null,
      },
      {
        name: "Brand Impersonation",
        description: "Detects attempts to impersonate trusted brands and services",
        score: 10,
        findings: "The image is clearly impersonating a well-known banking institution",
        details: [
          "Uses logos and branding from a legitimate bank without authorization",
          "Visual design mimics official bank communications",
          "Contains unauthorized use of trademarked elements",
          "Subtle inconsistencies in branding compared to official materials",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Brand Analysis:
Brand Detected: Chase Bank
Logo Match: 94% similarity
Color Scheme Match: 92% similarity
Font Match: 78% similarity
Layout Match: 88% similarity with official communications
Visual Inconsistencies: 6 detected
Unauthorized Use: Confirmed
Brand Protection Database: Flagged as unauthorized
Visual Elements:
  - Logo position: Top left corner
  - Color scheme: Blue and white (matches official)
  - Typography: Similar but not identical to official fonts
  - Header styling: Mimics official emails`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Visual analysis confirmed unauthorized use of Chase Bank branding elements. The image contains the official logo with subtle modifications to avoid exact matching detection. Layout analysis shows the image was designed to closely mimic official Chase Bank communications, with careful attention to color schemes and typography to establish false legitimacy."
            : null,
      },
      {
        name: "Social Engineering Indicators",
        description: "Identifies social engineering tactics and manipulation techniques",
        score: 5,
        findings: "The image contains multiple social engineering tactics designed to manipulate the recipient",
        details: [
          "Creates a false sense of urgency about account security",
          "Uses fear tactics about unauthorized access",
          "Impersonates a trusted financial institution",
          "Pressures recipient to act immediately to avoid consequences",
        ],
        technicalDetails:
          scanMode !== "standard"
            ? `Social Engineering Analysis:
Manipulation Techniques: 6 detected
Urgency Indicators: High (0.96)
Fear Indicators: High (0.92)
Authority Impersonation: Present (financial institution)
Reward/Opportunity Bait: Absent
Scarcity Tactics: Present (time-limited action required)
Psychological Triggers: Multiple detected
Persuasion Techniques: Cialdini's principles of authority, scarcity, and urgency
Behavioral Manipulation Score: 9.2/10
Key Phrases:
  - "Immediate action required"
  - "Account will be suspended"
  - "Unauthorized access detected"
  - "Verify your identity now"
  - "Security alert: Limited time to respond"`
            : null,
        forensicData:
          scanMode === "forensic"
            ? "Psychological analysis detected sophisticated manipulation techniques designed to bypass critical thinking. The message creates a false sense of urgency through explicit threats of account suspension and security breaches. It leverages authority principles by impersonating a trusted financial institution and uses fear as the primary motivator for immediate action."
            : null,
      },
    ],
  }
}
