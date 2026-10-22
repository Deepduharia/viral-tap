import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Tools = () => {
    const [url, setUrl] = React.useState("");
    const [selectedPlatform, setSelectedPlatform] = React.useState("youtube");
    const [result, setResult] = React.useState({ platform: "youtube", normalizedUrl: "", error: "" });
    const [cleanResult, setCleanResult] = React.useState({ originalUrl: "", cleanedUrl: "", removedParams: [], error: "" });
    const [qrCodeData, setQrCodeData] = React.useState(null);
    const [validationResult, setValidationResult] = React.useState({ isValid: false, errors: [], warnings: [] });
    const [detectResult, setDetectResult] = React.useState({ platform: "unknown", hostname: "" });
    const [loading, setLoading] = React.useState(false);
    const platforms = ["youtube", "youtube-shorts", "instagram", "tiktok", "facebook", "x"];
    const handleAnalyze = () => {
        setLoading(true);
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname.toLowerCase();
            let platform = "youtube";
            let normalized = url;
            if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
                platform = "youtube";
                if (hostname.includes("shorts"))
                    platform = "youtube-shorts";
                normalized = parsedUrl.origin + parsedUrl.pathname;
            }
            else if (hostname.includes("instagram.com")) {
                platform = "instagram";
                normalized = parsedUrl.origin + parsedUrl.pathname;
            }
            else if (hostname.includes("tiktok.com")) {
                platform = "tiktok";
                normalized = parsedUrl.origin + parsedUrl.pathname;
            }
            else if (hostname.includes("facebook.com")) {
                platform = "facebook";
                normalized = parsedUrl.origin + parsedUrl.pathname;
            }
            else if (hostname.includes("x.com") || hostname.includes("twitter.com")) {
                platform = "x";
                normalized = parsedUrl.origin + parsedUrl.pathname;
            }
            else {
                setResult({ platform: "unknown", normalizedUrl: url, error: "Unsupported platform" });
                setLoading(false);
                return;
            }
            setResult({ platform, normalizedUrl: normalized });
        }
        catch {
            setResult({ platform: "unknown", normalizedUrl: url, error: "Invalid URL" });
        }
        setLoading(false);
    };
    const handleClean = () => {
        setLoading(true);
        try {
            const parsedUrl = new URL(url);
            const removedParams = [];
            const trackingParams = [
                "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
                "fbclid", "mc_cid", "mc_eid", "dclid", "gclid", "src", "medium", "campaign", "content", "term"
            ];
            const params = new URLSearchParams(parsedUrl.searchParams);
            for (const [key, value] of parsedUrl.searchParams.entries()) {
                const lowerKey = key.toLowerCase();
                if (trackingParams.includes(lowerKey)) {
                    params.delete(key);
                    removedParams.push(key);
                }
            }
            const cleanedUrl = `${parsedUrl.origin}${parsedUrl.pathname}?${params.toString()}`;
            setCleanResult({
                originalUrl: url,
                cleanedUrl: removedParams.length > 0 ? cleanedUrl : url,
                removedParams
            });
        }
        catch {
            setCleanResult({ originalUrl: url, cleanedUrl: "", removedParams: [], error: "Invalid URL" });
        }
        setLoading(false);
    };
    const generateQR = () => {
        setQrCodeData(url);
    };
    const validate = () => {
        const errors = [];
        const warnings = [];
        try {
            const parsedUrl = new URL(url);
            if (!parsedUrl.protocol.startsWith("https:")) {
                errors.push("URL must use HTTPS");
            }
            const hostname = parsedUrl.hostname.toLowerCase();
            if (hostname.includes(".") && !hostname.startsWith("www.")) {
                const parts = hostname.split(".");
                if (parts.length > 2)
                    warnings.push("Multiple subdomains");
            }
            const socialPatterns = [
                /(youtube\.com|youtu\.be)/i,
                /(instagram\.com)/i,
                /(tiktok\.com)/i,
                /(facebook\.com)/i,
                /(x\.com|twitter\.com)/i
            ];
            const isSocial = socialPatterns.some(p => p.test(hostname));
            if (!isSocial && !hostname.includes("localhost")) {
                warnings.push("Not a recognized social platform");
            }
            setValidationResult({ isValid: errors.length === 0, errors, warnings });
        }
        catch {
            setValidationResult({ isValid: false, errors: ["Invalid URL"], warnings: [] });
        }
    };
    const detect = () => {
        setLoading(true);
        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname.toLowerCase();
            const parts = hostname.split(".");
            let platform = "unknown";
            if (parts.length > 2) {
                const mainDomain = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
                if (mainDomain === "instagram.com")
                    platform = "instagram";
                else if (mainDomain === "tiktok.com")
                    platform = "tiktok";
                else if (mainDomain === "facebook.com")
                    platform = "facebook";
                else if (mainDomain === "youtube.com")
                    platform = "youtube";
                else if (mainDomain === "x.com")
                    platform = "x";
            }
            else {
                if (hostname.includes("youtube") || hostname.includes("youtu"))
                    platform = "youtube";
                else if (hostname.includes("instagram"))
                    platform = "instagram";
                else if (hostname.includes("tiktok"))
                    platform = "tiktok";
                else if (hostname.includes("facebook"))
                    platform = "facebook";
                else if (hostname.includes("x") || hostname.includes("twitter"))
                    platform = "x";
            }
            setDetectResult({ platform, hostname });
        }
        catch {
            setDetectResult({ platform: "unknown", hostname: "", error: "Invalid URL" });
        }
        setLoading(false);
    };
    return (_jsxs("div", { style: { padding: "2rem", maxWidth: "1200px", margin: "0 auto" }, children: [_jsx("h2", { style: { color: "#fff", fontSize: "2rem", marginBottom: "1.5rem" }, children: "All Tools" }), _jsx("p", { style: { color: "#a0a0a0", marginBottom: "1.5rem" }, children: "Select a tool to get started" }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit", gap: "1rem" }, children: [_jsx("div", { style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            padding: "1rem",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }, onClick: () => alert("Smart Link Helper clicked"), style: { color: "#e0e0e0" }, children: "Social Smart Link Helper" }), _jsx("div", { style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            padding: "1rem",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }, style: { color: "#e0e0e0" }, children: "Social URL Cleaner" }), _jsx("div", { style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            padding: "1rem",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }, style: { color: "#e0e0e0" }, children: "QR Code Generator" }), _jsx("div", { style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            padding: "1rem",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }, style: { color: "#e0e0e0" }, children: "Link Validator" }), _jsx("div", { style: {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            padding: "1rem",
                            cursor: "pointer",
                            transition: "background 0.2s",
                        }, style: { color: "#e0e0e0" }, children: "Platform Detector" })] }), _jsxs("div", { style: { marginTop: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }, children: [_jsx("h3", { style: { color: "#fff", marginBottom: "1rem" }, children: "Social Smart Link Helper" }), _jsx("input", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a2e",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "1rem",
                            marginBottom: "1rem",
                        }, placeholder: "Enter a social media URL...", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("select", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a2e",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "1rem",
                            marginBottom: "1rem",
                        }, value: selectedPlatform, onChange: (e) => setSelectedPlatform(e.target.value), children: platforms.map((p) => (_jsx("option", { value: p, children: p }, p))) }), _jsx("button", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            cursor: "pointer",
                            marginBottom: "1rem",
                        }, onClick: handleAnalyze, children: loading ? "Analyzing..." : "Analyze Link" }), result.error && (_jsx("p", { style: { color: "#ff5f5f", marginBottom: "1rem" }, children: result.error })), result.platform !== "unknown" && (_jsxs("div", { children: [_jsxs("p", { style: { color: "#8b5cf6", fontWeight: "bold", marginBottom: "0.5rem" }, children: ["Detected Platform: ", result.platform] }), _jsxs("p", { style: { color: "#e0e0e0" }, children: ["Normalized URL:", " ", _jsx("code", { style: { color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }, children: result.normalizedUrl })] }), _jsx("button", { style: {
                                    background: "none",
                                    color: "#8b5cf6",
                                    border: "1px solid #8b5cf6",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    marginRight: "0.5rem",
                                }, onClick: () => navigator.clipboard.writeText(result.normalizedUrl), children: "Copy" }), _jsx("button", { style: {
                                    background: "none",
                                    color: "#a0a0a0",
                                    border: "1px solid #a0a0a0",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }, onClick: () => window.open(result.normalizedUrl, "_blank"), children: "Open" })] })), result.platform === "youtube" && (_jsx("p", { style: { color: "#e0e0e0", marginTop: "1rem" }, children: "For YouTube URLs, use the Open button to attempt opening in the relevant app. Automatic deep-link behavior varies by device, installed apps, and in-app browser restrictions." }))] }), _jsxs("div", { style: { marginTop: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }, children: [_jsx("h3", { style: { color: "#fff", marginBottom: "1rem" }, children: "Social URL Cleaner" }), _jsx("input", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a2e",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "1rem",
                            marginBottom: "1rem",
                        }, placeholder: "Enter a URL to clean", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("button", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }, onClick: handleClean, children: loading ? "Cleaning..." : "Clean URL" }), cleanResult.originalUrl && (_jsxs("div", { children: [_jsxs("p", { style: { color: "#e0e0e0", marginBottom: "0.5rem" }, children: ["Original:", " ", _jsx("code", { style: { color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }, children: cleanResult.originalUrl })] }), _jsxs("p", { style: { color: "#e0e0e0" }, children: ["Cleaned:", " ", _jsx("code", { style: { color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }, children: cleanResult.cleanedUrl })] }), cleanResult.removedParams.length > 0 && (_jsxs("p", { style: { color: "#e0e0e0", fontSize: "0.875rem" }, children: ["Removed: ", cleanResult.removedParams.join(", ")] })), _jsx("button", { style: {
                                    background: "none",
                                    color: "#8b5cf6",
                                    border: "1px solid #8b5cf6",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }, onClick: () => navigator.clipboard.writeText(cleanResult.cleanedUrl), children: "Copy Cleaned" })] })), cleanResult.error && (_jsx("p", { style: { color: "#ff5f5f", marginTop: "1rem" }, children: cleanResult.error }))] }), _jsxs("div", { style: { marginTop: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }, children: [_jsx("h3", { style: { color: "#fff", marginBottom: "1rem" }, children: "QR Code Generator" }), _jsx("input", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a2e",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "1rem",
                            marginBottom: "1rem",
                        }, placeholder: "Enter any HTTP or HTTPS URL", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("button", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }, onClick: generateQR, children: loading ? "Generating..." : "Generate QR Code" }), qrCodeData && (_jsxs("div", { children: [_jsxs("p", { style: { color: "#e0e0e0", marginBottom: "0.5rem" }, children: [_jsx("strong", { children: "QR Code:" }), " Scan to share your link"] }), _jsx("p", { style: { color: "#6b7280", fontSize: "0.875rem" }, children: "QR generated in your browser. No data is transmitted to any server." }), _jsx("button", { style: {
                                    background: "none",
                                    color: "#8b5cf6",
                                    border: "1px solid #8b5cf6",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }, onClick: () => navigator.clipboard.writeText(url), children: "Copy URL" }), _jsx("button", { style: {
                                    background: "none",
                                    color: "#6b7280",
                                    border: "1px solid #6b7280",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }, children: "Download PNG" })] }))] }), _jsxs("div", { style: { marginTop: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }, children: [_jsx("h3", { style: { color: "#fff", marginBottom: "1rem" }, children: "Link Validator" }), _jsx("input", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a2e",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "1rem",
                            marginBottom: "1rem",
                        }, placeholder: "Enter a URL to validate", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("button", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }, onClick: validate, children: loading ? "Validating..." : "Validate" }), validationResult.isValid !== undefined && (_jsxs("div", { children: [_jsxs("p", { style: { color: "#e0e0e0", marginBottom: "0.5rem" }, children: ["Valid: ", _jsx("strong", { children: validationResult.isValid ? "Yes" : "No" })] }), validationResult.errors.length > 0 && (_jsxs("p", { style: { color: "#ff5f5f", fontSize: "0.875rem" }, children: ["Errors: ", validationResult.errors.join(", ")] })), validationResult.warnings.length > 0 && (_jsxs("p", { style: { color: "#fbbf24", fontSize: "0.875rem" }, children: ["Warnings: ", validationResult.warnings.join(", ")] }))] }))] }), _jsxs("div", { style: { marginTop: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px" }, children: [_jsx("h3", { style: { color: "#fff", marginBottom: "1rem" }, children: "Social Platform Detector" }), _jsx("input", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#1a1a2e",
                            border: "1px solid #333",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "1rem",
                            marginBottom: "1rem",
                        }, placeholder: "Enter a URL to detect platform", value: url, onChange: (e) => setUrl(e.target.value) }), _jsx("button", { style: {
                            width: "100%",
                            padding: "0.75rem",
                            background: "#3b82f6",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "1rem",
                            cursor: "pointer",
                        }, onClick: detect, children: loading ? "Detecting..." : "Detect Platform" }), detectResult.platform !== "unknown" && (_jsxs("div", { children: [_jsxs("p", { style: { color: "#8b5cf6", fontWeight: "bold", marginBottom: "0.5rem" }, children: ["Platform: ", detectResult.platform] }), _jsxs("p", { style: { color: "#e0e0e0" }, children: ["Hostname: ", _jsx("code", { style: { color: "#a0a0a0", background: "#1a1a2e", padding: "0 0.25rem", borderRadius: "3px" }, children: detectResult.hostname })] }), _jsx("button", { style: {
                                    background: "none",
                                    color: "#8b5cf6",
                                    border: "1px solid #8b5cf6",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }, onClick: () => navigator.clipboard.writeText(detectResult.hostname), children: "Copy Hostname" })] })), detectResult.error && (_jsx("p", { style: { color: "#ff5f5f", marginTop: "1rem" }, children: detectResult.error }))] })] }));
};
export default Tools;
