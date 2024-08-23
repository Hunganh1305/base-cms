import React from 'react';
import routes from './routes';
import { generatePath, useParams } from 'react-router-dom';

import apiConfig from '@constants/apiConfig';

import { showErrorMessage } from '@services/notifyService';

import useTranslate from '@hooks/useTranslate';
import useSaveBase from '@hooks/useSaveBase';

import PageWrapper from '@components/common/layout/PageWrapper';
import SubjectForm from './SubjectForm';

import { defineMessages } from 'react-intl';

const messages = defineMessages({
    subject: 'Môn học',
    objectName: 'môn học',
});

const SubjectSavePage = () => {
    const subjectId = useParams();
    const translate = useTranslate();
    const { detail, mixinFuncs, loading, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.subject.getById,
            create: apiConfig.subject.create,
            update: apiConfig.subject.update,
        },
        options: {
            getListUrl: generatePath(routes.subjectListPage.path, { subjectId }),
            objectName: translate.formatMessage(messages.objectName),
        },
        override: (funcs) => {
            funcs.onSaveError = (err) => {
                if (err.code === 'ERROR-SUBJECT-ERROR-0001') {
                    showErrorMessage('Môn học đã tồn tại');
                    mixinFuncs.setSubmit(false);
                } else {
                    mixinFuncs.handleShowErrorMessage(err, showErrorMessage);
                    mixinFuncs.setSubmit(false);
                }
            };
        },
    });

    return (
        <PageWrapper
            loading={loading}
            routes={[
                {
                    breadcrumbName: translate.formatMessage(messages.subject),
                    path: generatePath(routes.subjectListPage.path, { subjectId }),
                },
                { breadcrumbName: title },
            ]}
            title={title}
        >
            <SubjectForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={mixinFuncs.onSave}
            />
        </PageWrapper>
    );
};

export default SubjectSavePage;
