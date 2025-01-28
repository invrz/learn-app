const AppSideNav = () =>{ 

    return(
        <>
            <div className="sidenav padding--small col-height-10">
                <div className="sidenav-group align-top">
                    <a href="/landing" className="no-decoration"><p className="sidenav-brand bg-brand text-brand">invrz learn</p></a>
                    <br/><br/>
                    <a href="/courses" className="no-decoration"><p className="sidenav-item text--light">Courses</p></a>
                    <a href="/dashboard" className="no-decoration text--light"><p className="sidenav-item">Dashboard</p></a>
                    <a href="/interviews" className="no-decoration"><p className="sidenav-item  text--light">Interviews</p></a>
                </div>
                <div className="sidenav-group align-bottom">
                    <a href="/preferences" className="no-decoration"><p className="sidenav-item text--light">Settings</p></a>
                    <a href="/account" className="no-decoration"><p className="sidenav-item  text--light">Account</p></a>
                </div>
            </div>
        </>
    );

}

export default AppSideNav;