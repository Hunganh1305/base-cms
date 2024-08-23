import apiConfig from '@constants/apiConfig';
import Course from '.';
import CourseSavePage from './CourseSavePage';
import TaskLogListPage from './taskLog';
import TaskLogSavePage from './taskLog/TaskLogSavePage';

export default {
    //course
    courseListPage: {
        path: '/course',
        component: Course,
        auth: true,
        title: 'Course List',
        permissions: [apiConfig.course.getList.baseURL],
    },
    createCoursePage: {
        path: '/course/:id',
        component: CourseSavePage,
        auth: true,
        title: 'Course Save Base',
        permissions: [apiConfig.course.create.baseURL, apiConfig.course.update.baseURL],
    },
    //task Log
    taskLogListPage: {
        path: '/course/task-log',
        component: TaskLogListPage,
        auth: true,
        title: 'Task Log List',
        permissions: [apiConfig.taskLog.getList.baseURL],
        breadcrumbs: (message, paramHead) => {
            return [
                {
                    breadcrumbName: message.course.defaultMessage,
                    path: paramHead,
                },
                { breadcrumbName: message.history.defaultMessage },
            ];
        },
    },
    taskLogSavePage: {
        path: '/course/task-log/:id',
        component: TaskLogSavePage,
        auth: true,
        title: 'Task Log Save Page',
        permissions: [apiConfig.taskLog.create.baseURL,apiConfig.taskLog.update.baseURL],
        breadcrumbs: (message, paramHead, taskParam, location, title) => {
            return [
                { breadcrumbName: message.course.defaultMessage, path: paramHead },
                { breadcrumbName: message.history.defaultMessage, path: location },
                { breadcrumbName: title ? title : message.objectName.defaultMessage },
            ];
        },
    },
};
