const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#02402E",
        color: "white",
      }}
    >
      <div>
        <div>
          &copy; {new Date().getFullYear()} Copyright{" "}
          <a href="">Fun with AI by Mario Rojas</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
