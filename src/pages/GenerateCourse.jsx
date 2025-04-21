import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCourseContext } from "../utils/CourseContext";

const LOCAL_KEY = "courses";

const GenerateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidateName: "",
    courseName: "",
    courseId: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const { courses, setCourses } = useCourseContext();
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const {
      candidateName,
      courseName,
      courseId,
      startDate,
      endDate,
      description,
    } = formData;
    if (
      !candidateName ||
      !courseName ||
      !courseId ||
      !startDate ||
      !endDate ||
      !description
    ) {
      alert("All fields are required!");
      return;
    }

    if (editIndex === null && courses.some((c) => c.courseId === courseId)) {
      alert("Course ID must be unique!");
      return;
    }

    const isDuplicate = courses.some(
      (c, i) => c.courseId === courseId && i !== editIndex
    );
    if (isDuplicate) {
      alert("Course ID must be unique!");
      return;
    }

    if (editIndex !== null) {
      const updated = [...courses];
      updated[editIndex] = formData;
      setCourses(updated);
      setEditIndex(null);
    } else {
      setCourses((prev) => [...prev, formData]);
    }

    setFormData({
      candidateName: "",
      courseName: "",
      courseId: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(courses[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = courses.filter((_, i) => i !== index);
    setCourses(updated);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Create Certification Course
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField
          label="Candidate Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
        />
        <TextField
          label="Course Name"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
        />
        <TextField
          label="Course ID"
          name="courseId"
          type="number"
          value={formData.courseId}
          onChange={handleChange}
        />
        <TextField
          type="date"
          label="Start Date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="End Date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <Button variant="contained" size="large" onClick={handleSubmit}>
          {editIndex !== null ? "Update Course" : "Add Course"}
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Course List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Course ID</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course.candidateName}</TableCell>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.courseId}</TableCell>
              <TableCell>{course.startDate}</TableCell>
              <TableCell>{course.endDate}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    navigate(`/design-certificate/${course.courseId}`)
                  }
                  style={{ marginLeft: 8 }}
                >
                  Design Certificate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default GenerateCourse;
