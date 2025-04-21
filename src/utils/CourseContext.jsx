import React, { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export const useCourseContext = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  return (
    <CourseContext.Provider value={{ courses, setCourses }}>
      {children}
    </CourseContext.Provider>
  );
};
