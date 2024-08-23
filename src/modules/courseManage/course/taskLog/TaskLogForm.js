import React, { useEffect } from 'react';

import AutoCompleteField from '@components/common/form/AutoCompleteField';
import { BaseForm } from '@components/common/form/BaseForm';
import NumericField from '@components/common/form/NumericField';
import SelectField from '@components/common/form/SelectField';
import TextField from '@components/common/form/TextField';

import apiConfig from '@constants/apiConfig';
import { statusOptions, TaskLogKindOptions } from '@constants/masterData';

import useBasicForm from '@hooks/useBasicForm';
import useTranslate from '@hooks/useTranslate';

import { Card, Col, Row } from 'antd';
import { FormattedMessage } from 'react-intl';

const TaskLogForm = (props) => {
    const { formId, actions, onSubmit, dataDetail, setIsChangedFormValues, isEditing } = props;
    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const KindTaskLog = translate.formatKeys(TaskLogKindOptions, ['label']);
    const queryParameters = new URLSearchParams(window.location.search);
    const taskId = queryParameters.get('taskId');
    const taskName = dataDetail ? dataDetail?.task?.lecture?.lectureName : queryParameters.get('taskName');
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });
    const handleSubmit = (values) => {
        values.status = statusValues[1].value;
        return mixinFuncs.handleSubmit({ ...values });
    };
    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            task: taskName,
        });
    }, [dataDetail]);
    useEffect(() => {
        if (!isEditing > 0) {
            form.setFieldsValue({
                kind: KindTaskLog[0].value,
                taskId: taskId,
                task: taskName,
            });
        }
    }, [isEditing]);

    return (
        <BaseForm formId={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className="card-form" bordered={false}>
                {isEditing ? (
                    <Row gutter={16}>
                        <Col span={24}>
                            <TextField
                                disabled={isEditing}
                                label={<FormattedMessage defaultMessage="Task" />}
                                name="task"
                            />
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={16}>
                        <Col span={24}>
                            <AutoCompleteField
                                label={<FormattedMessage defaultMessage="Task" />}
                                name="taskId"
                                apiConfig={apiConfig.taskLog.getList}
                                mappingOptions={(item) => {
                                    const task = item?.task?.lecture?.lectureName;
                                    return { value: item?.task?.id, label: task };
                                }}
                                searchParams={(text) => ({ name: text })}
                            />
                        </Col>
                    </Row>
                )}
                <Row gutter={16}>
                    <Col span={12}>
                        <SelectField
                            required
                            disabled={isEditing}
                            name="kind"
                            label={<FormattedMessage defaultMessage="Loại" />}
                            allowClear={false}
                            options={KindTaskLog}
                        />
                    </Col>
                    <Col span={12}>
                        <NumericField
                            width="100%"
                            label={<FormattedMessage defaultMessage="Tổng thời gian" />}
                            fieldName="totalTime"
                            addonAfter={<FormattedMessage defaultMessage="Phút" />}
                            min={0}
                            required
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
                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default TaskLogForm;
