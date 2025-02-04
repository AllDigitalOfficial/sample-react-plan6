import { Navbar, Container, Nav, Button } from "react-bootstrap";
import {   WalletConnect } from "../../components/index";

const Navbars = () => {
  const navbarBgColor =
    import.meta.env.VITE_APP_NAVBAR_BG_COLOR || "#343a40"; // Default to dark
  const buttonBgColor =
    import.meta.env.VITE_APP_BUTTON_BG_COLOR || "#007bff"; // Default to blue
  const buttonTextColor =
    import.meta.env.VITE_APP_BUTTON_TEXT_COLOR || "#ffffff"; // Default to white
  const buttonBorderColor =
    import.meta.env.VITE_APP_BUTTON_BORDER_COLOR || "#007bff"; // Default to blue
    const depositLink = import.meta.env.VITE_APP_DEPOSIT_LINK || "#deposit";  

    const buttonStyle = {
      backgroundColor: buttonBgColor,
      color: buttonTextColor,
      fontWeight: "bold",
      border: `1px solid ${buttonBorderColor}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

  return (
    <>
      <Navbar

        expand="lg"
        className="py-3 sticky-top container"
        style={{
          backgroundColor: navbarBgColor,
        }}
      >
        <Container >
          {/* Left: Logo */}
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              alt="Logo"
              src={import.meta.env.VITE_APP_LOGO || ""}
              className="img-fluid"
              style={{ maxWidth: "15%", height: "auto" }}
            />
          </Navbar.Brand>

          {/* Right: Buttons */}
          <Nav className="ms-auto d-flex align-items-center flex-wrap">
            <div className="d-flex gap-2 end-0">
            <Button href={depositLink} style={buttonStyle}>Deposit</Button>
             
              <Button
                variant="outline-light"
                className="btn-responsive"
                style={{
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                  borderColor: buttonBorderColor,
                }}
              >
             <WalletConnect />
              </Button>
               
            </div>
          </Nav>
        </Container>
      </Navbar>


      <style>{`
        /* For extra large screens */
        @media (min-width: 1200px) {
          .btn-responsive {
            font-size: 1.2rem;
            padding: 10px 20px;
          }
        }

        /* For smaller screens */
        @media (max-width: 768px) {
          .btn-responsive {
            font-size: 1rem;
            padding: 8px 16px;
          }

          .d-flex.flex-wrap {
            justify-content: space-between;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default Navbars;
