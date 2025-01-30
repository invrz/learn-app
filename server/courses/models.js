//fs
const fs = require('fs').promises;

// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/coursedetails.db');
const qadb = new sqlite3.Database('./db/coursequestionsandanswers.db');

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

// Create the table for storing courses
qadb.serialize(() => {
  qadb.run(`
    CREATE TABLE IF NOT EXISTS qaforcourses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      description TEXT NOT NULL,
      options JSON NOT NULL,
      answerKey TEXT NOT NULL,
      answerExplanation TEXT
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

// Function to insert questions and answers into the database
const insertQuestionsAndAnswers = (data) => {
  return new Promise((resolve, reject) => {
    
    const insertQuestionQuery = `
      INSERT INTO qaforcourses (course_id, description, options, answerKey, answerExplanation)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    // Start transaction to ensure atomic operation
    qadb.serialize(() => {
      // Use the courseId (1) for all questions
      const courseId = 1;

      // Loop through each question
      console.log(data.questions)
      for (let question of data.questions) {
        const { description, options } = question;
        const optionsJson = JSON.stringify(options); // Convert options array to JSON string
        
        const answer = data.answers[question.id.toString()]; // Get the corresponding answer
        const answerKey = answer ? answer.answer : null;
        const answerExplanation = answer ? answer.explanation : null;

        // Insert question and answer into the database
        qadb.run(insertQuestionQuery, [courseId, description, optionsJson, answerKey, answerExplanation], function (err) {
          if (err) {
            reject({ "err": `Error inserting question: ${err.message}` });
          }
        });
      }
      resolve({ "message": "Questions and answers inserted successfully!" });
    });
  });
};

// Calculate quiz score using ids provided in request body
const getUserScore = (courseId, answersSelectedByUserById) => {
  return new Promise((resolve, reject) => {
    // Construct a list of question IDs based on the user's answers
    const questionIds = Object.keys(answersSelectedByUserById);
    
    // Build a query to fetch all answers for the selected question IDs in one go
    const query = `
      SELECT id, answerKey
      FROM qaforcourses
      WHERE course_id = ? AND id IN (${questionIds.join(', ')})
    `;
    
    qadb.all(query, [courseId], (err, rows) => {
      if (err) {
        reject({ "err": `Failed to fetch answers: ${err.message}` });
      } else {
        // Map the results to a more easily accessible object by question ID
        const answerMap = rows.reduce((acc, row) => {
          acc[row.id] = row.answerKey;
          return acc;
        }, {});

        // Calculate the score by comparing selected answers to correct answers
        let scoreAcquired = 0;
        questionIds.forEach(id => {
          if (answersSelectedByUserById[id].answer === answerMap[id]) {
            scoreAcquired++;
          }
        });

        const maxScore = 20; // max score is the number of questions answered
        const percent = ((scoreAcquired/maxScore)*100).toFixed(2)
        let passed = false;
        if(percent > 60){
          passed = true;
        }
        resolve({
          "maxScore": maxScore,
          "scoreAcquired": scoreAcquired,
          "scoreInPercent": percent,
          "didUserPass": passed
        });
      }
    });
  });
};


// Query quiz questions for a course
const getCourseQuestions = (courseId) => {

  return new Promise((resolve, reject) => {

    // SQL query to fetch 20 random questions for the given courseId
    const query = `
      SELECT id, description, options
      FROM qaforcourses
      WHERE course_id = ?
      ORDER BY RANDOM()
      LIMIT 20;
    `;

    qadb.all(query, [courseId], (err, rows) => {
      if (err) {
        reject({ "err": `Failed to fetch questions: ${err.message}` });
      } else {
        // Map the rows into the desired structure
        const questions = rows.map(row => ({
          id: row.id.toString(), // Ensure id is a string
          description: row.description,
          options: JSON.parse(row.options) // Assuming the options are stored as a JSON string
        }));

        resolve({ questions });
      }
    });
  });
};

// Query quiz questions and answers for a course
const getCourseQuestionsAndAnswers = (course_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Read the file asynchronously
      const data = await fs.readFile("./db/learn-backend-postgres-express.json", 'utf-8');
      const questionsobj = JSON.parse(data);

      insertQuestionsAndAnswers(questionsobj)

      if (!questionsobj) {
        reject({"err": "failed to parse questions"});
      } else {
        resolve(questionsobj);
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
  getCourseQuestionsAndAnswers,
  getCourseQuestions,
  getUserScore
}