import type { FC } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { Code } from './components/Code';
import { Colors } from './components/Colors';
import { Header } from './components/Header';
import { PageStore } from './components/PageStore';
import { Preview } from './components/Preview';
import { SvgList } from './components/SvgList';

const Main: FC = () => {
    return (
        <main className="flex h-screen flex-col">
            <Header />
            <PanelGroup className="flex-1" direction="horizontal" autoSaveId="index">
                <Panel defaultSize={50}>
                    <SvgList />
                </Panel>
                <PanelResizeHandle className="w-1 bg-gray-400" />
                <Panel defaultSize={50}>
                    <PanelGroup direction="vertical" autoSaveId="index/control">
                        <Panel>
                            <Preview />
                        </Panel>
                        <PanelResizeHandle className="h-1 bg-gray-400" />
                        <Panel defaultSize={20}>
                            <Colors />
                        </Panel>
                        <PanelResizeHandle className="h-1 bg-gray-400" />
                        <Panel defaultSize={20}>
                            <Code />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </main>
    );
};

const App: FC = () => {
    return (
        <PageStore>
            <Main />
        </PageStore>
    );
};

export default App;
