import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes';

import {
    DATE_FORMAT_DISPLAY,
    DATE_FORMAT_END_OF_DAY_TIME,
    DATE_FORMAT_ZERO_TIME,
    DEFAULT_FORMAT,
    DEFAULT_TABLE_ITEM_SIZE,
} from '@constants';
import apiConfig from '@constants/apiConfig';
import { storyState } from '@constants/masterData';
import { FieldTypes } from '@constants/formConfig';

import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useListBase from '@hooks/useListBase';
import useNotification from '@hooks/useNotification';
import useTranslate from '@hooks/useTranslate';

import { BaseTooltip } from '@components/common/form/BaseTooltip';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import { BaseForm } from '@components/common/form/BaseForm';
import NumericField from '@components/common/form/NumericField';
import TextField from '@components/common/form/TextField';
import DetailMyTaskProjectModal from '../DetailMyTaskProjectModal';

import { commonMessage } from '@locales/intl';
import { convertUtcToLocalTime, formatDateString } from '@utils';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Button, Col, Modal, Row, Tag } from 'antd';
import { CalendarOutlined, CheckOutlined } from '@ant-design/icons';

import styles from '../project.module.scss';

const message = defineMessages({
    objectName: 'Story',
    cancel: 'Huỷ',
    done: 'Hoàn thành',
    updateTaskSuccess: 'Cập nhật tình trạng thành công',
    updateTaskError: 'Cập nhật tình trạng thất bại',
});

