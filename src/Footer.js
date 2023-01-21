import { FaBeer, FaLinkedin, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <div className="container">
          <div className="col">
            <h4>Oscar Wong</h4>
            <ul className="list-unstyled">
              <li>(650)-350-2243</li>
              <li>owongwork@gmail.com</li>
              <li>Home</li>
            </ul>
          </div>

          <div className="col">
            <h4>Social Media</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.facebook.com/itsoscarwong">
                  <FaFacebookSquare />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/oscar-wong-87728519a/">
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>

          <div className="col">
            <h4>Place Holder</h4>
            <ul className="list-unstyled">
              <li>...</li>
              <li>...</li>
              <li>...</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} OSCAR WONG | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
