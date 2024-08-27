import { DATE_FORMAT_END_OF_DAY_TIME, DATE_FORMAT_ZERO_TIME, DEFAULT_FORMAT, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { archivedOption, TaskLogKindOptions } from '@constants/masterData';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useListBase from '@hooks/useListBase';
import useNotification from '@hooks/useNotification';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { hideAppLoading, showAppLoading } from '@store/actions/app';
import { convertUtcToLocalTime, formatDateString } from '@utils';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';

const message = defineMessages({
    objectName: 'Hoạt động của tôi',
    reminderMessage: 'Vui lòng chọn dự án !',
    gitCommitUrl: 'Đường dẫn commit git',
    title: 'Bạn có xác nhận đặt lại thời gian?',
    ok: 'Đồng ý',
    cancel: 'Huỷ',
    resetSuccess: 'Đặt lại thời gian thành công!',
    reset: 'Đặt lại thời gian thành công',
});

const MemberActivityProjectListPage = () => {
    const translate = useTranslate();
    const queryParameters = new URLSearchParams(window.location.search);
    const projectId = queryParameters.get('projectId');
    const projectName = queryParameters.get('projectName');
    const developerId = queryParameters.get('developerId');
    const studentName = queryParameters.get('studentName');
    const archived = queryParameters.get('archived');
    const dispatch = useDispatch();
    const notification = useNotification();
    const KindTaskLog = translate.formatKeys(TaskLogKindOptions, ['label']);
    const archivedOptions = translate.formatKeys(archivedOption, ['label']);

    const pathPrev = localStorage.getItem('pathPrev');
    const [detail, setDetail] = useState({});
    const [openedModal, handlersModal] = useDisclosure(false);
    const { execute } = useFetch(apiConfig.projectTaskLog.archiveAll);
    const { execute: executeGet, loading: loadingDetail } = useFetch(apiConfig.projectTask.getById, {
        immediate: false,
    });
    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination, queryParams, serializeParams } =
        useListBase({
            apiConfig: apiConfig.projectTaskLog,
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
                funcs.getList = () => {
                    const params = mixinFuncs.prepareGetListParams(queryFilter);
                    mixinFuncs.handleFetchList({ ...params, developerId, projectId, studentName: null });
                };
                funcs.changeFilter = (filter) => {
                    const projectId = queryParams.get('projectId');
                    const developerId = queryParams.get('developerId');
                    const studentName = queryParams.get('studentName');
                    const projectName = queryParams.get('projectName');
                    mixinFuncs.setQueryParams(
                        serializeParams({ projectId, developerId, studentName, projectName, ...filter }),
                    );
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

    const handleOnClickReview = (url) => {
        const pattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
        if (pattern.test(url)) {
            window.open(url, '_blank');
        } else {
            notification({
                type: 'warning',
                message: translate.formatMessage(commonMessage.warningUrl),
            });
        }
    };

    const handleFetchDetail = (id) => {
        dispatch(showAppLoading());
        executeGet({
            pathParams: { id: id },
            onCompleted: (response) => {
                setDetail(response.data);
                dispatch(hideAppLoading());
                handlersModal.open();
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    };

    return <div> MemberActivityProjectListPage</div>;
};

export default MemberActivityProjectListPage;
