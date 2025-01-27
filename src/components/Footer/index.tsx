const Footer = () => {
  // Get environment variable values
  const copyrightText =
    import.meta.env.VITE_APP_COPYRIGHT_TEXT || "Default Copyright Text.";
  const bgColor = import.meta.env.VITE_APP_COPYRIGHT_BG_COLOR || "#f8f9fa"; // Default background color
  const textColor = import.meta.env.VITE_APP_COPYRIGHT_TEXT_COLOR || "#000000"; // Default text color

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="footer-content text-center py-3">
        <p>&copy; {copyrightText}</p>
      </div>
    </footer>
  );
};

export default Footer;
