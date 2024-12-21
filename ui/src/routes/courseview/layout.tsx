import CourseViewSideNav from "../../templates/appSideNav/main";
import CourseViewContent from "./content";

const CourseView = () => {

  /*

    make a json file in format:
    courses: [
      "coursename1" : {
        courseid: 9035,
        coursetitle: "course title",
        coursedesc: "course descripiton",
        coursefiles: ["filenameurl1", "filenameurl2"],
        coursequizbank : "url",
        coursecodebase: "url"
      }

    ]
    
  */

  return (
    <div className='page-view bg-body'>
      <div className='grid-row col-height-10 row-center row-top'>
        
        <div className="col-width-3-ld col-width-4-sq col-width-0-sm padding--small">
          <CourseViewSideNav />
        </div>

        <div className="col-width-12-ld col-width-12-sq col-width-14-sm padding--small list-view-vertical">
          <CourseViewContent />
        </div>

      </div>
    </div>
  )
}

export default CourseView;
