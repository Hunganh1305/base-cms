import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../routes';

import useTranslate from '@hooks/useTranslate';
import useListBase from '@hooks/useListBase';

import apiConfig from '@constants/apiConfig';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';

import ScheduleFile from '@components/common/elements/ScheduleFile';
import AvatarField from '@components/common/form/AvatarField';
import ListPage from '@components/common/layout/ListPage';
import BaseTable from '@components/common/table/BaseTable';

import { Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { commonMessage } from '@locales/intl';
import { defineMessages, FormattedMessage } from 'react-intl';

import styles from './member.module.scss';

const message = defineMessages({
    objectName: 'Thành viên',
    role: 'Vai trò',
    name: 'Họ và tên ',
    developer: 'Lập trình viên',
    member: 'Thành viên',
    team: 'Nhóm',
});

const ProjectMemberListPage = ({ setSearchFilter }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { pathname: pagePath } = useLocation();
    const location = useLocation();
    const queryParameters = new URLSearchParams(window.location.search);
    const projectId = queryParameters.get('projectId');
    const projectName = queryParameters.get('projectName');
    const active = queryParameters.get('active');
    const activeProjectTab = localStorage.getItem('activeProjectTab');
    localStorage.setItem('pathPrev', location.search);
    let { data, mixinFuncs, queryFilter, loading, pagination, changePagination, queryParams, serializeParams } =
        useListBase({
            apiConfig: apiConfig.memberProject,
            options: {
                pageSize: DEFAULT_TABLE_ITEM_SIZE,
                objectName: translate.formatMessage(message.objectName),
            },
            tabOptions: {
                queryPage: {
                    projectId,
                },
                isTab: true,
            },
            override: (funcs) => {
                const pathDefault = `?projectId=${projectId}&projectName=${projectName}`;
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
                    return `${routes.projectMemberListPage.path}/create?projectId=${projectId}&projectName=${projectName}&active=${active}`;
                };
                funcs.getItemDetailLink = (dataRow) => {
                    if (active)
                        return `${routes.projectMemberListPage.path}/${dataRow.id}` + pathDefault + `&active=${active}`;
                    else return `${routes.projectMemberListPage.path}/${dataRow.id}` + pathDefault;
                };
            },
        });

    useEffect(() => {
        setSearchFilter(queryFilter);
    }, [queryFilter]);
    const handleOnClick = (event, record) => {
        event.preventDefault();
        navigate(
            routes.memberActivityProjectListPage.path +
                `?projectId=${record?.project?.id}&developerId=${record?.developer.accountDto?.id}&studentName=${record?.developer.accountDto?.fullName}
                    &projectName=${record?.project?.name}`,
        );
    };

    const columns = [
        {
            title: '#',
            dataIndex: ['developer', 'accountDto', 'avatar'],
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
            title: translate.formatMessage(commonMessage.name),
            dataIndex: ['developer', 'accountDto', 'fullName'],
            render: (fullName, record) => (
                <div onClick={(event) => handleOnClick(event, record)} className={styles.customDiv}>
                    {fullName}
                </div>
            ),
        },
        {
            title: translate.formatMessage(commonMessage.role),
            dataIndex: ['projectRole', 'projectRoleName'],
            width: 120,
        },
        {
            title: <FormattedMessage defaultMessage={'Trả lương'} />,
            dataIndex: ['isPaid'],
            width: 120,
            align: 'center',
            render(dataRow) {
                return dataRow === true ? (
                    <Tag color={'green'}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>Có trả lương</div>
                    </Tag>
                ) : (
                    <Tag color={'yellow'}>
                        <div style={{ padding: '0 4px', fontSize: 14 }}>Không trả lương</div>
                    </Tag>
                );
            },
        },
        {
            title: 'Lịch trình',
            dataIndex: 'schedule',
            align: 'center',
            render: (schedule) => {
                return <ScheduleFile schedule={schedule} />;
            },
            width: 180,
        },

        active &&
            mixinFuncs.renderActionColumn(
                {
                    edit: true,
                    delete: true,
                },
                { width: '120px' },
            ),
    ].filter(Boolean);
    return (
        <ListPage
            title={<span style={{ fontWeight: 'normal', fontSize: '18px' }}>{projectName}</span>}
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
                    onChange={changePagination}
                    pagination={pagination}
                    loading={loading}
                    dataSource={data}
                    columns={columns}
                />
            }
        />
    );
};

export default ProjectMemberListPage;
