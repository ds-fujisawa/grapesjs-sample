import { StylesResultProps } from '@grapesjs/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MAIN_BG_COLOR } from './common';
import StylePropertyField from './StylePropertyField';

export default function CustomStyleManager({
  sectors,
}: Omit<StylesResultProps, 'Container'>) {
  return (
    <div className="gjs-custom-style-manager text-left">
      {sectors.map(sector => (
        <Accordion key={sector.getId()} disableGutters>
          <AccordionSummary
            className="!bg-slate-800"
            expandIcon={<ArrowDropDownIcon />}
          >
            {sector.getName()}
          </AccordionSummary>
          <AccordionDetails className={`${MAIN_BG_COLOR} flex flex-wrap`}>
            {sector.getProperties().map(prop => (
              <StylePropertyField key={prop.getId()} prop={prop} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
