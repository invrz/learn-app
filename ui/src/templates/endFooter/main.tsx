const EndFooter = () =>{ 

    return(
        <>
            <div className="grid-row bg-body-dark border--smooth padding--small row-center row-middle">
                <div className="col-width-5-ld col-width-5-sq col-width-12-sm padding-small margin--small">
                    <h1>Links</h1>
                    <a href="#" className="text--regular text-body no-decoration">Get Started With Web Development Using HTML, CSS and JS</a><br/>
                    <a href="#" className="text--regular text-body no-decoration">Frontend Development With React and Vite</a><br/>
                    <a href="#" className="text--regular text-body no-decoration">Backend Development With Node.JS and Express.Js</a><br/>
                </div>
                <div className="col-width-2-ld col-width-2-sq col-width-12-sm padding-small margin--small">
                    <h1></h1>
                </div>
                <div className="col-width-5-ld col-width-5-sq col-width-12-sm padding-small margin--small">
                    <div className="grid-row row-center row-middle">
                        <h1 className="heading--h1 border--smoother bg-brand-dark padding--small text-align--center col-width-5 col-width-15-sm">
                            invrz<br/>learn<br/>
                            <span className="text--regular">&copy;2024</span>
                        </h1>
                    </div>
                </div>
            </div> 

        </>
    );

}

export default EndFooter;