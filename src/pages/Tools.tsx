import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const Tools = () => {
  return (
    <Router>
      <Routes>
        <Route path="/smart-link" element={<SmartLinkTool />} />
        <Route path="/url-cleaner" element={<UrlCleanerTool />} />
        <Route path="/qr-code" element={<QrCodeTool />} />
        <Route path="/link-validator" element={<LinkValidatorTool />} />
        <Route path="/platform-detector" element={<PlatformDetectorTool />} />
      </Routes>
    </Router>
  )
}

type SmartLinkResult = { success: boolean; error: string }
type UrlCleanerResult = { original: string; cleaned: string; removed: string[] }
type QrCodeState = { url: string; loading: boolean }
type LinkValidatorResult = { valid: boolean; errors: string[]; warnings: string[] }
type PlatformDetectResult = { platform: string; hostname: string; error?: string }

const SmartLinkTool = () => {
  const [url, setUrl] = React.useState("")
  const [platform, setPlatform] = React.useState("youtube")
  const [result, setResult] = React.useState<SmartLinkResult>({ success: false, error: "" })
  const [loading, setLoading] = React.useState(false)
  const platforms = ["youtube", "youtube-shorts", "instagram", "tiktok", "facebook", "x"]

  const detect = () => {
    setLoading(true)
    try {
      const parsedUrl = new URL(url)
      const hostname = parsedUrl.hostname.toLowerCase()
      let platform = "youtube"
      if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
        platform = "youtube"
        if (hostname.includes("shorts")) platform = "youtube-shorts"
      } else if (hostname.includes("instagram.com")) {
        platform = "instagram"
      } else if (hostname.includes("tiktok.com")) {
        platform = "tiktok"
      } else if (hostname.includes("facebook.com")) {
        platform = "facebook"
      } else if (hostname.includes("x.com") || hostname.includes("twitter.com")) {
        platform = "x"
      }
      setPlatform(platform)
      setResult({ success: true, error: "" })
    } catch {
      setResult({ success: false, error: "Invalid URL" })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Social Smart Link Helper</h2>
      <input
        style={{
          width: "100%", padding: "0.75rem", background: "#1a1a2e", border: "1px solid #333",
          borderRadius: "4px", color: "#fff", fontSize: "1rem", marginBottom: "1rem"
        }}
        placeholder="Enter a social media URL..." value={url} onChange={(e) => setUrl(e.target.value)}
      />
      <select
        style={{
          width: "100%", padding: "0.75rem", background: "#1a1a2e", border: "1px solid #333",
          borderRadius: "4px", color: "#fff", fontSize: "1rem", marginBottom: "1rem"
        }}
        value={platform} onChange={(e) => setPlatform(e.target.value)}
      >
        {platforms.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button
        style={{
          width: "100%", padding: "0.75rem", background: "#3b82f6", color: "#fff",
          border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer"
        }}
        onClick={detect}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {result.success && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#3b82f61a", borderRadius: "4px" }}>
          <p style={{ color: "#8b5cf6", fontWeight: "bold" }}>Platform: {platform}</p>
          <p style={{ color: "#e0e0e0" }}>
            <code style={{ color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }}>
              {result.success ? url : "unknown"}
            </code>
          </p>
          <button
            style={{ background: "none", color: "#8b5cf6", border: "1px solid #8b5cf6", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(url)}
          >
            Copy
          </button>
          <button
            style={{ background: "none", color: "#a0a0a0", border: "1px solid #a0a0a0", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => window.open(url, "_blank")}
          >
            Open
          </button>
        </div>
      )}
      {result.error && <p style={{ color: "#ff5f5f", marginTop: "1rem" }}>{result.error}</p>}
    </div>
  )
}

const UrlCleanerTool = () => {
  const [url, setUrl] = React.useState("")
  const [result, setResult] = React.useState<UrlCleanerResult>({ original: "", cleaned: "", removed: [] })
  const [loading, setLoading] = React.useState(false)

  const clean = () => {
    setLoading(true)
    try {
      const parsedUrl = new URL(url)
      const trackingParams = [
        "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
        "fbclid", "mc_cid", "mc_eid", "dclid", "gclid", "src", "medium", "campaign", "content", "term"
      ]
      const params = new URLSearchParams(parsedUrl.searchParams)
      const removed: string[] = []
      for (const [key, value] of parsedUrl.searchParams.entries()) {
        const lowerKey = key.toLowerCase()
        if (trackingParams.includes(lowerKey)) {
          params.delete(key)
          removed.push(key)
        }
      }
      setResult({
        original: url,
        cleaned: `${parsedUrl.origin}${parsedUrl.pathname}?${params.toString()}`,
        removed
      })
    } catch {
      setResult({ original: url, cleaned: "", removed: [] })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Social URL Cleaner</h2>
      <input
        style={{
          width: "100%", padding: "0.75rem", background: "#1a1a2e", border: "1px solid #333",
          borderRadius: "4px", color: "#fff", fontSize: "1rem", marginBottom: "1rem"
        }}
        placeholder="Enter a URL to clean" value={url} onChange={(e) => setUrl(e.target.value)}
      />
      <button
        style={{
          width: "100%", padding: "0.75rem", background: "#3b82f6", color: "#fff",
          border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer"
        }}
        onClick={clean}
      >
        {loading ? "Cleaning..." : "Clean"}
      </button>
      {result.original && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#e0e0e0" }}>
            Original:{ " "}
            <code style={{ color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }}>{result.original}</code>
          </p>
          <p style={{ color: "#e0e0e0" }}>
            Cleaned:{ " "}
            <code style={{ color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }}>{result.cleaned}</code>
          </p>
          {result.removed.length > 0 && (
            <p style={{ color: "#e0e0e0", fontSize: "0.875rem" }}>
              Removed: {result.removed.join(", ")}
            </p>
          )}
          <button
            style={{ background: "none", color: "#8b5cf6", border: "1px solid #8b5cf6", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(result.cleaned)}
          >
            Copy Cleaned
          </button>
        </div>
      )}
    </div>
  )
}

const QrCodeTool = () => {
  const [state, setState] = React.useState<QrCodeState>({ url: "", loading: false })

  const generate = () => {
    setState({ url: "", loading: true })
    setState({ url: "", loading: false })
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>QR Code Generator</h2>
      <input
        style={{
          width: "100%", padding: "0.75rem", background: "#1a1a2e", border: "1px solid #333",
          borderRadius: "4px", color: "#fff", fontSize: "1rem", marginBottom: "1rem"
        }}
        placeholder="Enter any HTTP or HTTPS URL" value={state.url} onChange={(e) => setState((s) => ({ ...s, url: e.target.value }))}
      />
      <button
        style={{
          width: "100%", padding: "0.75rem", background: "#3b82f6", color: "#fff",
          border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer"
        }}
        onClick={generate}
      >
        Generate
      </button>
      <p style={{ color: "#e0e0e0", marginTop: "1rem" }}>
        QR code generation in progress...
      </p>
    </div>
  )
}

const LinkValidatorTool = () => {
  const [url, setUrl] = React.useState("")
  const [result, setResult] = React.useState<LinkValidatorResult>({ valid: false, errors: [], warnings: [] })
  const [loading, setLoading] = React.useState(false)

  const validate = () => {
    setLoading(true)
    const errors: string[] = []
    const warnings: string[] = []
    try {
      const parsedUrl = new URL(url)
      if (!parsedUrl.protocol.startsWith("https:")) {
        errors.push("URL must use HTTPS")
      }
      const hostname = parsedUrl.hostname.toLowerCase()
      const socialPatterns = [
        /(youtube\.com|youtu\.be)/i,
        /(instagram\.com)/i,
        /(tiktok\.com)/i,
        /(facebook\.com)/i,
        /(x\.com|twitter\.com)/i
      ]
      const isSocial = socialPatterns.some(p => p.test(hostname))
      if (!isSocial && !hostname.includes("localhost")) {
        warnings.push("Not a recognized social platform")
      }
      setResult({ valid: errors.length === 0, errors, warnings })
    } catch {
      setResult({ valid: false, errors: ["Invalid URL"], warnings: [] })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Link Validator</h2>
      <input
        style={{
          width: "100%", padding: "0.75rem", background: "#1a1a2e", border: "1px solid #333",
          borderRadius: "4px", color: "#fff", fontSize: "1rem", marginBottom: "1rem"
        }}
        placeholder="Enter a URL to validate" value={url} onChange={(e) => setResult((r) => ({ ...r, valid: false }))}
      />
      <button
        style={{
          width: "100%", padding: "0.75rem", background: "#3b82f6", color: "#fff",
          border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer"
        }}
        onClick={validate}
      >
        {loading ? "Validating..." : "Validate"}
      </button>
      {result.valid !== undefined && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#e0e0e0" }}>
            Valid:{ " "}
            <strong>{result.valid ? "Yes" : "No"}</strong>
          </p>
          {result.errors.length > 0 && (
            <p style={{ color: "#ff5f5f", fontSize: "0.875rem" }}>
              Errors: {result.errors.join(", ")}
            </p>
          )}
          {result.warnings.length > 0 && (
            <p style={{ color: "#fbbf24", fontSize: "0.875rem" }}>
              Warnings: {result.warnings.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

const PlatformDetectorTool = () => {
  const [url, setUrl] = React.useState("")
  const [result, setResult] = React.useState<PlatformDetectResult>({ platform: "unknown", hostname: "" })
  const [loading, setLoading] = React.useState(false)

  const detect = () => {
    setLoading(true)
    try {
      const parsedUrl = new URL(url)
      const hostname = parsedUrl.hostname.toLowerCase()
      const parts = hostname.split(".")
      let platform = "unknown"

      if (parts.length > 2) {
        const mainDomain = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`
        if (mainDomain === "instagram.com") platform = "instagram"
        else if (mainDomain === "tiktok.com") platform = "tiktok"
        else if (mainDomain === "facebook.com") platform = "facebook"
        else if (mainDomain === "youtube.com") platform = "youtube"
        else if (mainDomain === "x.com") platform = "x"
      } else {
        if (hostname.includes("youtube") || hostname.includes("youtu")) platform = "youtube"
        else if (hostname.includes("instagram")) platform = "instagram"
        else if (hostname.includes("tiktok")) platform = "tiktok"
        else if (hostname.includes("facebook")) platform = "facebook"
        else if (hostname.includes("x") || hostname.includes("twitter")) platform = "x"
      }

      setResult({ platform, hostname })
    } catch {
      setResult({ platform: "unknown", hostname: "", error: "Invalid URL" })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Platform Detector</h2>
      <input
        style={{
          width: "100%", padding: "0.75rem", background: "#1a1a2e", border: "1px solid #333",
          borderRadius: "4px", color: "#fff", fontSize: "1rem", marginBottom: "1rem"
        }}
        placeholder="Enter a URL to detect platform" value={url} onChange={(e) => setResult((r) => ({ ...r, platform: "unknown", hostname: "" }))}
      />
      <button
        style={{
          width: "100%", padding: "0.75rem", background: "#3b82f6", color: "#fff",
          border: "none", borderRadius: "4px", fontSize: "1rem", cursor: "pointer"
        }}
        onClick={detect}
      >
        {loading ? "Detecting..." : "Detect"}
      </button>
      {result.platform !== "unknown" && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#8b5cf6", fontWeight: "bold" }}>Platform: {result.platform}</p>
          <p style={{ color: "#e0e0e0" }}>
            Hostname:{ " "}
            <code style={{ color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }}>{result.hostname}</code>
          </p>
          <button
            style={{ background: "none", color: "#8b5cf6", border: "1px solid #8b5cf6", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
            onClick={() => navigator.clipboard.writeText(result.hostname)}
          >
            Copy Hostname
          </button>
        </div>
      )}
      {result.platform === "unknown" && (
        <p style={{ color: "#ff5f5f", marginTop: "1rem" }}>{result.error || "Could not detect platform"}</p>
      )}
    </div>
  )
}

export default Tools