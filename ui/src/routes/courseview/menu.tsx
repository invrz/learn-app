interface courseFileInterface {
    filename: string,
    fileurl: string
}


const CourseViewSideNav = ({ courseNameAsProps, courseFilesAsProps, onFileSelected, onQuizSelected }: { courseNameAsProps: string; courseFilesAsProps: courseFileInterface[]; onFileSelected: (url: string) => void; onQuizSelected: () => void }) =>{ 

    return(
        <>
            <div className="list-view-vertical ">
                <div className="sidenav padding--small col-height-10">
                    <div className="sidenav-group align-top">
                        <a href="/landing" className="no-decoration"><p className="sidenav-brand bg-brand text-brand">{courseNameAsProps}</p></a>
                        <br/><br/>

                        <a href="/courses" className="no-decoration"><p className="sidenav-item text-muted-light text--bold" style={{fontSize: "1.1rem"}}>Back To Courses</p></a>
                        {courseFilesAsProps.map((courseFile: courseFileInterface, index) => (
                            <p className="sidenav-item text--light no-decoration" onClick={() => onFileSelected(courseFile.fileurl)} key={index} >
                                <span style={{paddingLeft: "16px"}}>{courseFile.filename}</span>
                            </p>
                        ))}
                        
                        <a href="#" onClick={()=>{onQuizSelected()}} className="no-decoration"><p className="sidenav-item text-muted-light text--bold" style={{fontSize: "1.1rem"}}>Quiz</p></a>

                    </div>
                    <div className="sidenav-group align-bottom">
                        <a href="/preferences" className="no-decoration"><p className="sidenav-item text-muted-light text--bold" style={{fontSize: "1.1rem"}}>Settings</p></a>
                        <a href="/account" className="no-decoration"><p className="sidenav-item text-muted-light text--bold" style={{fontSize: "1.1rem"}}>Account</p></a>
                    </div>
                </div>
            </div>
        </>
    );

}

export default CourseViewSideNav;