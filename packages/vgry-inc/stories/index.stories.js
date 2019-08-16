import { storiesOf, html } from '@open-wc/demoing-storybook';
import '../vgry-inc.js';

storiesOf('APP|Main', module)
  .addParameters({
    viewport: {
      defaultViewport: 'iphone6',
    },
  })
  .add(
    'Default',
    () => html`
      <vgry-inc></vgry-inc>
    `,
  );
