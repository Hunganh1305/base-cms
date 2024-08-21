import React, { useState } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppConstants, DATE_DISPLAY_FORMAT, DATE_FORMAT_DISPLAY, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';

import routes from '@routes';
import useDisclosure from '@hooks/useDisclosure';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import useFetch from '@hooks/useFetch';

import { formatMoney } from '@utils';

import { TeamOutlined, BookOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';
import { BaseTooltip } from '@components/common/form/BaseTooltip';
import { Button, Flex, Tag } from 'antd';
import { commonMessage } from '@locales/intl';
import dayjs from 'dayjs';
import AvatarField from '@components/common/form/AvatarField';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import BaseTable from '@components/common/table/BaseTable';

import styles from './course.module.scss';
import { lectureState } from '@constants/masterData';

const message = defineMessages({
    objectName: 'Khoá học',
});

const Course = () => {
    const translate = useTranslate();
    const queryParameters = new URLSearchParams(window.location.search);
    const leaderName = queryParameters.get('leaderName');
    console.log('leaderNam checke', !leaderName);

    const stateValues = translate.formatKeys(lectureState, ['label']);
    const breadRoutes = [{ breadcrumbName: translate.formatMessage(commonMessage.course) }];
    const [checkReivew, setCheckReview] = useState(true);
    const [courseId, setCourseId] = useState();
    const [openReviewModal, handlersReviewModal] = useDisclosure(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination, queryParams, serializeParams } =
        useListBase({
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
                funcs.changeFilter = (filter) => {
                    const leaderId = queryParams.get('leaderId');
                    const leaderName = queryParams.get('leaderName');
                    if (leaderId) {
                        mixinFuncs.setQueryParams(
                            serializeParams({ leaderId: leaderId, leaderName: leaderName, ...filter }),
                        );
                    } else {
                        mixinFuncs.setQueryParams(serializeParams(filter));
                    }
                };
                funcs.additionalActionColumnButtons = () => ({
                    developer: ({ id, name, state, status, knowledge }) => {
                        if (knowledge) {
                            return (
                                <BaseTooltip title={translate.formatMessage(commonMessage.developer)}>
                                    <Button
                                        type="link"
                                        style={{ padding: 0 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(
                                                routes.developerKnowledgeListPage.path +
                                                    `?courseId=${id}&courseName=${name}&courseState=${state}&courseStatus=${status}&knowledgeId=${knowledge.id}`,
                                            );
                                        }}
                                    >
                                        <UserOutlined />
                                    </Button>
                                </BaseTooltip>
                            );
                        }
                    },
                    registration: ({ id, name, state, status }) => (
                        <BaseTooltip title={translate.formatMessage(commonMessage.registration)}>
                            <Button
                                type="link"
                                disabled={state === 1}
                                style={{ padding: 0 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    state !== 1 &&
                                        navigate(
                                            routes.registrationListPage.path +
                                                `?courseId=${id}&courseName=${name}&courseState=${state}&courseStatus=${status}`,
                                        );
                                }}
                            >
                                <TeamOutlined />
                            </Button>
                        </BaseTooltip>
                    ),

                    task: ({ id, name, subject, state, status }) => (
                        <BaseTooltip title={translate.formatMessage(commonMessage.task)}>
                            <Button
                                disabled={state === 1 || state === 5}
                                type="link"
                                style={{ padding: 0 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const path =
                                        (leaderName ? routes.leaderCourseTaskListPage.path : routes.taskListPage.path) +
                                        `?courseId=${id}&courseName=${name}&subjectId=${subject.id}&state=${state}&courseStatus=${status}` +
                                        (leaderName ? `&leaderName=${leaderName}` : '');
                                    state !== 1 &&
                                        state !== 5 &&
                                        navigate(path, { state: { pathPrev: location.search } });
                                }}
                            >
                                <BookOutlined />
                            </Button>
                        </BaseTooltip>
                    ),
                    review: ({ id, name, subject, state, status, item }) => (
                        <BaseTooltip title={translate.formatMessage(commonMessage.review)}>
                            <Button
                                type="link"
                                disabled={state !== 3}
                                style={{ padding: 0 }}
                                onClick={(e) => {
                                    setCourseId(id);
                                    // getListReview(id);
                                    // getStarReview(id);
                                    e.stopPropagation();
                                    handlersReviewModal.open();
                                }}
                            >
                                <CommentOutlined />
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
        !leaderName && mixinFuncs.renderStatusColumn({ width: '120px' }),
        mixinFuncs.renderActionColumn(
            {
                // developer: mixinFuncs.hasPermission([apiConfig.knowledgePermission.getList.baseURL]),
                // review: mixinFuncs.hasPermission([
                //     apiConfig.review.star?.baseURL,
                //     apiConfig.review.listReviews?.baseURL,
                // ]),
                // registration: !leaderName && mixinFuncs.hasPermission([apiConfig.registration.getList?.baseURL]),
                // task: mixinFuncs.hasPermission([apiConfig.task.getList?.baseURL]),
                edit: !leaderName && true,
                delete: !leaderName && true,
            },
            { width: '180px' },
        ),
    ].filter(Boolean);

    return (
        <PageWrapper routes={breadRoutes}>
            <ListPage
                title={leaderName && <span style={{ fontWeight: 'normal' }}>{leaderName}</span>}
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                    initialValues: queryFilter,
                    className: styles.search,
                })}
                actionBar={!leaderName && mixinFuncs.renderActionBar()}
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
