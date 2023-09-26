import { Fragment } from "react";
import "./home.css";

import FeatureAI from "./featureAI";
import Hero from "./hero";

const Home = () => {

  const sections = ['hero', 'feat1', 'feat2'];
  let secNav = 0;

  window.addEventListener("wheel", function(e) {
    let st = e.deltaY || -e.wheelDelta || e.detail;

    console.log(st)

    if(st>0){
      secNav++;
      if(secNav>2){
        secNav = 2;
      }
      console.log(document.getElementById(sections[secNav]))
      document.getElementById(sections[secNav]).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if(st<0){
      secNav--;
      if(secNav<0){
        secNav = 0;
      }
      console.log(document.getElementById(sections[secNav]))
      document.getElementById(sections[secNav]).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
 }, false);

  return (
    <Fragment>
      <div className="smooth-scroller">
        <Hero />
        <FeatureAI />
      </div>
    </Fragment>
  );
};

export default Home;