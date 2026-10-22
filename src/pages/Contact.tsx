const Contact = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#fff", fontSize: "2rem", marginBottom: "1rem" }}>
        Contact
      </h1>
      <p style={{ color: "#e0e0e0", lineHeight: "1.6" }}>
        If you'd like to get in touch with the ViralTap team, please email us at
        <a href="mailto:contact@viraltap.example" style={{ color: "#8b5cf6" }}>
          contact@viraltap.example
        </a>
      </p>
      <p style={{ color: "#6b7280", marginTop: "2rem", lineHeight: "1.6" }}>
        We welcome your feedback, questions, and suggestions. While we don't have a
        backend to process contact form submissions, we read every message sent to
        the email above.
      </p>
    </div>
  )
}

export default Contact