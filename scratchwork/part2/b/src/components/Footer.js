const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '16px',
  };

  return (
    <div style={footerStyle}>
      <br />
      <i>
        Note app; Department of Computer Science, University of Helsinki; 2022
      </i>
    </div>
  );
};

export default Footer;
