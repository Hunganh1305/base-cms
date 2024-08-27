import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from './routes';

import {
    AppConstants,
    DATE_FORMAT_DISPLAY,
    DATE_FORMAT_VALUE,
    DEFAULT_FORMAT,
    DEFAULT_TABLE_ITEM_SIZE,
} from '@constants';
import apiConfig from '@constants/apiConfig';
import { FieldTypes } from '@constants/formConfig';
import { projectTaskState, statusOptions } from '@constants/masterData';

import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';

import { commonMessage } from '@locales/intl';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { formatDateString } from '@utils';
import { convertDateTimeToString, convertStringToDateTime } from '@utils/dayHelper';


import { BaseTooltip } from '@components/common/form/BaseTooltip';
import BaseTable from '@components/common/table/BaseTable';
import AvatarField from '@components/common/form/AvatarField';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { BaseForm } from '@components/common/form/BaseForm';
import DatePickerField from '@components/common/form/DatePickerField';

import { Button, Col, Form, Modal, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { DollarOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { defineMessages, FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';
import { IconReportMoney } from '@tabler/icons-react';

import styles from './project.module.scss';

const messages = defineMessages({
    objectName: 'Dự án',
});

const ProjectListPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const developerId = queryParameters.get('developerId');
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const stateValues = translate.formatKeys(projectTaskState, ['label']);
    const leaderName = queryParameters.get('leaderName');
    const developerName = queryParameters.get('developerName');
    const [projectId, setProjectId] = useState();
    const [registerSalaryItem, setRegisterSalaryItem] = useState();

    const [hasError, setHasError] = useState(false);
    const [visible, setVisible] = useState(true);

    const { execute: executeCalculateProjectSalary } = useFetch(apiConfig.registerSalaryPeriod.create);
    const { execute: executeUpdateCalculateProjectSalary } = useFetch(apiConfig.registerSalaryPeriod.update);
    const { data: isCheckExist } = useFetch(apiConfig.salaryPeriod.checkExist, {
        immediate: true,
        mappingData: ({ data }) => {
            return data;
        },
    });

    const [openedModalCaculateSalary, handlerModalCaculateSalary] = useDisclosure(false);
    const [openedModalUpdateCaculateSalary, handlerModalUpdateCaculateSalary] = useDisclosure(false);
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        values.dueDate = values.dueDate && formatDateString(values.dueDate, DEFAULT_FORMAT);
        executeCalculateProjectSalary({
            data: { ...values },
            onCompleted: (response) => {
                handlerModalCaculateSalary.close();

                if (response?.result == true) {
                    showSucsessMessage(translate.formatMessage(commonMessage.registerPeriodSalarySuccess));
                    mixinFuncs.getList();
                }
            },
            onError: (error) => {
                handlerModalCaculateSalary.close();
                let errorCode = error.response.data.code;
                if (errorCode == 'ERROR-REGISTER-SALARY-PERIOD-ERROR-0000') {
                    showErrorMessage(translate.formatMessage(commonMessage.registerPeriodSalaryFail));
                } else if (errorCode == 'ERROR-SALARY-PERIOD-ERROR-0002') {
                    showErrorMessage(translate.formatMessage(commonMessage.registerPeriodSalaryFail_2));
                }
            },
        });
        form.resetFields();
    };

    const handleUpdate = (values) => {
        values.dueDate = values.dueDate && formatDateString(values.dueDate, DEFAULT_FORMAT);
        executeUpdateCalculateProjectSalary({
            data: { ...values },
            onCompleted: (response) => {
                handlerModalUpdateCaculateSalary.close();
                if (response?.result == true) {
                    showSucsessMessage(translate.formatMessage(commonMessage.registerPeriodSalarySuccess_1));
                    mixinFuncs.getList();
                }
            },
            onError: (error) => {
                handlerModalUpdateCaculateSalary.close();
                let errorCode = error.response.data.code;
                if (errorCode == 'ERROR-REGISTER-SALARY-PERIOD-ERROR-0001') {
                    showErrorMessage(translate.formatMessage(commonMessage.registerPeriodSalaryFail_1));
                } else if (errorCode == 'ERROR-SALARY-PERIOD-ERROR-0002') {
                    showErrorMessage(translate.formatMessage(commonMessage.registerPeriodSalaryFail_2));
                }
            },
        });
        form.resetFields();
    };
    const validateDueDate = (_, value) => {
        const date = dayjs(formatDateString(new Date(), DEFAULT_FORMAT), DATE_FORMAT_VALUE);
        if (date && value && value.isBefore(date)) {
            return Promise.reject('Ngày kết thúc phải lớn hơn hoặc bằng ngày hiện tại');
        }
        return Promise.resolve();
    };
    let { data, mixinFuncs, queryFilter, loading, pagination, changePagination, queryParams, serializeParams } =
        useListBase({
            apiConfig: apiConfig.project,
            options: {
                pageSize: DEFAULT_TABLE_ITEM_SIZE,
                objectName: translate.formatMessage(messages.objectName),
            },
            override: (funcs) => {
                funcs.mappingData = (response) => {
                    if (response.result === true) {
                        return {
                            data: response.data.content,
                            total: response.data.totalElements,
                        };
                    }
                };
                funcs.getItemDetailLink = (dataRow) => {
                    if (developerId)
                        return `${routes.projectListPage.path}/${dataRow.id}?developerId=${developerId}&developerName=${developerName}`;
                    else return `${routes.projectListPage.path}/${dataRow.id}`;
                };

                funcs.additionalActionColumnButtons = () => ({
                    moneyForDev: ({ id, isRegisteredSalaryPeriod, registerSalaryPeriod }) => {
                        if (isRegisteredSalaryPeriod) {
                            return (
                                <BaseTooltip title={translate.formatMessage(commonMessage.updateRegisterPayout)}>
                                    <Button
                                        type="link"
                                        style={{ padding: 0, display: 'table-cell', verticalAlign: 'middle' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setRegisterSalaryItem(registerSalaryPeriod);
                                            handlerModalUpdateCaculateSalary.open();
                                        }}
                                    >
                                        <IconReportMoney size={'18px'} color={isCheckExist ? 'gray' : 'orange'} />
                                    </Button>
                                </BaseTooltip>
                            );
                        }
                        return (
                            <BaseTooltip title={translate.formatMessage(commonMessage.registerPayout)}>
                                <Button
                                    type="link"
                                    style={{ padding: 0, display: 'table-cell', verticalAlign: 'middle' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setProjectId(id);
                                        handlerModalCaculateSalary.open();
                                        setProjectId(id);
                                    }}
                                >
                                    <DollarOutlined />
                                </Button>
                            </BaseTooltip>
                        );
                    },
                });

                funcs.changeFilter = (filter) => {
                    const leaderId = queryParams.get('leaderId');
                    const leaderName = queryParams.get('leaderName');
                    const developerId = queryParams.get('developerId');
                    const developerName = queryParams.get('developerName');
                    if (leaderId) {
                        mixinFuncs.setQueryParams(
                            serializeParams({ leaderId: leaderId, leaderName: leaderName, ...filter }),
                        );
                    } else if (developerId) {
                        mixinFuncs.setQueryParams(
                            serializeParams({ developerId: developerId, developerName: developerName, ...filter }),
                        );
                    } else {
                        mixinFuncs.setQueryParams(serializeParams(filter));
                    }
                };
            },
        });

    const setBreadRoutes = () => {
        const breadRoutes = [];
        if (leaderName) {
            breadRoutes.push({
                breadcrumbName: translate.formatMessage(commonMessage.leader),
                path: routes.leaderListPage.path,
            });
        } else if (developerName) {
            breadRoutes.push({
                breadcrumbName: translate.formatMessage(commonMessage.developer),
                path: routes.developerListPage.path,
            });
        }
        breadRoutes.push({ breadcrumbName: translate.formatMessage(commonMessage.project) });

        return breadRoutes;
    };


    const convertDate = (date) => {
        const dateConvert = convertStringToDateTime(date, DEFAULT_FORMAT, DATE_FORMAT_DISPLAY);
        return convertDateTimeToString(dateConvert, DATE_FORMAT_DISPLAY);
    };

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.projectName),
        },
        {
            key: 'state',
            placeholder: translate.formatMessage(commonMessage.state),
            type: FieldTypes.SELECT,
            options: stateValues,
            submitOnChanged: true,
        },
        {
            key: 'status',
            placeholder: translate.formatMessage(commonMessage.status),
            type: FieldTypes.SELECT,
            options: statusValues,
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
            title: translate.formatMessage(commonMessage.projectName),
            dataIndex: 'name',
            render: (name, record) => (
                <div onClick={(event) => handleOnClick(event, record)} className={styles.customDiv}>
                    {name}
                </div>
            ),
        },

        {
            title: translate.formatMessage(commonMessage.startDate),
            dataIndex: 'startDate',
            render: (startDate) => {
                return <div style={{ padding: '0 4px', fontSize: 14 }}>{convertDate(startDate)}</div>;
            },
            width: 140,
            align: 'right',
        },
        {
            title: translate.formatMessage(commonMessage.endDate),
            dataIndex: 'endDate',
            render: (endDate) => {
                return <div style={{ padding: '0 4px', fontSize: 14 }}>{convertDate(endDate)}</div>;
            },
            width: 140,
            align: 'right',
        },
        {
            title: 'Tình trạng',
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
        mixinFuncs.renderActionColumn(
            {
                moneyForDev: true,
                edit: true,
                delete: true,
            },
            { width: '120px' },
        ),
    ].filter(Boolean);

    const handleOnClick = (event, record) => {
        event.preventDefault();
        localStorage.setItem(routes.projectTabPage.keyActiveTab, translate.formatMessage(commonMessage.task));
        navigate(
            routes.projectTabPage.path +
                `?projectId=${record.id}&projectName=${record.name}&active=${!!record.status == 1}`,
        );
    };
    return (
        <PageWrapper routes={setBreadRoutes()}>
            <ListPage
                title={<span style={{ fontWeight: 'normal' }}>{leaderName || developerName}</span>}
                searchForm={mixinFuncs.renderSearchForm({
                    fields: searchFields,
                    initialValues: queryFilter,
                    className: styles.search,
                })}
                actionBar={!leaderName && !developerName && mixinFuncs.renderActionBar()}
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
            {hasError && (
                <Modal
                    title={
                        <span>
                            <ExclamationCircleOutlined style={{ color: 'red' }} /> Lỗi
                        </span>
                    }
                    open={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                >
                    <p>Chưa có sinh viên nào trong dự án, vui lòng kiểm tra lại</p>
                </Modal>
            )}
            <Modal
                title={<span>Đăng ký tính lương dự án</span>}
                open={openedModalCaculateSalary}
                onOk={() => form.submit()}
                onCancel={() => handlerModalCaculateSalary.close()}
            >
                <BaseForm
                    form={form}
                    onFinish={(values) => {
                        values.projectId = projectId;
                        handleFinish(values);
                    }}
                    size="100%"
                >
                    <DatePickerField
                        showTime={false}
                        label={<FormattedMessage defaultMessage="Ngày kết thúc" />}
                        name="dueDate"
                        // placeholder="Ngày kết thúc"
                        rules={[
                            {
                                validator: validateDueDate,
                            },
                        ]}
                        format={DATE_FORMAT_DISPLAY}
                        style={{ width: '100%' }}
                    />
                </BaseForm>
            </Modal>
            <Modal
                title={<span>Cập nhật tính lương dự án</span>}
                open={openedModalUpdateCaculateSalary}
                onOk={() => form.submit()}
                onCancel={() => handlerModalUpdateCaculateSalary.close()}
                okText="Cập nhật"
            >
                <BaseForm
                    form={form}
                    onFinish={(values) => {
                        handleUpdate({ ...values, id: registerSalaryItem.id });
                    }}
                    size="100%"
                >
                    <Col span={24}>
                        <DatePickerField
                            showTime={false}
                            label={<FormattedMessage defaultMessage="Ngày kết thúc" />}
                            name="dueDate"
                            rules={[
                                {
                                    validator: validateDueDate,
                                },
                            ]}
                            fieldProps={{
                                defaultValue: dayjs(registerSalaryItem?.dueDate, DATE_FORMAT_DISPLAY),
                            }}
                            format={DATE_FORMAT_DISPLAY}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </BaseForm>
            </Modal>
        </PageWrapper>
    );
};

export default ProjectListPage;
