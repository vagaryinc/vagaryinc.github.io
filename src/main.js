require('./styles/app.scss');

import $ from 'jquery';
const header  = $('#Header');
const headerMenu = {
  /** @type {?jQuery} */
  el: null,

  /** @type {string} */
  selector_: '#HeaderMenu',

  /** @enum {string} */
  STATES_ENUM : {
    OPEN: '-open',
    CLOSED: '-closed',
  },

  opened: false,

  /** Callback invoked when the Menu is opened */
  onOpen: () => {},

  /** Callback invoked when the Menu is closed */
  onClose: () => {},

  /**
   * @param {boolean} opened
   * @param {headerMenu.STATES_ENUM} classEnum
  */
  setOpenedState(opened, classEnum) {
    if (opened) {
      this.onOpen();
    } else {
      this.onClose();
    }

    this.el[0].classList.toggle(classEnum.OPEN, opened);
    this.el[0].classList.toggle(classEnum.CLOSED, !opened);
  },
  /**
   * Initializes this component.
   * @return {this}
   */
  init() {
    this.el = $(this.selector_);

    this.el.on('click', () => {
      this.opened = !this.opened;
      this.setOpenedState(this.opened, this.STATES_ENUM);
    });

    this.setOpenedState(this.opened, this.STATES_ENUM);

    return this;
  },
};
const menu = Object.assign({}, headerMenu, {
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

menu.onOpen = () => {
  console.log('Menu opened');
  header[0].classList.remove('-closed');
  header[0].classList.add('-open');
};

menu.onClose = () => {
  console.log('Menu closed');
  header[0].classList.remove('-open');
  header[0].classList.add('-closed');
};

headerMenu.onOpen = () => {
  menu.setState(true);
};

headerMenu.onClose = () => {
  menu.setState(false);
};

menu.init();
headerMenu.init();
