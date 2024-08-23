import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';

import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';

import {
    DATE_FORMAT_DISPLAY,
    DATE_FORMAT_END_OF_DAY_TIME,
    DATE_FORMAT_ZERO_TIME,
    DEFAULT_FORMAT,
    DEFAULT_TABLE_ITEM_SIZE,
} from '@constants';
import { lectureState, TaskLogKindOptions } from '@constants/masterData';
import { FieldTypes } from '@constants/formConfig';
import apiConfig from '@constants/apiConfig';

import { convertUtcToLocalTime, deleteSearchFilterInLocationSearch, formatDateString } from '@utils';

import { Tag } from 'antd';
import dayjs from 'dayjs';
import { commonMessage } from '@locales/intl';
import { defineMessages } from 'react-intl';

import styles from './taskLog.module.scss';
import routes from '../routes';

const message = defineMessages({
    objectName: 'Task',
});

const TaskLogListPage = () => {
    const translate = useTranslate();
    const location = useLocation();
    const { pathname: pagePath } = useLocation();

    const search = location.search;
    const queryParameters = new URLSearchParams(window.location.search);
    const courseName = queryParameters.get('courseName');

    const KindOptions = translate.formatKeys(TaskLogKindOptions, ['label']);
    const stateValues = translate.formatKeys(lectureState, ['label']);

    const formatDateToZeroTime = (date) => {
        const dateString = formatDateString(date, DEFAULT_FORMAT);
        return dayjs(dateString, DEFAULT_FORMAT).format(DATE_FORMAT_ZERO_TIME);
    };

    const formatDateToEndOfDayTime = (date) => {
        const dateString = formatDateString(date, DEFAULT_FORMAT);
        return dayjs(dateString, DEFAULT_FORMAT).format(DATE_FORMAT_END_OF_DAY_TIME);
    };

    const formatDateToLocal = (date) => {
        return convertUtcToLocalTime(date, DEFAULT_FORMAT, DEFAULT_FORMAT);
    };

    const { data, mixinFuncs, queryFilter, loading, pagination, queryParams, changePagination, serializeParams } =
        useListBase({
            apiConfig: apiConfig.taskLog,
            options: {
                pageSize: DEFAULT_TABLE_ITEM_SIZE,
                objectName: translate.formatMessage(message.objectName),
            },
            override: (funcs) => {
                funcs.mappingData = (response) => {
                    try {
                        if (response.result === true) {
                            return {
                                data: response.data.content,
                                total: response.data.totalElements,
                            };
                        }
                    } catch (error) {
                        return [];
                    }
                };
                funcs.getCreateLink = () => {
                    return `${pagePath}/create${search}`;
                };
                funcs.getItemDetailLink = (dataRow) => {
                    return `${pagePath}/${dataRow.id}${search}`;
                };
                funcs.getList = () => {
                    const params = mixinFuncs.prepareGetListParams(queryFilter);
                    mixinFuncs.handleFetchList({ ...params, courseName: null, taskName: null, subjectId: null });
                };
                const handleFilterSearchChange = funcs.handleFilterSearchChange;
                funcs.handleFilterSearchChange = (values) => {
                    console.log('filter search change', values);

                    if (values.toDate == null && values.fromDate == null) {
                        delete values.toDate;
                        delete values.fromDate;
                        handleFilterSearchChange({
                            ...values,
                        });
                    } else if (values.toDate == null) {
                        const fromDate = values.fromDate && formatDateToZeroTime(values.fromDate);
                        delete values.toDate;
                        handleFilterSearchChange({
                            ...values,
                            fromDate: fromDate,
                        });
                    } else if (values.fromDate == null) {
                        const toDate = values.toDate && formatDateToEndOfDayTime(values.toDate);
                        delete values.fromDate;
                        handleFilterSearchChange({
                            ...values,
                            toDate: toDate,
                        });
                    } else {
                        const fromDate = values.fromDate && formatDateToZeroTime(values.fromDate);
                        const toDate = values.toDate && formatDateToEndOfDayTime(values.toDate);
                        handleFilterSearchChange({
                            ...values,
                            fromDate: fromDate,
                            toDate: toDate,
                        });
                    }
                };
                funcs.changeFilter = (filter) => {
                    const courseId = queryParams.get('courseId');
                    const subjectId = queryParams.get('subjectId');
                    const courseName = queryParams.get('courseName');
                    const taskId = queryParams.get('taskId');
                    const taskName = queryParams.get('taskName');
                    const state = queryParams.get('state');
                    const courseStatus = queryParams.get('courseStatus');
                    const params = {
                        courseId,
                        courseName,
                        taskId,
                        taskName,
                        subjectId,
                        state,
                        courseStatus,
                        ...filter,
                    };
                    const filteredParams = Object.fromEntries(
                        Object.entries(params).filter(([_, value]) => value != null),
                    );
                    mixinFuncs.setQueryParams(serializeParams(filteredParams));
                };
            },
        });

    const searchFields = [
        {
            key: 'fromDate',
            type: FieldTypes.DATE,
            format: DATE_FORMAT_DISPLAY,
            placeholder: translate.formatMessage(commonMessage.fromDate),
            colSpan: 3,
        },
        {
            key: 'toDate',
            type: FieldTypes.DATE,
            format: DATE_FORMAT_DISPLAY,
            placeholder: translate.formatMessage(commonMessage.toDate),
            colSpan: 3,
        },
    ];

    const initialFilterValues = useMemo(() => {
        const initialFilterValues = {
            ...queryFilter,
            fromDate: queryFilter.fromDate && dayjs(formatDateToLocal(queryFilter.fromDate), DEFAULT_FORMAT),
            toDate:
                queryFilter.toDate && dayjs(formatDateToLocal(queryFilter.toDate), DEFAULT_FORMAT).subtract(7, 'hour'),
        };
        return initialFilterValues;
    }, [queryFilter?.fromDate, queryFilter?.toDate]);

    const columns = [
        {
            title: translate.formatMessage(commonMessage.createdDate),
            width: 250,
            dataIndex: 'createdDate',
            render: (createdDate) => {
                const createdDateLocal = convertUtcToLocalTime(createdDate, DEFAULT_FORMAT, DEFAULT_FORMAT);
                return <div>{createdDateLocal}</div>;
            },
        },
        {
            title: translate.formatMessage(commonMessage.fullName),
            width: 250,
            dataIndex: 'task',
            render: (dataRow) => {
                return <div>{dataRow.student?.account?.fullName}</div>;
            },
        },
        {
            title: translate.formatMessage(commonMessage.task),
            width: 250,
            dataIndex: 'task',
            render: (dataRow) => {
                return <div>{dataRow?.lecture?.lectureName}</div>;
            },
        },
        {
            title: translate.formatMessage(commonMessage.message),
            dataIndex: 'message',
            width: 150,
        },
        {
            title: translate.formatMessage(commonMessage.totalTime),
            dataIndex: 'totalTime',
            align: 'center',
            width: 200,
            render(totalTime) {
                return <div>{Math.ceil((totalTime / 60) * 10) / 10} h</div>;
            },
        },
        {
            title: 'Loại',
            dataIndex: 'kind',
            align: 'center',
            width: 200,
            render(dataRow) {
                const kindLog = KindOptions.find((item) => item.value == dataRow);
                return (
                    <Tag color={kindLog.color}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>{kindLog.label}</div>
                    </Tag>
                );
            },
        },
        {
            title: translate.formatMessage(commonMessage.state),
            dataIndex: 'task',
            align: 'center',
            width: 200,
            render(dataRow) {
                const state = stateValues.find((item) => item.value == dataRow.state);
                return (
                    <Tag color={state.color}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>{state.label}</div>
                    </Tag>
                );
            },
        },
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '120px' }),
    ].filter(Boolean);

    return (
        <PageWrapper
            routes={routes.taskLogListPage.breadcrumbs(
                commonMessage,
                routes.courseListPage.path,
                routes.taskLogListPage.path,
                deleteSearchFilterInLocationSearch(search, ['fromDate', 'toDate']),
            )}
        >
            <ListPage
                title={courseName}
                actionBar={mixinFuncs.renderActionBar()}
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                    className: styles.search,
                    initialValues: initialFilterValues,
                })}
                baseTable={
                    <BaseTable
                        onChange={changePagination}
                        pagination={pagination}
                        loading={loading}
                        dataSource={data}
                        columns={columns}
                    />
                }
            />
        </PageWrapper>
    );
};

export default TaskLogListPage;
