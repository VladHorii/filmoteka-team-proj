export class Spinner {
  constructor(selector = '.spinner') {
    this.isOpen = false;
    this.spinnerRef = document.querySelector(selector);
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  open() {
    this.spinnerRef.classList.add('is-open');
    this.isOpen = true;
  }
  close() {
    this.spinnerRef.classList.remove('is-open');
    this.isOpen = false;
  }
  status() {
    return this.isOpen;
  }
}

// const spinner = new Spinner();
// spinner.open();
