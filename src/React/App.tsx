import { FC } from 'react';
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from '@grapesjs/react';
import grapesjs, { Editor } from 'grapesjs';
import { gjsOptions } from './config/options';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './config/theme';
import { MAIN_BORDER_COLOR } from './components/common';
import CustomModal from './components/CustomModal';
import CustomAssetManager from './components/CustomAssetManager';
import Topbar from './components/Topbar';
import RightSidebar from './components/RightSidebar';
import './style.css';

const App: FC = () => {
  const onEditor = (editor: Editor) => {
    console.log('Editor loaded', { editor });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GjsEditor
        className="gjs-custom-editor text-white bg-slate-900"
        grapesjs={grapesjs}
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
        options={gjsOptions}
        plugins={[
          {
            id: 'gjs-blocks-basic',
            src: 'https://unpkg.com/grapesjs-blocks-basic',
          },
        ]}
        onEditor={onEditor}
      >
        <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
          <div className="gjs-column-m flex flex-col flex-grow">
            <Topbar className="min-h-[48px]" />
            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
          <RightSidebar
            className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
          />
        </div>
        <ModalProvider>
          {({ open, title, content, close }) => (
            <CustomModal
              open={open}
              title={title}
              children={content}
              close={close}
            />
          )}
        </ModalProvider>
        <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager
                assets={assets}
                select={select}
                close={close}
              />
            </Container>
          )}
        </AssetsProvider>
      </GjsEditor>
    </ThemeProvider>
  );
};

export default App;
