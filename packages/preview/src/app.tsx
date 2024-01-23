import { trim } from 'lodash';
import type { FunctionComponent } from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, HashRouter, BrowserRouter } from 'react-router-dom';
import { appConfig } from './appConfig';
import { pageConfig } from './pageConfig';
import './global.less';

// auto components
const components = require.context('./pages/', true, /index\.tsx/, 'lazy');

const routes = components
    .keys()
    .filter((v) => {
        if (v.includes('/components/')) {
            return false;
        }
        return v;
    })
    .map((v) => {
        const path = v.substring(1, v.length - 'index.tsx'.length - 1);

        const component = lazy(async () => {
            const res = await components(v);
            return res;
        });

        return {
            path,
            component,
        };
    });

routes.push({
    path: '/',
    component: lazy(async () => {
        const res = await import('./pages/index/index');
        return res;
    }),
});

export const App: FunctionComponent = () => {
    const RouteType = appConfig.routeType === 'browser' ? BrowserRouter : HashRouter;

    const distPath = pageConfig.distPath ? `/${trim(pageConfig.distPath, '/')}/` : '/';

    return (
        <Suspense fallback={<div>loading...</div>}>
            <RouteType basename={distPath}>
                <Routes>
                    {routes.map((v) => {
                        return <Route key={v.path} path={v.path} element={<v.component />} />;
                    })}
                    {/* 404 */}
                    <Route path="*" element={<>页面不存在</>} />
                </Routes>
            </RouteType>
        </Suspense>
    );
};
