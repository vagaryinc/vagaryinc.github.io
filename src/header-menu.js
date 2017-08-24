/**
 * @fileoverview Module for the #HeaderMenu element ie. the menu trigger in the header.
*/
import $ from 'jQuery';

const HeaderMenu = {
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
   * @param {HeaderMenu.STATES_ENUM} classEnum
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

export default HeaderMenu;