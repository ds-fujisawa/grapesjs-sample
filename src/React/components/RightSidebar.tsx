import {
  BlocksProvider,
  LayersProvider,
  PagesProvider,
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
} from '@grapesjs/react';
import BrushIcon from '@mui/icons-material/Brush';
import LayersIcon from '@mui/icons-material/Layers';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import SettingsIcon from '@mui/icons-material/Settings';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import CustomBlockManager from './CustomBlockManager';
import { MAIN_BORDER_COLOR, cx } from './common';
import CustomPageManager from './CustomPageManager';
import CustomLayerManager from './CustomLayerManager';
import CustomSelectorManager from './CustomSelectorManager';
import CustomStyleManager from './CustomStyleManager';
import CustomTraitManager from './CustomTraitManager';

const defaultTabProps = {
  className: '!min-w-0',
};

export default function RightSidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={cx('gjs-right-sidebar flex flex-col', className)}>
      <Tabs
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
        variant="fullWidth"
      >
        <Tab {...defaultTabProps} label={<BrushIcon />} />
        <Tab {...defaultTabProps} label={<SettingsIcon />} />
        <Tab {...defaultTabProps} label={<LayersIcon />} />
        <Tab {...defaultTabProps} label={<AddBoxIcon />} />
        <Tab {...defaultTabProps} label={<FilterNoneIcon />} />
      </Tabs>
      <div
        className={cx('overflow-y-auto flex-grow border-t', MAIN_BORDER_COLOR)}
      >
        {selectedTab === 0 && (
          <>
            <SelectorsProvider>
              {props => <CustomSelectorManager {...props} />}
            </SelectorsProvider>
            <StylesProvider>
              {props => <CustomStyleManager {...props} />}
            </StylesProvider>
          </>
        )}
        {selectedTab === 1 && (
          <TraitsProvider>
            {props => <CustomTraitManager {...props} />}
          </TraitsProvider>
        )}
        {selectedTab === 2 && (
          <LayersProvider>
            {props => <CustomLayerManager {...props} />}
          </LayersProvider>
        )}
        {selectedTab === 3 && (
          <BlocksProvider>
            {props => <CustomBlockManager {...props} />}
          </BlocksProvider>
        )}
        {selectedTab === 4 && (
          <PagesProvider>
            {props => <CustomPageManager {...props} />}
          </PagesProvider>
        )}
      </div>
    </div>
  );
}
