import { storiesOf, html } from '@open-wc/demoing-storybook';
import '../vgry-inc-navmenu.js';

storiesOf('Navigation|Navmenu', module)
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add(
    'Default',
    () => html`
      <vgry-inc-navmenu></vgry-inc-navmenu>
    `,
  );
