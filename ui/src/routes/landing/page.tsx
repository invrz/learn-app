import "./landing.css"

import TopNav from "../../templates/topNav/main";
import { useState } from "react";
import EndFooter from "../../templates/endFooter/main";

const LandingHero = () =>{
  return(
      <div className="landing--hero grid-row col-height-10 row-middle row-center">
          
          <div className="grid-row col-height-auto row-center row-bottom">
              <h1 className="landing--textxl landing--textmono text-body text-align--center col-width-15">invrz learn</h1>
          </div>
          <br/><br/>
          
          <div className="grid-row col-height-auto row-center row-top">
              <h1 className="landing--textl landing--textmono landing--textlight text-align--center col-width-15">the hyperinteractive learning platform</h1>
          </div>
          <br/><br/>
          
          <div className="grid-row col-height-auto row-center row-top">
              <img className="col-width-12 border--smoother border-none" alt="landing-hero-preview" src="landing--preview.png" />
          </div>

      </div>
  )
}

const LandingIntro = () =>{
  return(
    
    <div className="landing--intro grid-row row-middle row-center bg-accent col-height-5 padding--small">

      <div className="col-width-3-ld col-width-4-sq col-width-12-sm padding--small bg-brand border--smoother margin--small">
        <h1 className="title text-body">Start a Course</h1><br/>
        <p className="text--regular text-brand text-align--justify">
          Select a course from the ever expanding library of invrz learn original courses and jump right in the learning experience.
        </p>
      </div>

      <div className="gutter-width-1"></div>

      <div className="col-width-3-ld col-width-4-sq col-width-12-sm padding--small bg-secondary border--smoother margin--small">
        <h1 className="title text-body">Interact to apply</h1><br/>
        <p className="text--regular text-brand text-align--justify">
          Use provided starter code base to solve end of topic assignments which force you to jump right in the action and apply what you learn.
        </p>
      </div>

      <div className="gutter-width-1"></div>

      <div className="col-width-3-ld col-width-4-sq col-width-12-sm padding--small bg-highlight border--smoother margin--small">
        <h1 className="title text-body">Watch and Learn</h1><br/>
        <p className="text--regular text-brand text-align--justify">
          Each topic comes with a text reference and a video explaining in detail and implementing the topic in question, watch and learn.
        </p>
      </div>

  </div>

  )
}

const LandingFeatures = () => {
  return(

    
    <div className="landing--features content-view">
              
    <div className="grid-row row-middle row-center col-height-6 row-center bg-muted-dark padding--small text-warning">
      <div className="col-width-6 col-width-12-sm padding--small">
        <h1 className="heading--h1">Starter Codebase</h1>
        <br/>
        <p className="text--large">
          Jump right into hands-on learning with pre-made codebases for each topic, accelerating your practical skills development.
        </p>

      </div>
      <div className="col-width-3 col-width-12-sm">
        <img className="landing--features-img" alt="starter codebase" src="landing--startercodebase.png" />
      </div>
    </div>
    
    <div className="grid-row row-middle row-center col-height-6 row-center bg-error-dark padding--small text-secondary">
      <div className="col-width-6 col-width-12-sm padding--small">
        <h1 className="heading--h1">Expansive Assignments</h1>
        <br/>
        <p className="text--large">
          At end of every course you get a peer reviewed assignment {"(implementation pending)"} which helps you implement what you learned in real life.
        </p>

      </div>
      <div className="col-width-3 col-width-12-sm">
        <img className="landing--features-img" alt="starter codebase" src="landing--assignments.png" />
      </div>
    </div>

  </div>

  )
}

const LandingPrices = () => {
  return(

    
  <div className="landing--pricing grid-row row-middle row-center">

    <div className="grid-row col-height-2 row-center row-bottom">
      <h1 className="heading--h1">Pricing</h1>
    </div>

    <div className="grid-row col-height-4 row-center row-middle col-width-0-sm">
                
      <div className="col-width-3-ld col-width-4-sq col-width-0-sm padding--small bg-secondary-dark border--smoother text-body">
        <h1 className="title text-body">Early Beta</h1><br/>
        <p className="text--regular text-body text-align--justify">
          We are still active in early beta at this stage which means you can get early access to invrz learn for free and get a 3 months free trial included when we go “release”
        </p>
      </div>

      <div className="gutter-width-1"></div>
                
      <div className="col-width-3-ld col-width-4-sq col-width-0-sm padding--small bg-accent-dark border--smoother text-body">
        <h1 className="title text-body">Release</h1><br/>
        <p className="text--regular text-body text-align--justify">
          Stay tuned for pricing details when invrz learn goes “release”. We're committed to delivering the best and can't wait to welcome you to the next level of interactive learning!
        </p>
      </div>

    </div>

    <></>

    <div className="list-view-vertical col-width-0-ld col-width-0-sq col-width-12-sm">

      <br/><br/><br/>
                
      <div className="col-width-15-sm padding--small bg-accent-dark border--smoother text-body">
        <h1 className="title">Early Beta</h1><br/>
        <p className="text--regular text-align--justify">
          We are still active in early beta at this stage which means you can get early access to invrz learn for free and get a 3 months free trial included when we go “release”
        </p>
      </div><br/><br/>
                
      <div className="col-width-15-sm padding--small bg-muted-dark border--smoother text-body">
        <h1 className="title">Release</h1><br/>
        <p className="text--regular text-align--justify">
          Stay tuned for pricing details when invrz learn goes “release”. We're committed to delivering the best and can't wait to welcome you to the next level of interactive learning!
        </p>
      </div><br/><br/>

    </div><br/><br/><br/><br/>
    
  </div>

  );
}

const LandingSubscribe = () => {

  const [subscriberEmail, setSubscriberEmail] = useState("");
  return(
    
    <div className="landing--subscribe grid-row row-middle row-center">
                          
      <div className="col-width-15 grid-row col-height-auto row-center row-middle margin--large">
        <h1 className="heading--h1">Get Early Access</h1>
      </div>
      
      <div className="col-width-15 grid-row col-height-auto row-center row-middle">
        <input type="email" className="border--solid border-muted border--thin padding--tiny bg-body-dark border--smoother text--brand text--regular col-width-12-sm" placeholder="your email address" value={subscriberEmail} onChange={(e)=>{setSubscriberEmail(e.target.value)}} />
        <button className="no-border padding--tiny bg-brand border--smoother text--brand text--regular col-width-12-sm margin--small">Go Beta</button>
      </div>
      
    </div>
  );
}

const Landing = () => {

  return (
    <>
      <div className="page-view bg-body text-body">
        <div className="grid-row row-center row-top col-height-10">
          <div className="col-width-15">

            <TopNav />

            <LandingHero />

            <LandingIntro />

            <LandingFeatures />

            <LandingPrices />
            
            <LandingSubscribe />

            <EndFooter />


          </div>
        </div>
      </div>
    </>
  )
}

export default Landing;
