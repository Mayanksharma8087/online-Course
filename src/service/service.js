import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: '',
  params: {}
});

export const apiMethod = {

  login: (url, data) =>
    instance
      .post(url, data)
      .then((res) => res)
      .catch((err) => err),

  register: (url, data) =>
    instance
      .post(url, data)
      .then((res) => res)
      .catch((err) => err),

  createCourse: (url, data) =>
    instance
      .post(url, data)
      .then((res) => res)
      .catch((err) => err),
      
  courseList: (url) =>
    instance
      .get(url)
      .then((res) => res)
      .catch((err) => err),

  updateCourse: (url, data) =>
    instance
      .put(url, data)
      .then((res) => res)
      .catch((err) => err),

  deleteCourse: (url) =>
    instance
      .delete(url)
      .then((res) => res)
      .catch((err) => err),

      changepassword: (url, data) =>
      instance
        .put(url, data)
        .then((res) => res)
        .catch((err) => err),
  
};

// export const post = (url, data) =>
//   instance
//     .post(url, data)
//     .then((res) => res)
//     .catch((err) => err);

// export const get = (url) =>
//   instance
//     .get(url)
//     .then((res) => res)
//     .catch((err) => err);

// export const put = (url, data) =>
//   instance
//     .put(url, data)
//     .then((res) => res)
//     .catch((err) => err);

// export const del = (url) =>
//   instance
//     .delete(url)
//     .then((res) => res)
//     .catch((err) => err);
