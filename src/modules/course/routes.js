import apiConfig from '@constants/apiConfig';
import Course from '.';
import CourseSavePage from './CourseSavePage';

export default {
    // list course
    courseListPage: {
        path: '/course',
        component: Course,
        auth: true,
        title: 'Course List',
        permissions: [apiConfig.course.getList.baseURL],
    },
    createCoursePage: {
        path: '/course/create',
        component: CourseSavePage,
        auth: true,
        title: 'Create Course',
        permissions: [apiConfig.course.create.baseURL, apiConfig.course.update.baseURL],
    },
};
