import React from "react";
import { Link } from "react-router-dom";
import "./css/face.css";
function Face() {
  return (
    <section id="face">
      <div className="hairProduct-2 hairProduct-banner">
        <div className="hairProduct-content">
          <h1>Face Cream</h1>
          <p>
            Id adipisicing consequat id elit nostrud nostrud tempor exercitation
            excepteur adipisicing ad laborum nisi.
          </p>
          <Link className="hairButton-style-1">
            Learn More <i class="fas fa-chevron-right"></i>
          </Link>
          <Link className="hairButton-style-1">
            Buy Now <i class="fas fa-chevron-right"></i>
          </Link>
        </div>
      </div>
      <div className="hairProduct-1 hairProduct-banner">
        <div className="hairProduct-content">
          <h1>Lip Balm</h1>
          <p>
            Id adipisicing consequat id elit nostrud nostrud tempor exercitation
            excepteur adipisicing ad laborum nisi.
          </p>
          <Link className="hairButton-style-1">
            Learn More <i class="fas fa-chevron-right"></i>
          </Link>
          <Link className="hairButton-style-1">
            Buy Now <i class="fas fa-chevron-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Face;
