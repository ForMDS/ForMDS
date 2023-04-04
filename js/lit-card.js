import { LitElement, html, css, styleMap, ref, createRef } from '../libs/lit-all.min.js'
import './lit-dialog.js'

class LitCard extends LitElement {
  /* 样式效果来源：[https://codepen.io/andymerskin/pen/XNMWvQ] */
  static styles = css`
    .card-wrap {
      margin: 10px;
      transform: perspective(800px);
      transform-style: preserve-3d;
      cursor: pointer;
    }

    .card-wrap:hover .card-info {
      transform: translateY(0);
    }
    .card-wrap:hover .card-info ::slotted(p) {
      opacity: 1 !important;
    }
    .card-wrap:hover .card-info,
    .card-wrap:hover .card-info ::slotted(p) {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1) !important;
    }
    .card-wrap:hover .card-info:after {
      transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
      opacity: 1;
      transform: translateY(0);
    }
    .card-wrap:hover .card-bg {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
      opacity: 0.8;
    }
    .card-wrap:hover .card {
      transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }

    .card {
      position: relative;
      flex: 0 0 240px;
      width: 240px;
      height: 320px;
      margin: 0 auto;
      background-color: #333;
      overflow: hidden;
      border-radius: 10px;
      box-shadow:
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset rgba(white, 0.5) 0 0 0 6px;
      transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .card-bg {
      opacity: 0.5;
      position: absolute;
      top: -20px; left: -20px;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      transition:
        1s cubic-bezier(0.445, 0.05, 0.55, 0.95),
        opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
      pointer-events: none;
    }
    .card-info {
      padding: 20px;
      position: absolute;
      bottom: 0;
      color: #fff;
      transform: translateY(40%);
      transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    .card-info:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(#000, 0.6) 100%
      );
      background-blend-mode: overlay;
      opacity: 0;
      transform: translateY(100%);
      transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
  `

  cardRef = createRef()

  static properties = {
    width: {},
    height: {},
    offsetLeft: {},
    offsetTop: {},
    mouseX: {},
    mouseY: {},
    mouseLeaveDelay: {},
    dataImage: {},
    delImgs: {},
    scrollTopNum: {},
  }

  constructor() {
    super()
    this.width = 0
    this.height = 0
    this.mouseX = 0
    this.mouseY = 0
    this.mouseLeaveDelay = null
    this.dataImage = ''
    this.delImgs = []
    this.scrollTopNum = 0
  }

  render() {
    let mousePX = this.mouseX / this.width
    let mousePY = this.mouseY / this.height

    const rX = mousePX * 30;
    const rY = mousePY * -30;
    const cardStyle = {
      transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
    }

    const tX = mousePX * -40
    const tY = mousePY * -40
    const cardBg = {
      transform: `translateX(${tX}px) translateY(${tY}px)`,
      backgroundImage: `url(${this.dataImage})`
    }
    return html`
      <div
        class="card-wrap"
        ${ref(this.cardRef)}
        @mousemove=${this._handleMouseMove}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        @click=${this._handleClick}>
        <div class="card" style=${styleMap(cardStyle)}>
          <div class="card-bg" style=${styleMap(cardBg)}></div>
          <div class="card-info">
            <slot name="header"></slot>
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    `;
  }

  _handleMouseMove(e) {
    this.mouseX = e.pageX - this.offsetLeft - this.width / 2
    this.mouseY = e.pageY - (this.offsetTop - this.scrollTopNum) - this.height / 2
  }

  _handleMouseEnter() {
    clearTimeout(this.mouseLeaveDelay)
  }

  _handleMouseLeave() {
    this.mouseLeaveDelay = setTimeout(() => {
      this.mouseX = 0
      this.mouseY = 0
    }, 1000)
  }

  _handleClick() {
    this.dispatchEvent(new CustomEvent('toOpen', {
      detail: {
        delImgs: this.delImgs
      },
      bubbles: false,
      composed: false,
    }))
  }

  firstUpdated() {
    const cardRef = this.cardRef.value
    if (cardRef) {
      this.width = this.cardRef.value.offsetWidth
      this.height = this.cardRef.value.offsetHeight
      this.offsetLeft = this.cardRef.value.offsetLeft
      this.offsetTop = this.cardRef.value.offsetTop
    }
  }
}
customElements.define('lit-card', LitCard)