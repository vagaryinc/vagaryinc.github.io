import { storiesOf, html } from '@open-wc/demoing-storybook';
import '../vgry-inc-navbar.js';

storiesOf('Navigation|Navbar', module)
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add(
    'Default',
    () => html`
      <style>
        vgry-inc-navbar {
          color: #000;
        }
      </style>
      <vgry-inc-navbar></vgry-inc-navbar>
    `,
  );
