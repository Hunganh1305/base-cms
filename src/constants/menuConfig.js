import React from 'react';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';
import apiConfig from './apiConfig';
import { IconSettings, IconSchool, IconClipboardText } from '@tabler/icons-react';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lí khóa học" />,
        key: 'quan-ly-khoa-hoc',
        icon: <IconSchool size={16} />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Khóa học" />,
                key: 'course',
                path: routes.courseListPage.path,
                permission: apiConfig.course.getList.baseURL,
            },
            {
                label: <FormattedMessage defaultMessage="Môn học" />,
                key: 'subject',
                path: routes.subjectListPage.path,
                permission: apiConfig.course.getList.baseURL,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý dự án" />,
        key: 'quan-ly-du-an',
        icon: <IconClipboardText size={16} />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Dự án" />,
                key: 'project-management',
                path: routes.projectListPage.path,
                permission: apiConfig.project.getList.baseURL,
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý hệ thống" />,
        key: 'quan-ly-he-thong',
        icon: <IconSettings size={16} />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Cài đặt" />,
                key: 'setting',
                path: routes.settingsPage.path,
                // permission: apiConfig.category.getList.baseURL,
            },
        ],
    },
];
