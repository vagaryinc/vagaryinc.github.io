require('./styles/app.scss');

import $ from 'jquery';
import HeaderMenu from './header-menu';
import Menu from './menu';

const header  = $('#Header');

Menu.onOpen = () => {
  console.log('Menu opened');
  header[0].classList.remove('-closed');
  header[0].classList.add('-open');
};

Menu.onClose = () => {
  console.log('Menu closed');
  header[0].classList.remove('-open');
  header[0].classList.add('-closed');
};

HeaderMenu.onOpen = () => {
  Menu.setState(true);
};

HeaderMenu.onClose = () => {
  Menu.setState(false);
};

Menu.init();
HeaderMenu.init();
