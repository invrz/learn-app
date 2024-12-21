const TopNav = () =>{ 

    return(
        <>
            <div className="navbar col-width-15-ld col-width-15-sq col-width-0-sm bg-body-dark border--smooth padding--small">
                <div className="navbar-group align-left">
                    <a href="/landing" className="no-decoration"><p className="navbar-brand bg-brand text-brand">invrz learn</p></a>
                </div>
                <div className="navbar-group align-right">
                    <a href="/courses" className="no-decoration"><p className="navbar-item text--light">Courses</p></a>
                    <a href="/interviews" className="no-decoration"><p className="navbar-item  text--light">Interviews</p></a>
                    <a href="/login" className="no-decoration text--light"><p className="navbar-item">Dashboard</p></a>
                    <p className="navbar-item col-width-0-ld">|||</p>
                </div>
            </div> 

            <div className="navbar col-width-0-ld col-width-0-sq col-width-15-sm bg-body-dark border--smooth padding--small">
                <div className="navbar-group align-left">
                    <a href="/landing" className="no-decoration"><p className="navbar-brand bg-brand text-brand">invrz learn</p></a>
                </div>
                <div className="navbar-group align-right">
                    <p className="navbar-item col-width-0-ld">|||</p>
                </div>
            </div>
        </>
    );

}

export default TopNav;