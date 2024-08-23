import apiConfig from '@constants/apiConfig';
import useTranslate from '@hooks/useTranslate';
import React from 'react';
import { defineMessages } from 'react-intl';
import { generatePath, useParams } from 'react-router-dom';
import routes from '../routes';
import useSaveBase from '@hooks/useSaveBase';
import LectureForm from './LectureForm';
import PageWrapper from '@components/common/layout/PageWrapper';
import { commonMessage } from '@locales/intl';

const messages = defineMessages({
    objectName: 'Bài giảng',
});

const LectureSavePage = () => {
    const translate = useTranslate();
    const lectureId = useParams();
    const { detail, onSave, mixinFuncs, setIsChangedFormValues, isEditing, errors, loading, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.lecture.getById,
            create: apiConfig.lecture.create,
            update: apiConfig.lecture.update,
        },
        options: {
            getListUrl: generatePath(routes.lectureListPage.path, { subjectId: lectureId.subjectId }),
            objectName: translate.formatMessage(messages.objectName),
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: detail.id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                };
            };
        },
    });
    return (
        <PageWrapper
            loading={loading}
            routes={[
                { breadcrumbName: translate.formatMessage(commonMessage.subject), path: routes.subjectListPage.path },
                {
                    breadcrumbName: translate.formatMessage(commonMessage.lecture),
                    path: routes.subjectListPage.path + `/lecture/${lectureId.subjectId}`,
                },
                { breadcrumbName: title },
            ]}
            title={title}
        >
            <LectureForm
                subjectId={lectureId.subjectId}
                formId={mixinFuncs.getFormId()}
                actions={mixinFuncs.renderActions()}
                dataDetail={detail ? detail : {}}
                onSubmit={onSave}
                setIsChangedFormValues={setIsChangedFormValues}
                isError={errors}
                isEditing={isEditing}
            />
        </PageWrapper>
    );
};

export default LectureSavePage;
