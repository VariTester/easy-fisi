import React from "react";

const SocialMedia = () => {
  return (
    <div className="social-icons">
      <a href="https://facebook.com/oficial.unap" target="_blank" rel="noopener noreferrer" className="icon facebook">
        <i className="fab fa-facebook-f"></i>
      </a>

      <a href="https://twitter.com/unapiquitos" target="_blank" rel="noopener noreferrer" className="icon twitter">
        <i className="fab fa-twitter"></i>
      </a>

      <a href="https://youtube.com/user/unapiquitos" target="_blank" rel="noopener noreferrer" className="icon youtube">
        <i className="fab fa-youtube"></i>
      </a>

      {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon instagram">
        <i className="fab fa-instagram"></i>
      </a> */}

      {/* <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="icon pinterest">
        <i className="fab fa-pinterest-p"></i>
      </a> */}
    </div>
  );
};

export default SocialMedia;
