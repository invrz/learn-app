import { Fragment } from "react";

import "./home.css";

const Hero = () => {
  return (
    <Fragment>
      <div id="hero" className="full-view center-all hero">
        <div className="hero-logo">
          <h1>invrz<br />learn</h1>
        </div>
        <p>the hyperinteractive learning platform</p>
      </div>
    </Fragment>
  );
};

export default Hero;