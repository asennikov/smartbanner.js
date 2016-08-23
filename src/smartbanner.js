import OptionParser from './optionparser.js';
import Detector from './detector.js';
import Bakery from './bakery.js';

function handleExitClick(event, self) {
  self.exit();
  event.preventDefault();
}

function handleButtonClick(event, self) {
  self.install();
}

function addEventListeners(self) {
  let closeIcon = document.querySelector('.js_smartbanner__exit');
  let button = document.querySelector('.smartbanner__button');
  closeIcon.addEventListener('click', () => handleExitClick(event, self));
  button.addEventListener('click', () => handleButtonClick(event, self));
}

function setWrapperClass() {
  let className = Detector.jQueryMobilePage() ? 'smartbanner-wrapper__ui' : 'smartbanner-wrapper';
  Detector.wrapperElement().classList.add(className);
}

function unsetWrapperClass() {
  Detector.wrapperElement().classList.remove('smartbanner-wrapper__ui', 'smartbanner-wrapper');
}

export default class SmartBanner {

  constructor() {
    let parser = new OptionParser();
    this.options = parser.parse();
    this.platform = Detector.platform();
  }

  get priceSuffix() {
    if (this.platform === 'ios') {
      return this.options.priceSuffixApple;
    } else if (this.platform === 'android') {
      return this.options.priceSuffixGoogle;
    }
    return '';
  }

  get icon() {
    if (this.platform === 'android') {
      return this.options.iconGoogle;
    } else {
      return this.options.iconApple;
    }
  }

  get buttonUrl() {
    if (this.platform === 'android') {
      return this.options.buttonUrlGoogle;
    } else if (this.platform === 'ios') {
      return this.options.buttonUrlApple;
    }
    return '#';
  }

  get hasNoOptionsForPlatform() {
    return !this.buttonUrl || this.buttonUrl === '#';
  }

  get html() {
    return `<div class="smartbanner smartbanner--${this.platform} js_smartbanner">
      <a href="javascript:void();" class="smartbanner__exit js_smartbanner__exit"></a>
      <div class="smartbanner__icon" style="background-image: url(${this.icon});"></div>
      <div class="smartbanner__info">
        <div>
          <div class="smartbanner__info__title">${this.options.title}</div>
          <div class="smartbanner__info__author">${this.options.author}</div>
          <div class="smartbanner__info__price">${this.options.price}${this.priceSuffix}</div>
        </div>
      </div>
      <a href="${this.buttonUrl}" class="smartbanner__button"><span class="smartbanner__button__label">${this.options.button}</span></a>
    </div>`;
  }

  get height() {
    let height = document.querySelector('.js_smartbanner').offsetHeight;
    return height !== undefined ? height : 0;
  }

  publish() {
    if (Object.keys(this.options).length === 0) {
      throw new Error('No options detected. Please consult documentation.');
    } else if (Bakery.baked || this.hasNoOptionsForPlatform) {
      return false;
    }
    let bannerDiv = document.createElement('div');
    document.querySelector('body').appendChild(bannerDiv);
    bannerDiv.outerHTML = this.html;
    setWrapperClass();
    addEventListeners(this);
  }

  exit() {
    let banner = document.querySelector('.js_smartbanner');
    banner.outerHTML = '';
    unsetWrapperClass();
    let twelve_hours = 60*60*12;
    Bakery.bake(twelve_hours);
  }

  install() {
    let twelve_hours = 60*60*12;
    Bakery.bake(twelve_hours);
  }
}