const StoryListPage = ({ setSearchFilter }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const notification = useNotification({ duration: 3 });
    const intl = useIntl();

    const queryParameters = new URLSearchParams(window.location.search);
    const projectId = queryParameters.get('projectId');
    const projectName = queryParameters.get('projectName');
    const active = queryParameters.get('active');
    const stateValues = translate.formatKeys(storyState, ['label']);
    const location = useLocation();
    const activeProjectTab = localStorage.getItem('activeProjectTab');
    localStorage.setItem('pathPrev', location.search);
    const [openedModal, handlersModal] = useDisclosure(false);
    const [detail, setDetail] = useState({});
    const [openedStateTaskModal, handlersStateTaskModal] = useDisclosure(false);

    const { execute: executeGet } = useFetch(apiConfig.story.getById, {
        immediate: false,
    });

    const { execute: executeUpdate } = useFetch(apiConfig.projectTask.changeState, { immediate: false });

    const handleOk = (values) => {
        handlersStateTaskModal.close();
        updateState(values);
    };

    const updateState = (values) => {
        executeUpdate({
            data: {
                id: detail.id,
                state: 3,
                minutes: values.minutes,
                message: values.message,
                gitCommitUrl: values.gitCommitUrl,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    handlersStateTaskModal.close();
                    mixinFuncs.getList();
                    notification({
                        message: intl.formatMessage(message.updateTaskSuccess),
                    });
                }
            },
            onError: (err) => {
                notification({
                    message: intl.formatMessage(message.updateTaskError),
                });
            },
        });
    };

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

    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination, queryParams, serializeParams } =
        useListBase({
            apiConfig: apiConfig.story,
            options: {
                pageSize: DEFAULT_TABLE_ITEM_SIZE,
                objectName: translate.formatMessage(commonMessage.story),
            },
            tabOptions: {
                queryPage: {
                    projectId,
                },
                isTab: true,
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
                    return `${routes.StoryListPage.path}/create?projectId=${projectId}&projectName=${projectName}&active=${active}`;
                };
                funcs.getItemDetailLink = (dataRow) => {
                    return `${routes.StoryListPage.path}/${dataRow.id}?projectId=${projectId}&projectName=${projectName}&active=${active}`;
                };

                funcs.getList = () => {
                    const params = mixinFuncs.prepareGetListParams(queryFilter);
                    mixinFuncs.handleFetchList({ ...params, projectId });
                };
                funcs.changeFilter = (filter) => {
                    const projectId = queryParams.get('projectId');
                    const storyId = queryParams.get('storyId');
                    const projectName = queryParams.get('projectName');
                    const storyName = queryParams.get('storyName');

                    mixinFuncs.setQueryParams(serializeParams({ projectId, projectName, ...filter }));
                };
                const handleFilterSearchChange = funcs.handleFilterSearchChange;
                funcs.handleFilterSearchChange = (values) => {
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
            },
        });

    const columns = [
        {
            title: <FormattedMessage defaultMessage="Tên story" />,
            dataIndex: 'storyName',
        },
        {
            title: <FormattedMessage defaultMessage="Người thực hiện" />,
            width: 250,
            dataIndex: ['developerInfo', 'account', 'fullName'],
            render: (_, record) => record?.developerInfo?.account?.fullName || record?.leader?.leaderName,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            align: 'right',
            width: 170,
            render: (date) => {
                const createdDate = convertUtcToLocalTime(date, DEFAULT_FORMAT, DEFAULT_FORMAT);
                return <div>{createdDate}</div>;
            },
        },
        {
            title: 'Tình trạng',
            dataIndex: 'state',
            align: 'center',
            width: 120,
            render(dataRow) {
                const state = stateValues?.find((item) => item?.value == dataRow);
                return (
                    <Tag color={state?.color}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>{state?.label}</div>
                    </Tag>
                );
            },
        },

        active && mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '120px' }),
    ].filter(Boolean);

    const { data: memberProject } = useFetch(apiConfig.memberProject.autocomplete, {
        immediate: true,
        params: { projectId: projectId },
        mappingData: ({ data }) =>
            data.content.map((item) => ({
                value: item?.developer?.id,
                label: item?.developer?.account?.fullName,
            })),
    });

    const searchFields = [
        {
            key: 'developerId',
            placeholder: <FormattedMessage defaultMessage={'Lập trình viên'} />,
            type: FieldTypes.SELECT,
            options: memberProject,
            colSpan: 3,
            submitOnChanged: true,
        },
        {
            key: 'state',
            placeholder: translate.formatMessage(commonMessage.state),
            type: FieldTypes.SELECT,
            options: stateValues,
            submitOnChanged: true,
        },
    ].filter(Boolean);

    useEffect(() => {
        setSearchFilter(queryFilter);
    }, [queryFilter]);

    const handleOnClick = (event, record) => {
        event.preventDefault();
        localStorage.setItem(routes.projectTabPage.keyActiveTab, translate.formatMessage(commonMessage.task));
        navigate(
            routes.ProjectTaskListPage.path +
                `?projectId=${projectId}&storyId=${record.id}&storyName=${record.storyName}&active=${!!record.status == 1}&projectName=${projectName}`,
        );
    };

    return (
        <div>
            <ListPage
                title={<span style={{ fontWeight: 'normal', fontSize: '18px' }}>{projectName}</span>}
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                    activeTab: activeProjectTab,
                })}
                actionBar={
                    <div
                        style={{
                            position: 'absolute',
                            top: '-88px',
                            right: '-26px',
                            zIndex: 999,
                        }}
                    >
                        {mixinFuncs.renderActionBar()}
                    </div>
                }
                baseTable={
                    <BaseTable
                        onRow={(record) => ({
                            onClick: (e) => {
                                e.stopPropagation();
                                handleOnClick(e, record);
                            },
                        })}
                        onChange={changePagination}
                        pagination={pagination}
                        loading={loading}
                        dataSource={data}
                        columns={columns}
                    />
                }
            />
            <Modal
                title="Thay đổi tình trạng hoàn thành"
                open={openedStateTaskModal}
                destroyOnClose={true}
                footer={null}
                onCancel={() => handlersStateTaskModal.close()}
                data={detail || {}}
            >
                <BaseForm onFinish={handleOk} size="100%">
                    <div
                        style={{
                            margin: '28px 0 20px 0',
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={24}>
                                <NumericField
                                    label={<FormattedMessage defaultMessage="Tổng thời gian" />}
                                    name="minutes"
                                    required
                                    addonAfter={<FormattedMessage defaultMessage="Phút" />}
                                    min={0}
                                />
                            </Col>
                            <Col span={24}>
                                <TextField
                                    label={<FormattedMessage defaultMessage="Đường dẫn commit git" />}
                                    name="gitCommitUrl"
                                />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <TextField
                                    label={<FormattedMessage defaultMessage="Lời nhắn" />}
                                    name="message"
                                    type="textarea"
                                    required
                                />
                            </Col>
                        </Row>
                        <div style={{ float: 'right' }}>
                            <Button className={styles.btnModal} onClick={() => handlersStateTaskModal.close()}>
                                {translate.formatMessage(message.cancel)}
                            </Button>
                            <Button key="submit" type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
                                {translate.formatMessage(message.done)}
                            </Button>
                        </div>
                    </div>
                </BaseForm>
            </Modal>
            <DetailMyTaskProjectModal open={openedModal} onCancel={() => handlersModal.close()} DetailData={detail} />
        </div>
    );
};

export default StoryListPage;
