import React from 'react';
import { useNavigate } from 'react-router-dom';

import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';

import useTranslate from '@hooks/useTranslate';
import useListBase from '@hooks/useListBase';

import { DEFAULT_FORMAT, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { FieldTypes } from '@constants/formConfig';
import { statusOptions } from '@constants/masterData';

import { showErrorMessage } from '@services/notifyService';
import { convertDateTimeToString, convertStringToDateTime } from '@utils/dayHelper';

import { commonMessage } from '@locales/intl';
import { defineMessages } from 'react-intl';

import styles from './subject.module.scss';

const message = defineMessages({
    objectName: 'Môn học',
    code: 'Mã môn học',
    id: 'Id',
});

const SubjectListPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const statusValue = translate.formatKeys(statusOptions, ['label']);
    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination, setLoading } = useListBase({
        apiConfig: apiConfig.subject,
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
            funcs.handleDeleteItemError = (error) => {
                if (error.response?.data?.code === 'ERROR-COURSE-ERROR-0001') {
                    showErrorMessage('Môn học đã được liên kết với khóa học');
                    setLoading(false);
                } else {
                    showErrorMessage(error?.response?.data?.message);
                    setLoading(false);
                }
            };
        },
    });
    const breadRoutes = [{ breadcrumbName: translate.formatMessage(commonMessage.subject) }];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.subjectName),
        },
        {
            key: 'status',
            placeholder: translate.formatMessage(commonMessage.status),
            type: FieldTypes.SELECT,
            options: statusValue,
            submitOnChanged: true,
        },
    ];

    const handleOnClick = (event, record) => {
        event.preventDefault();
        navigate(`./lecture/${record.id}?subjectName=${record.subjectName}`);
    };

    const columns = [
        {
            title: translate.formatMessage(commonMessage.subjectName),
            dataIndex: 'subjectName',
            render: (subjectName, record) =>
                !record.parentId ? (
                    <div onClick={(event) => handleOnClick(event, record)} className={styles.customDiv}>
                        {subjectName}
                    </div>
                ) : (
                    <div>{subjectName}</div>
                ),
        },
        {
            title: translate.formatMessage(message.code),
            dataIndex: 'subjectCode',
            width: 200,
        },
        {
            title: translate.formatMessage(commonMessage.createdDate),
            dataIndex: 'createdDate',
            render: (createdDate) => {
                const modifiedDate = convertStringToDateTime(createdDate, DEFAULT_FORMAT, DEFAULT_FORMAT).add(
                    7,
                    'hour',
                );
                const modifiedDateTimeString = convertDateTimeToString(modifiedDate, DEFAULT_FORMAT);
                return <div style={{ padding: '0 4px', fontSize: 14 }}>{modifiedDateTimeString}</div>;
            },
            width: 180,
            align: 'right',
        },
        mixinFuncs.renderStatusColumn({ width: '120px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '120px' }),
    ];

    return (
        <PageWrapper routes={breadRoutes}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
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

export default SubjectListPage;
