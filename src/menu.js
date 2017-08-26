/**
 * @fileoverview Module for the #Menu element ie. the page navigation.
*/
import $ from 'uery';
import HeaderMenu from './header-menu';

const Menu = Object.assign({}, HeaderMenu, {
  selector_: '#Menu',
  init() {
    this.el = $(this.selector_);
    this.setOpenedState(this.opened, this.STATES_ENUM);

    return this;
  },
  setState(opened) {
    this.setOpenedState(opened, this.STATES_ENUM);
  }
});

export default Menu;