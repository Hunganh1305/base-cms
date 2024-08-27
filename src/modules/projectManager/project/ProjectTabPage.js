import useTranslate from '@hooks/useTranslate';
import React, { useState } from 'react';
import routes from './routes';
import { commonMessage } from '@locales/intl';
import useQueryParams from '@hooks/useQueryParams';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import { Tabs } from 'antd';
import StoryListPage from './storyTab';
import ProjectMemberListPage from './member';

const ProjectTabPage = () => {
    const translate = useTranslate();
    const { params: queryParams, setQueryParams, serializeParams, deserializeParams } = useQueryParams();
    const projectName = queryParams.get('projectName');
    const [searchFilter, setSearchFilter] = useState([]);
    const [activeTab, setActiveTab] = useState(
        localStorage.getItem(routes.projectTabPage.keyActiveTab)
            ? localStorage.getItem(routes.projectTabPage.keyActiveTab)
            : translate.formatMessage(commonMessage.story),
    );
    const dataTab = [
        {
            label: translate.formatMessage(commonMessage.story),
            key: translate.formatMessage(commonMessage.task),
            children: <StoryListPage setSearchFilter={setSearchFilter} />,
        },
        {
            label: translate.formatMessage(commonMessage.member),
            key: translate.formatMessage(commonMessage.member),
            children: <ProjectMemberListPage setSearchFilter={setSearchFilter} />,
        },
        {
            label: translate.formatMessage(commonMessage.projectCategory),
            key: translate.formatMessage(commonMessage.projectCategory),
            // children: <ProjectCategoryListPage setSearchFilter={setSearchFilter} />,
        },
    ];

    const breadcrumbs = [
        {
            breadcrumbName: translate.formatMessage(commonMessage.project),
            path: routes.projectListPage.path,
        },
        {
            breadcrumbName: projectName,
        },
    ];
    return (<PageWrapper routes={breadcrumbs}>
        <ListPage
            baseTable={
                <Tabs
                    style={{ marginTop: 20 }}
                    type="card"
                    onTabClick={(key) => {
                        setActiveTab(key);
                        localStorage.setItem(routes.projectTabPage.keyActiveTab, key);
                    }}
                    activeKey={activeTab}
                    items={dataTab.map((item) => {
                        return {
                            label: item.label,
                            key: item.key,
                            children: item.children,
                        };
                    })}
                />
            }
        />
    </PageWrapper>);
};

export default ProjectTabPage;
