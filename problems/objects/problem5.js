function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(this.name + ' is a ' + this.year + ' year student');
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(course.name + ': ' + course.note);
        }
      });
    },

    getCourseByName(courseName) {
      return this.courses.filter(({name}) => name === courseName)[0];
    },

    getCourseByCode(courseCode) {
      return this.courses.filter(({code}) => code === courseCode)[0];
    },

    addNote(courseCode, note) {
      let course = this.getCourseByCode(courseCode);

      if (course) {
        if (course.note) {
          course.note += '; ' + note;
        } else {
          course.note = note;
        }
      }
    },

    updateNote(courseCode, note) {
      let course = this.getCourseByCode(courseCode);
        if (course) {
          course.note = note;
        }
    },
  };
}

let school = {
  students: [],
  isValidYear(year) {
    return ['1st', '2nd', '3rd', '4th', '5th'].some(validYear => year === validYear);
  },

  addStudent(name, year) {
    if (this.isValidYear(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, course) {
    student.addCourse(course);
  },

  addGrade(student, courseName, grade) {
      let course = student.getCourseByName(courseName)

      if (course) {
        course.grade = grade;
      }
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      let courseName = course.name;
      let grade = course.grade? course.grade : 'In progress';
      console.log(courseName + ': ' + grade);
    });
  },

  courseReport(courseName) {
    let gradeTotal = 0;

    let enrolledStudents = this.students.filter(student => {
      let course = student.getCourseByName(courseName);
      if (course && course.grade) {
        return student;
      }
    });

    if (enrolledStudents.length === 0) {
      console.log(undefined);
      return;
    }
    console.log(`=${courseName} Grades=`)
    enrolledStudents.forEach(student => {
      let course = student.getCourseByName(courseName);
      console.log(student.name + ': ' + course.grade);
      gradeTotal += course.grade;
    })
    console.log('---');
    console.log('Course Average: ' + (gradeTotal / enrolledStudents.length));
  },
}

let paul = school.addStudent('Paul', '3rd');
school.enrollStudent(paul, {name: 'Math', code: 101});
school.addGrade(paul, 'Math', 95)
school.enrollStudent(paul, {name: 'Advanced Math', code: 102});
school.addGrade(paul, 'Advanced Math', 90)
school.enrollStudent(paul, {name: 'Physics', code: 202});

let mary = school.addStudent('Mary', '1st');
school.enrollStudent(mary, {name: 'Math', code: 101});
school.addGrade(mary, 'Math', 91);

let kim = school.addStudent('Kim', '2nd');
school.enrollStudent(kim, {name: 'Math', code: 101});
school.addGrade(kim, 'Math', 93)
school.enrollStudent(kim, {name: 'Advanced Math', code: 102});
school.addGrade(kim, 'Advanced Math', 90);

school.courseReport('Advanced Math');