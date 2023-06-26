class typingTxt {
  constructor(selectEl, options) {
    this.options = options;
    this.content = this.options.textContent;
    this.el$ = document.querySelector(selectEl);
    this.textArr = this.content;
    this.backAnimate = false;
  
    this.indexLetter = 0;
    this.indexWord = 0;

    
    this.curentId = this.beingInto("id", this.options, 1);
    this.delay = this.beingInto("delay", this.options, 100);
    this.backDelay = this.beingInto("backDelay", this.options, this.delay);

    if (this.curentId != null) {
      this.typingAnimate();
    }
  }

  beingInto(name, option, standartValue = null) {
    return typeof option[`${name}`] !== "undefined" ? option[`${name}`] : standartValue;
  }

  typingAnimate() {
    this.animeteText();

    setTimeout(() => {
      this.typingAnimate()
    }, (this.backAnimate ? this.backDelay : this.delay));
  }

  activeWord() {
    let arrLen = this.textArr.length;
    return this.indexWord + 1 < arrLen ? this.indexWord += 1 : this.indexWord = 0;
  }

  animateTxt() {
    this.el$.innerHTML = '';

    for (let i = 0; i < this.indexLetter; i++) {
      let word = this.textArr[this.indexWord];
      this.el$.innerHTML += word[i];
    }
    this.el$.innerHTML += this.indexLetter % 4 == 0 ? "" : "|";
  }

  animeteText() {
    if (this.indexLetter > this.textArr[this.indexWord].length) {
      this.backAnimate = true;
    }

    switch (this.backAnimate) {
      case true:
        this.indexLetter -= 1;
        this.animateTxt();
        break;

      case false:
        this.animateTxt();
        this.indexLetter += 1;
        break;
    }

    if (this.indexLetter <= 0) {
      this.backAnimate = false;
      this.indexLetter = 0;
      this.activeWord();
    }
  }
} 