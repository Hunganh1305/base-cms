import apiConfig from '@constants/apiConfig';
import ProjectListPage from '.';
import ProjectTabPage from './ProjectTabPage';
import ProjectSavePage from './ProjectSavePage';
import ProjectMemberListPage from './member';
import ProjectMemberSavePage from './member/ProjectMemberSavePage';
import MemberActivityProjectListPage from './member/memberActivity';
import StoryListPage from './storyTab';
import StorySavePage from './storyTab/StorySavePage';

export default {
    projectListPage: {
        path: '/project',
        title: 'Project',
        auth: true,
        component: ProjectListPage,
        permissions: [apiConfig.project.getList.baseURL],
    },
    projectTabPage: {
        path: '/project/project-tab',
        title: 'Project Tab',
        auth: true,
        component: ProjectTabPage,
        keyActiveTab: 'activeProjectTab',
        permissions: [apiConfig.project.getList.baseURL],
    },
    projectSavePage: {
        path: '/project/:id',
        title: 'Project Save Page',
        auth: true,
        component: ProjectSavePage,
        permissions: [apiConfig.project.create.baseURL, apiConfig.project.update.baseURL],
    },
    projectMemberListPage: {
        path: '/project/member',
        title: 'Project Member',
        auth: true,
        component: ProjectMemberListPage,
        permissions: [apiConfig.memberProject.getList.baseURL],
    },
    projectMemberSavePage: {
        path: '/project/member/:id',
        title: 'Project Save Page',
        auth: true,
        component: ProjectMemberSavePage,
        permissions: [apiConfig.memberProject.create.baseURL, apiConfig.memberProject.update.baseURL],
    },
    memberActivityProjectListPage: {
        path: '/project/member/member-activity-project',
        title: 'Member Activity Project List Page',
        auth: true,
        component: MemberActivityProjectListPage,
        permissions: [apiConfig.projectTaskLog.getList.baseURL],
    },

    //story
    StoryListPage: {
        path: '/story/task',
        title: 'Story List Page',
        auth: true,
        component: StoryListPage,
        permission: [apiConfig.story.getList.baseURL],
    },
    StorySavePage: {
        path: '/story/task/:id',
        title: 'Task Save Page',
        auth: true,
        component: StorySavePage,
        permission: [apiConfig.story.create.baseURL, apiConfig.story.update],
    },
};
