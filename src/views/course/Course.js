// import React from 'react';
// import { useEffect, useState } from 'react';
// import { apiMethod } from 'service/service';
// import Button from '@mui/material/Button';
// import { Box, Grid, CardContent,CardActions } from '@mui/material';
// import Typography from 'views/utilities/Typography';
// import { styled } from '@mui/material/styles';

// function Course() {

//   return (
//     <div>
//       <h1>Create courses</h1>
//       {/* <button className='create courses' sx={{ m: 2, p: 2 }} inputMode='add'>Add course</button> */}

//       <Box sx={{ m: 2, p: 2 }}>
//         <Button variant="contained">Add course</Button>
//       </Box>
//       <Grid container spacing={2}>
//         {courses.map((course, index) => {
//           return (
//             <Grid key={index} item xs={3}>
//                 <CardContent>
//                   <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                     Word of the Day
//                   </Typography>
//                   <Typography variant="h5" component="div">
//                     {course.name}
//                   </Typography>
//                   <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     adjective
//                   </Typography>
//                   <Typography variant="body2">
//                     well meaning and kindly.
//                     <br />
//                     {'"a benevolent smile"'}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small">Learn More</Button>
//                 </CardActions>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </div>
//   );
// }

import * as React from 'react';
import Grid from '@mui/material/Grid';
// import Container from '@mui/material/Container';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiMethod } from 'service/service';
import { IconEdit, IconTrash } from '@tabler/icons';
import Model from 'ui-component/model/Model';
import CourseForm from './CourseForm/addCourseForm';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import EditCourseForm from './CourseForm/editCourseForm';
import CourseDelete from './CourseDelete/CourseDelete';

// const bull = (
//   <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
//     •
//   </Box>
// );

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [courseData,setCourseData] = useState({})
  const [deletePop,setDeletePop] = useState(false)
  const [id,setId] = useState('')

  useEffect(() => {
    apiMethod
      .courseList('/courseList')
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => console.log(err));
  }, []);

  const editHandler=(id)=>{
    const course = courses.find((course)=>course._id === id)
    setCourseData(course)
    setIsEdit(true)
  }

  const deleteHandler=(id)=>{
    setId(id)
    setDeletePop(true)
  }

  const confirmHandler=()=>{
    apiMethod.deleteCourse(`/course/${id}`).then(res=>{
      console.log(res)
      setCourses(courses.filter((course)=>course._id !== id))
      setDeletePop(false)

    }).catch(err=>{
      console.log(err)
    

    })

  }

  // console.log
  (deletePop,id)
  return (
    <React.Fragment>
      <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>COURSES </h1>
        <Button variant="contained" onClick={() => setIsOpen(true)}>
          ADD COURSES
        </Button>
      </ButtonGroup>

      {/* <Container> */}
      <Grid container item sx={{mt:6}}>
        {courses.map((course, index) => {
          return (
            <React.Fragment key={index}>
              {/* <Card> */}
              <Grid item xs={3} sx={{ bgcolor: 'white',ml:10,mt:4 }}>
                <Item>
                  <img  height={200}  width={'100%'} 
                  src={`http://localhost:8080/${course.image}`}
                   alt='courseImage'/>
                  </Item>

                <Item>name : {course.name}</Item>
                <Item>Description : {course.description}</Item>
                <Item>author : {course.author}</Item>
                <Item>price : {course.price}</Item>
                <Item>
                  <Button><IconEdit onClick={()=>editHandler(course._id)}/></Button>
                  <Button> <IconTrash onClick={()=>deleteHandler(course._id)}/></Button>
                  </Item>
                {/* <Item><</Item> */}
              </Grid>
              {/* <CardContent>
                <img width={'100%'} src={`http://localhost:8080/${course.image}`} alt="courseImage" />
                <Typography gutterBottom variant="h1" component="div">
                  {course.name}
                </Typography>
                <Typography variant="h5" width={300} color="text.secondary">
                  {course.description}
                </Typography>
                <Typography variant="h5" width={300} color="text.secondary" mt={2}>
                  {course.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button size="small">
                  <IconEdit />
                </Button>
                <Button size="small">
                  <IconTrash />
                </Button>
              </CardActions> */}
            </React.Fragment>
          );
        })}
      </Grid>
      {/* </Container> */}
      <Model open={isOpen} onCancel={() => setIsOpen(false)}>
        <CourseForm setIsOpen={setIsOpen} />
      </Model>
      <Model open={isEdit} onCancel={() => setIsEdit(false)}>
        <EditCourseForm courses={courses} setCourses={setCourses} courseData={courseData} setIsEdit={setIsEdit} />
      </Model>
      <Model open={deletePop} onCancel={() => setDeletePop(false)}>
        <CourseDelete confirmHandler={confirmHandler} setDeletePop={setDeletePop} />
      </Model>
    </React.Fragment>
  );
}
