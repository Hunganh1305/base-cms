import { method } from 'lodash';
import { AppConstants, apiUrl, apiTenantUrl, apiTenantUrlDev } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    account: {
        login: {
            baseURL: `${apiUrl}v1/account/login`,
            method: 'POST',
            headers: baseHeader,
        },
        loginBasic: {
            baseURL: `${apiUrl}api/token`,
            method: 'POST',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/career/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update_profile_admin`,
            method: 'PUT',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        refreshToken: {
            baseURL: `${apiUrl}v1/account/refresh_token`,
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    user: {
        getList: {
            baseURL: `${apiUrl}v1/account/list`,
            method: `GET`,
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/account/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/account/create_admin`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
    },
    post: {
        getList: {
            baseURL: `${apiUrl}api/posts/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/posts/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/posts/create`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/posts/update`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}api/posts/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}api/posts/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
    },
    file: {
        upload: {
            path: `${AppConstants.mediaRootUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        image: {
            path: `${AppConstants.mediaRootUrl}admin/api/image/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        video: {
            path: `${AppConstants.mediaRootUrl}admin/api/video/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    course: {
        getList: {
            baseURL: `${apiTenantUrl}v1/course/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/course/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/course/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/course/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/course/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/course/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateLeaderCourse: {
            baseURL: `${apiTenantUrl}v1/course/update-leader`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    subject: {
        getList: {
            baseURL: `${apiTenantUrl}v1/subject/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/subject/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/subject/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/subject/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/subject/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/subject/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    developer: {
        getList: {
            baseURL: `${apiTenantUrl}v1/developer/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/developer/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/developer/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/developer/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/developer/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/developer/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getProject: {
            baseURL: `${apiTenantUrl}v1/developer/project`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        leaderRefer: {
            baseURL: `${apiTenantUrl}v1/developer/reject`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        login: {
            baseURL: `${apiTenantUrl}v1/developer/login-developer`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getProfile: {
            baseURL: `${apiTenantUrl}v1/developer/profile`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        myProject: {
            baseURL: `${apiTenantUrl}v1/developer/my-project`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateProfile: {
            baseURL: `${apiTenantUrl}v1/developer/update-profile`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },

    category: {
        getList: {
            baseURL: `${apiUrl}api/category/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/category/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/category/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}api/category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}api/category/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    languages: {
        getList: {
            baseURL: `${apiUrl}admin/api/languages`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    groupPermission: {
        getGroupList: {
            baseURL: `${apiUrl}api/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}api/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getPemissionList: {
            baseURL: `${apiUrl}api/permission/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/group/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/group/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/group/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}api/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getGroupListCombobox: {
            baseURL: `${apiUrl}api/group/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    branchs: {
        getListCombobox: {
            baseURL: `${apiUrl}api/branch/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    news: {
        getList: {
            baseURL: `${apiUrl}api/news/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/news/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/news/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/news/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}api/news/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
    address: {
        getList: {
            baseURL: `${apiUrl}api/address/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/address/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/address/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/address/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}api/address/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
    nation: {
        getList: {
            baseURL: `${apiUrl}api/nation/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/nation/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/nation/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/nation/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}api/nation/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}api/nation/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    settings: {
        getList: {
            baseURL: `${apiTenantUrl}v1/setting/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/setting/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/setting/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/setting/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/setting/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/setting/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        settings: {
            baseURL: `${apiTenantUrl}v1/setting/settings`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    task: {
        getList: {
            baseURL: `${apiTenantUrl}v1/task/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        asignALl: {
            baseURL: `${apiTenantUrl}v1/task/asign-all`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/task/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/task/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/task/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getById: {
            baseURL: `${apiTenantUrl}v1/task/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/task/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        checkAsign: {
            baseURL: `${apiTenantUrl}v1/task/check-asign`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        courseTask: {
            baseURL: `${apiTenantUrl}v1/task/course-task/:courseId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        studentTask: {
            baseURL: `${apiTenantUrl}v1/task/student-task`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateState: {
            baseURL: `${apiTenantUrl}v1/task/update-state`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        notifyDone: {
            baseURL: `${apiTenantUrl}v1/task/notify-done`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        studentDetailCourseTask: {
            baseURL: `${apiTenantUrl}v1/task/tracking-logs`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    taskLog: {
        getList: {
            baseURL: `${apiTenantUrl}v1/task-log/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/task-log/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getSum: {
            baseURL: `${apiTenantUrl}v1/task-log/get-sum`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/task-log/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/task-log/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/task-log/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/task-log/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    registration: {
        getList: {
            baseURL: `${apiTenantUrl}v1/registration/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/registration/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/registration/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/registration/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/registration/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        acceptRequest: {
            baseURL: `${apiTenantUrl}v1/registration/accept-request`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getDetail: {
            baseURL: `${apiTenantUrl}v1/registration/detail/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    review: {
        getList: {
            baseURL: `${apiTenantUrl}v1/review/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/review/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        listReviews: {
            baseURL: `${apiTenantUrl}v1/review/list-reviews/:courseId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        myReview: {
            baseURL: `${apiTenantUrl}v1/review/my-review/:courseId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/review/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/review/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/review/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/review/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        star: {
            baseURL: `${apiTenantUrl}v1/review/star/:courseId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    knowledgePermission: {
        getList: {
            baseURL: `${apiTenantUrl}v1/knowledge-permission/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/knowledge-permission/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/knowledge-permission/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/knowledge-permission/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/knowledge-permission/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    student: {
        getList: {
            baseURL: `${apiTenantUrl}v1/student/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/student/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/student/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/student/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/student/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/student/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getAllCourse: {
            baseURL: `${apiTenantUrl}v1/student/my-course/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        login: {
            baseURL: `${apiTenantUrl}v1/student/login-student`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getProfile: {
            baseURL: `${apiTenantUrl}v1/student/get-myprofile`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateProfile: {
            baseURL: `${apiTenantUrl}v1/student/update-profile`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getDetailByPhone: {
            baseURL: `${apiTenantUrl}v1/student/detail-by-phone`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    lecture: {
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/lecture/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/lecture/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/lecture/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getBySubject: {
            baseURL: `${apiTenantUrl}v1/lecture/get-by-subject/:subjectId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getList: {
            baseURL: `${apiTenantUrl}v1/lecture/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/lecture/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/lecture/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateSort: {
            baseURL: `${apiTenantUrl}v1/lecture/update-sort`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    project: {
        getList: {
            baseURL: `${apiTenantUrl}v1/project/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getListLeader: {
            baseURL: `${apiTenantUrl}v1/project/leader-project`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getListStudent: {
            baseURL: `${apiTenantUrl}v1/project/student-project`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/project/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/project/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/project/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getById: {
            baseURL: `${apiTenantUrl}v1/project/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        update: {
            baseURL: `${apiTenantUrl}v1/project/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateLeaderProject: {
            baseURL: `${apiTenantUrl}v1/project/update-leader`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getTokenForProject: {
            baseURL: `${apiTenantUrl}v1/project/get-token-for-project`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    salaryPeriod: {
        getList: {
            baseURL: `${apiTenantUrl}v1/salary-period/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/salary-period/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/salary-period/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/salary-period/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/salary-period/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/salary-period/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        checkExist: {
            baseURL: `${apiTenantUrl}v1/salary-period/check-exist`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        calculateProjectSalary: {
            baseURL: `${apiTenantUrl}v1/salary-period/calculate-project-salary`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        approve: {
            baseURL: `${apiTenantUrl}v1/salary-period/approve`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    registerSalaryPeriod: {
        create: {
            baseURL: `${apiTenantUrl}v1/register-salary-period/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/register-salary-period/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getList: {
            baseURL: `${apiTenantUrl}v1/register-salary-period/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/register-salary-period/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/register-salary-period/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    memberProject: {
        getList: {
            baseURL: `${apiTenantUrl}v1/member-project/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/member-project/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/member-project/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/member-project/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/member-project/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/member-project/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateMyInfo: {
            baseURL: `${apiTenantUrl}v1/member-project/update-my-info`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    story: {
        getList: {
            baseURL: `${apiTenantUrl}v1/story/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/story/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/story/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/story/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/story/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/story/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    projectTask: {
        getList: {
            baseURL: `${apiTenantUrl}v1/project-task/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/project-task/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/project-task/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/project-task/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getById: {
            baseURL: `${apiTenantUrl}v1/project-task/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/project-task/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        changeState: {
            baseURL: `${apiTenantUrl}v1/project-task/change-state`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        notifyDone: {
            baseURL: `${apiTenantUrl}v1/project-task/notify-done`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    projectCategory: {
        getList: {
            baseURL: `${apiTenantUrl}v1/project-category/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/project-category/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/project-category/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/project-category/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/project-category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/project-category/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    projectTaskLog: {
        getList: {
            baseURL: `${apiTenantUrl}v1/project-task-log/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiTenantUrl}v1/project-task-log/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getSum: {
            baseURL: `${apiTenantUrl}v1/project-task-log/get-sum`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiTenantUrl}v1/project-task-log/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiTenantUrl}v1/project-task-log/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiTenantUrl}v1/project-task-log/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiTenantUrl}v1/project-task-log/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        archiveAll: {
            baseURL: `${apiTenantUrl}v1/project-task-log/archive-all-task-logs`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        findAllTrackingLog: {
            baseURL: `${apiTenantUrl}v1/project-task-log/tracking-logs`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
};

export default apiConfig;
