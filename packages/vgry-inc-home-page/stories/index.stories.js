import { storiesOf, html } from '@open-wc/demoing-storybook';
import '../vgry-inc-home-page.js';

storiesOf('App|Homepage', module)
  .addParameters({ viewport: { defaultViewport: 'iphone6' } })
  .add(
    'Default',
    () => html`
      <vgry-inc-home-page></vgry-inc-home-page>
    `,
  );
