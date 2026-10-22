const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#fff", fontSize: "2rem", marginBottom: "1rem" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "#e0e0e0", lineHeight: "1.6" }}>
        <strong>Last updated:</strong> October 2026
      </p>
      <ol style={{ color: "#e0e0e0", lineHeight: "1.6", marginBottom: "1.5rem" }}>
        <li>
          <strong>Information we process:</strong> All processing in ViralTap happens
          entirely within your browser. We do not store your URLs, track your usage, or
          collect any personal data.
        </li>
        <li>
          <strong>Third-party advertising:</strong> ViralTap may display Google AdSense
          advertisements. Google and its partners may use cookies or similar technologies
          to serve and measure ads. This data collection is subject to Google's privacy
          policies and your AdSense settings.
        </li>
        <li>
          <strong>Cookies:</strong> ViralTap uses essential cookies to enable core
          functionality. Analytics cookies are not used. You can disable cookies in your
          browser settings.
        </li>
      </ol>
      <p style={{ color: "#6b7280", marginTop: "2rem", lineHeight: "1.6" }}>
        <strong>Google Advertising Privacy:</strong> You can consult Google's privacy
        page to learn more about how Google uses advertising data. You can also opt-out
        of personalized advertising through Google Settings or the Network Advertising
        Initiative opt-out plugin.
      </p>
    </div>
  )
}

export default PrivacyPolicy