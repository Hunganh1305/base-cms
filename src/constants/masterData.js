import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_PENDING,
    PROVINCE_KIND,
    DISTRICT_KIND,
    VILLAGE_KIND,
    STATE_COURSE_PREPARED,
    STATE_COURSE_RECRUITED,
    STATE_COURSE_STARTED,
    STATE_COURSE_FINISHED,
    STATE_COURSE_CANCELED,
    lectureStateMessage,
    TASK_LOG_WORKING,
    TASK_LOG_OFF,
    TASK_LOG_BUG,
    LECTURE_LESSION,
    LECTURE_SECTION,
    STATE_PROJECT_TASK_CREATE,
    STATE_PROJECT_TASK_PROCESSING,
    STATE_PROJECT_TASK_DONE,
    STATE_PROJECT_TASK_CANCEL,
    STATE_PROJECT_STORY_CREATE,
    STATE_PROJECT_STORY_PROCESSING,
    STATE_PROJECT_STORY_DONE,
    STATE_PROJECT_STORY_CANCEL,
} from '@constants';
import { defineMessages } from 'react-intl';
import { nationKindMessage, actionMessage, taskLog, lectureKindMessage, projectTaskStateMessage, archivedMessage } from './intl';

const commonMessage = defineMessages({
    statusActive: 'Active',
    statusPending: 'Pending',
    statusInactive: 'Inactive',
});

export const languageOptions = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'VN' },
    { value: 3, label: 'Other' },
];

export const orderOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    { value: STATUS_PENDING, label: 'Pending', color: 'warning' },
    { value: STATUS_INACTIVE, label: 'Inactive', color: 'red' },
];

export const statusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_PENDING, label: commonMessage.statusPending, color: '#FFBF00' },
    { value: STATUS_INACTIVE, label: commonMessage.statusInactive, color: '#CC0000' },
];

export const formSize = {
    small: '700px',
    normal: '800px',
    big: '900px',
};

export const nationKindOptions = [
    {
        value: PROVINCE_KIND,
        label: nationKindMessage.province,
    },
    {
        value: DISTRICT_KIND,
        label: nationKindMessage.district,
    },
    {
        value: VILLAGE_KIND,
        label: nationKindMessage.village,
    },
];

export const kindPost = [
    {
        value: 1,
        label: 'Post',
        color: 'green',
    },
    {
        value: 2,
        label: 'Story',
        color: 'blue',
    },
];

export const settingGroups = {
    GENERAL: 'general',
    PAGE: 'page_config',
    REVENUE: 'revenue_config',
    TRAINING: 'training_config',
};
export const dataTypeSetting = {
    INT: 'int',
    STRING: 'string',
    BOOLEAN: 'boolean',
    DOUBLE: 'double',
    RICHTEXT: 'richtext',
};

export const settingKeyName = {
    MONEY_UNIT: 'money_unit',
    TRAINING_UNIT: 'training_percent',
    BUG_UNIT: 'training_project_percent',
    NUMBER_OF_TRAINING_PROJECT: 'number_of_training_projects',
};

export const actionOptions = [
    {
        value: 1,
        label: actionMessage.contactForm,
    },
    { value: 2, label: actionMessage.navigation },
];

export const lectureState = [
    { value: STATE_COURSE_PREPARED, label: lectureStateMessage.prepared, color: 'yellow' },
    { value: STATE_COURSE_RECRUITED, label: lectureStateMessage.recruit, color: 'blue' },
    { value: STATE_COURSE_STARTED, label: lectureStateMessage.started, color: 'warning' },
    { value: STATE_COURSE_FINISHED, label: lectureStateMessage.finished, color: 'green' },
    { value: STATE_COURSE_CANCELED, label: lectureStateMessage.canceled, color: 'red' },
];

export const TaskLogKindOptions = [
    {
        value: TASK_LOG_WORKING,
        label: taskLog.working,
        color: 'green',
    },
    {
        value: TASK_LOG_OFF,
        label: taskLog.off,
        color: 'yellow',
    },
    {
        value: TASK_LOG_BUG,
        label: taskLog.bug,
        color: 'red',
    },
];

export const lectureKindOptions = [
    {
        value: LECTURE_LESSION,
        label: lectureKindMessage.lesson,
        color: '#00A648',
    },
    {
        value: LECTURE_SECTION,
        label: lectureKindMessage.section,
        color: '#FFBF00',
    },
];

export const projectTaskState = [
    { value: STATE_PROJECT_TASK_CREATE, label: projectTaskStateMessage.create, color: 'yellow' },
    { value: STATE_PROJECT_TASK_PROCESSING, label: projectTaskStateMessage.processing, color: 'blue' },
    { value: STATE_PROJECT_TASK_DONE, label: projectTaskStateMessage.done, color: 'green' },
    { value: STATE_PROJECT_TASK_CANCEL, label: projectTaskStateMessage.cancel, color: 'red' },
];

export const storyState = [
    { value: STATE_PROJECT_STORY_CREATE, label: projectTaskStateMessage.create, color: 'yellow' },
    { value: STATE_PROJECT_STORY_PROCESSING, label: projectTaskStateMessage.processing, color: 'blue' },
    { value: STATE_PROJECT_STORY_DONE, label: projectTaskStateMessage.done, color: 'green' },
    { value: STATE_PROJECT_STORY_CANCEL, label: projectTaskStateMessage.cancel, color: 'red' },
];
export const archivedOption = [
    { value: 0, label: archivedMessage.NotReset },
    { value: 1, label: archivedMessage.Reset },
];
