import { FC } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { Code } from './components/Code';
import { Colors } from './components/Colors';
import { Header } from './components/Header';
import { PageStore } from './components/PageStore';
import { Preview } from './components/Preview';
import { SvgList } from './components/SvgList';

const Main: FC = () => {
    return (
        <main className="flex flex-col h-screen">
            <Header />
            <PanelGroup className="flex-1" direction="horizontal" autoSaveId="index">
                <Panel defaultSizePercentage={50}>
                    <SvgList />
                </Panel>
                <PanelResizeHandle className="w-2 bg-neutral-content" />
                <Panel defaultSizePercentage={50}>
                    <PanelGroup direction="vertical" autoSaveId="index/control">
                        <Panel>
                            <Preview />
                        </Panel>
                        <PanelResizeHandle className="h-2 bg-neutral-content" />
                        <Panel defaultSizePixels={200}>
                            <Colors />
                        </Panel>
                        <PanelResizeHandle className="h-2 bg-neutral-content" />
                        <Panel defaultSizePixels={200}>
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

export { App };
