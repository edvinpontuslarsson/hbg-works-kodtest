import {
  courseAndDate,
  labelAndInput,
} from '../utils/classNames';

const CourseSection = ({
  courses,
  getCourse,
  selectedCourse,
  setSelectedCourse,
  selectedDate,
  setSelectedDate,
}) => (
  <>
    <h2>Course</h2>
    <div className={courseAndDate}>
      <div className={labelAndInput}>
        <label>NAME</label>
        <select
          value={selectedCourse.name}
          onChange={(event) => {
            const courseName = event.target.value;
            const course = getCourse(courseName);

            setSelectedCourse(course);
          }}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <div className={labelAndInput}>
        <label>DATE</label>
        <select
          value={selectedDate}
          onChange={(event) =>
            setSelectedDate(event.target.value)
          }
        >
          {selectedCourse?.dates?.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
    </div>
  </>
);

export default CourseSection;
