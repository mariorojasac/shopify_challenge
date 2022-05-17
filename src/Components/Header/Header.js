import shopifyLogo from "./shopifylogo.jpeg";

const Header = () => {
  return (
    <header>
      <img src={shopifyLogo} alt="shopify logo" width="200" />
      <h1>Challenge</h1>
    </header>
  );
};

export default Header;
