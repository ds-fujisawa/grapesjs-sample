import grapesjs, { Editor } from 'grapesjs';
import 'modern-css-reset';
import 'grapesjs/dist/css/grapes.min.css';
import './style.css';

const editor = grapesjs.init({
  container: '#gjs',
  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: '100%',
  width: 'auto',
  showOffsets: true,
  showOffsetsSelected: true,
  // Disable the storage manager for the moment
  storageManager: {
    type: 'local', // Type of the storage, available: 'local' | 'remote'
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
    options: {
      local: {
        // Options for the `local` type
        key: 'gjsProject', // The key for the local storage
      },
    },
  },
  layerManager: {
    appendTo: '.layers-container',
  },
  deviceManager: {
    devices: [
      {
        name: 'Desktop',
        width: '', // default size
      },
      {
        name: 'Mobile',
        width: '320px', // this value will be used on canvas width
        widthMedia: '480px', // this value will be used in CSS @media
      },
    ],
  },
  // Avoid any default panel
  panels: {
    defaults: [
      {
        id: 'layers',
        el: '.panel__right',
        // Make the panel resizable
        resizable: {
          maxDim: 350,
          minDim: 200,
          tc: false, // Top handler
          cl: true, // Left handler
          cr: false, // Right handler
          bc: false, // Bottom handler
          // Being a flex child we need to change `flex-basis` property
          // instead of the `width` (default)
          keyWidth: 'flex-basis',
        },
      },
      {
        id: 'panel-switcher',
        el: '.panel__switcher',
        buttons: [
          {
            id: 'show-layers',
            active: true,
            // @ts-ignore
            label: 'Layers',
            command: 'show-layers',
            // Once activated disable the possibility to turn it off
            togglable: false,
          },
          {
            id: 'show-style',
            active: true,
            // @ts-ignore
            label: 'Styles',
            command: 'show-styles',
            togglable: false,
          },
          {
            id: 'show-traits',
            active: true,
            // @ts-ignore
            label: 'Traits',
            command: 'show-traits',
            togglable: false,
          },
        ],
      },
      {
        id: 'panel-devices',
        el: '.panel__devices',
        buttons: [
          {
            id: 'device-desktop',
            // @ts-ignore
            label: 'D',
            command: 'set-device-desktop',
            active: true,
            togglable: false,
          },
          {
            id: 'device-mobile',
            // @ts-ignore
            label: 'M',
            command: 'set-device-mobile',
            togglable: false,
          },
        ],
      },
    ],
  },
  blockManager: {
    appendTo: '#blocks',
    blocks: [
      {
        id: 'section', // id is mandatory
        label: '<b>Section</b>', // You can use HTML/SVG inside labels
        attributes: { class: 'gjs-block-section' },
        content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
      },
      {
        id: 'text',
        label: 'Text',
        content: '<div data-gjs-type="text">Insert your text here</div>',
      },
      {
        id: 'image',
        label: 'Image',
        // Select the component once it's dropped
        select: true,
        // You can pass components as a JSON instead of a simple HTML string,
        // in this case we also use a defined component type `image`
        content: { type: 'image' },
        // This triggers `active` event on dropped components and the `image`
        // reacts by opening the AssetManager
        activate: true,
      },
    ],
  },
  selectorManager: {
    appendTo: '.styles-container',
  },
  styleManager: {
    appendTo: '.styles-container',
    sectors: [
      {
        name: 'Dimension',
        open: false,
        // Use built-in properties
        buildProps: ['width', 'min-height', 'padding'],
        // Use `properties` to define/override single property
        properties: [
          {
            // Type of the input,
            // options: integer | radio | select | color | slider | file | composite | stack
            type: 'integer',
            name: 'The width', // Label for the property
            property: 'width', // CSS property (if buildProps contains it will be extended)
            units: ['px', '%'], // Units, available only for 'integer' types
            defaults: 'auto', // Default value
            min: 0, // Min value, available only for 'integer' types
          },
        ],
      },
      {
        name: 'Extra',
        open: false,
        buildProps: ['background-color', 'box-shadow', 'custom-prop'],
        properties: [
          {
            id: 'custom-prop',
            name: 'Custom Label',
            property: 'font-size',
            type: 'select',
            defaults: '32px',
            // List of options, available only for 'select' and 'radio'  types
            options: [
              { id: 'tiny', value: '12px', name: 'Tiny' },
              { id: 'medium', value: '18px', name: 'Medium' },
              { id: 'big', value: '32px', name: 'Big' },
            ],
          },
        ],
      },
    ],
  },
  traitManager: {
    appendTo: '.traits-container',
  },
});

editor.Panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});
editor.Panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: '<u>B</u>',
      command: 'sw-visibility', // Built-in command
    },
    {
      id: 'export',
      className: 'btn-open-export',
      label: 'Exp',
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    },
    {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'JSON',
      context: 'show-json',
      command(editor: Editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(
            `<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`,
          )
          .open();
      },
    },
  ],
});

// Define commands
editor.Commands.add('show-layers', {
  getRowEl(editor: Editor) {
    return editor.getContainer()!.closest<HTMLElement>('.editor-row')!;
  },
  getLayersEl(row: HTMLElement) {
    return row.querySelector<HTMLElement>('.layers-container');
  },

  run(editor) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl!.style.display = '';
  },
  stop(editor) {
    const lmEl = this.getLayersEl(this.getRowEl(editor));
    lmEl!.style.display = 'none';
  },
});
editor.Commands.add('show-styles', {
  getRowEl(editor: Editor) {
    return editor.getContainer()!.closest<HTMLElement>('.editor-row')!;
  },
  getStyleEl(row: HTMLElement) {
    return row.querySelector<HTMLElement>('.styles-container');
  },

  run(editor) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl!.style.display = '';
  },
  stop(editor) {
    const smEl = this.getStyleEl(this.getRowEl(editor));
    smEl!.style.display = 'none';
  },
});

editor.Commands.add('show-traits', {
  getTraitsEl(editor: Editor) {
    const row = editor.getContainer()!.closest('.editor-row')!;
    return row.querySelector<HTMLElement>('.traits-container');
  },
  run(editor) {
    this.getTraitsEl(editor)!.style.display = '';
  },
  stop(editor) {
    this.getTraitsEl(editor)!.style.display = 'none';
  },
});

editor.Commands.add('set-device-desktop', {
  run: editor => editor.setDevice('Desktop'),
});
editor.Commands.add('set-device-mobile', {
  run: editor => editor.setDevice('Mobile'),
});
