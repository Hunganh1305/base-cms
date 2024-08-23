import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';

import { AppConstants, DATE_DISPLAY_FORMAT, DATE_FORMAT_DISPLAY, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { lectureState } from '@constants/masterData';

import routes from '@routes';
import useDisclosure from '@hooks/useDisclosure';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';

import AvatarField from '@components/common/form/AvatarField';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import BaseTable from '@components/common/table/BaseTable';
import { BaseTooltip } from '@components/common/form/BaseTooltip';

import { formatMoney } from '@utils';

import { TeamOutlined, BookOutlined, UserOutlined, CommentOutlined, HistoryOutlined } from '@ant-design/icons';
import { Button, Flex, Tag } from 'antd';
import { commonMessage } from '@locales/intl';
import dayjs from 'dayjs';

import styles from './course.module.scss';
import { FieldTypes } from '@constants/formConfig';

const message = defineMessages({
    objectName: 'Khoá học',
});

const Course = () => {
    const translate = useTranslate();
    const stateValues = translate.formatKeys(lectureState, ['label']);
    const breadRoutes = [{ breadcrumbName: translate.formatMessage(commonMessage.course) }];
    const [courseId, setCourseId] = useState();
    const navigate = useNavigate();

    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination } = useListBase({
        apiConfig: apiConfig.course,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(message.objectName),
        },
        override: (funcs) => {
            funcs.getList = () => {
                const params = mixinFuncs.prepareGetListParams(queryFilter);
                mixinFuncs.handleFetchList({
                    ...params,
                    isKnowledge: false,
                });
            };
            funcs.additionalActionColumnButtons = () => ({
                history: ({ id, name, state }) => (
                    <BaseTooltip title={translate.formatMessage(commonMessage.history)}>
                        <Button
                            type="link"
                            disabled={state !== 2 && state !== 3 }
                            style={{ padding: 0 }}
                            onClick={(e) => {
                                e.stopPropagation;
                                navigate(
                                    routes.taskLogListPage.path + `?courseName=${name}&courseId=${id}&state=${state}`,
                                );
                            }}
                        >
                            <HistoryOutlined />
                        </Button>
                    </BaseTooltip>
                ),
            });
        },
    });

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.courseName),
        },
        {
            key: 'state',
            placeholder: translate.formatMessage(commonMessage.state),
            type: FieldTypes.SELECT,
            options: stateValues,
            submitOnChanged: true,
        },
    ].filter(Boolean);

    const columns = [
        {
            title: '#',
            dataIndex: 'avatar',
            align: 'center',
            width: 80,
            render: (avatar) => (
                <AvatarField
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
                />
            ),
        },
        {
            title: translate.formatMessage(commonMessage.courseName),
            dataIndex: 'name',
        },
        {
            title: translate.formatMessage(commonMessage.subjectName),
            // dataIndex: 'subject',
            width: 200,
            render: (dataRow) => {
                return (
                    <Flex vertical>
                        <span>{dataRow?.subject?.subjectName}</span>
                        <span style={{ fontSize: 12 }}>Leader: {dataRow?.leader?.account?.fullName}</span>
                    </Flex>
                );
            },
        },
        {
            title: <FormattedMessage defaultMessage="Học phí" />,
            dataIndex: 'fee',
            width: 150,
            align: 'right',
            render: (fee) => {
                const formattedValue = formatMoney(fee, {
                    currentcy: 'đ',
                    currentDecimal: '0',
                    groupSeparator: ',',
                });
                return <div>{formattedValue}</div>;
            },
        },
        {
            title: translate.formatMessage(commonMessage.endDate),
            dataIndex: 'dateEnd',
            render: (dateEnd) => {
                return (
                    <div style={{ padding: '0 4px', fontSize: 14 }}>
                        {dayjs(dateEnd, DATE_DISPLAY_FORMAT).format(DATE_FORMAT_DISPLAY)}
                    </div>
                );
            },
            width: 130,
            align: 'center',
        },
        {
            title: translate.formatMessage(commonMessage.state),
            dataIndex: 'state',
            align: 'center',
            width: 120,
            render(dataRow) {
                const state = stateValues.find((item) => item.value == dataRow);
                return (
                    <Tag color={state.color}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>{state.label}</div>
                    </Tag>
                );
            },
        },
        mixinFuncs.renderStatusColumn({ width: '120px' }),
        mixinFuncs.renderActionColumn(
            {
                history: mixinFuncs.hasPermission([apiConfig.taskLog.getList?.baseURL]),
                edit: true,
                delete: true,
            },
            { width: '180px' },
        ),
    ].filter(Boolean);

    return (
        <PageWrapper routes={breadRoutes}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                    initialValues: queryFilter,
                    className: styles.search,
                })}
                actionBar={mixinFuncs.renderActionBar()}
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

export default Course;
