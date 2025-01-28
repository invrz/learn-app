//fs
const fs = require('fs').promises;

// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./courses/coursedetails.db');

// Create the table for storing courses
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      courseid INTEGER PRIMARY KEY AUTOINCREMENT,
      coursename TEXT NOT NULL,
      coursetitle TEXT NOT NULL,
      coursedesc TEXT,
      coursefiles TEXT, -- store as comma-separated URLs or a JSON string
      coursequizbank TEXT,
      coursecodebase TEXT
    )
  `);
});

// Insert a new course
const addCourseDetails = (course) => {
  return new Promise((resolve, reject) =>{
    console.log(course)
    db.run(
      `INSERT INTO courses (coursename, coursetitle, coursedesc, coursefiles, coursequizbank, coursecodebase)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [course.coursename, course.coursetitle, course.coursedesc, course.coursefiles, course.coursequizbank, course.coursecodebase],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(course);
        }
      }
    );
  })
}

// Update an existing course
const updateCourseDetails = (course) => {
  return new Promise((resolve, reject) => {
    // Initialize the fields to update
    let updateFields = [];
    let values = [];

    // Dynamically build the SET clause and values array
    if (course.coursename !== undefined) {
      updateFields.push('coursename = ?');
      values.push(course.coursename);
    }
    if (course.coursetitle !== undefined) {
      updateFields.push('coursetitle = ?');
      values.push(course.coursetitle);
    }
    if (course.coursedesc !== undefined) {
      updateFields.push('coursedesc = ?');
      values.push(course.coursedesc);
    }
    if (course.coursefiles !== undefined) {
      updateFields.push('coursefiles = ?');
      values.push(course.coursefiles);
    }
    if (course.coursequizbank !== undefined) {
      updateFields.push('coursequizbank = ?');
      values.push(course.coursequizbank);
    }
    if (course.coursecodebase !== undefined) {
      updateFields.push('coursecodebase = ?');
      values.push(course.coursecodebase);
    }

    // Ensure the courseid is included in the values at the end
    // updateFields.push('courseid = ?');
    values.push(course.courseid);

    // Build the final SQL query string
    const sqlQuery = `UPDATE courses SET ${updateFields.join(', ')} WHERE courseid = ?`;

    // Execute the update query
    db.run(sqlQuery, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(course);
      }
    });
  });
};


// Query all courses
const getCourseDetails = (courseid) => {
  return new Promise((resolve, reject) =>{

    db.all(`SELECT * FROM courses where courseid = ${Number(courseid)}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        console.log('Courses:', rows[0]);
        resolve(rows);
      }
    });

  })
}

// Query quiz questions for a course
const getCourseQuestions = (questionbankurl) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Read the file asynchronously
      const data = await fs.readFile(questionbankurl, 'utf-8');
      const questionsobj = JSON.parse(data);

      if (!questionsobj) {
        reject({"err": "failed to parse questions"});
      } else {
        resolve(questionsobj.questions);
      }
    } catch (error) {
      reject({"err": `failed to get or parse questions: ${error.message}`});
    }
  });
}

// Query quiz answers for a course
const getCourseAnswers = (questionbankurl) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Read the file asynchronously
      const data = await fs.readFile(questionbankurl, 'utf-8');
      const questionsobj = JSON.parse(data);

      if (!questionsobj) {
        reject({"err": "failed to parse questions"});
      } else {
        resolve(questionsobj.answers);
      }
    } catch (error) {
      reject({"err": `failed to get or parse questions: ${error.message}`});
    }
  });
}

module.exports = {
  addCourseDetails, 
  getCourseDetails,
  updateCourseDetails,
  getCourseQuestions
}