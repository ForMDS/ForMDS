// 基础弹窗
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2.6.1/all/lit-all.min.js'

export default class LitDialog extends LitElement {
  static styles = css`
    .wrapper {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      visibility: hidden;
      opacity: 0;
      transition: all 0.25s ease-in-out;
      z-index: 2001;
    }
    .wrapper.open {
      opacity: 1;
      visibility: visible;
    }
    .wrapper .overlay {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
    }

    .dialog-content {
      display: block;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      border-radius: 5px;
      transition: all 0.35s ease-in-out;
    }
    .dialog-content .layout {
      width: 100%;
      height: 100%;
    }
    .wrapper.open .dialog-content {
      top: 50%;
      opacity: 1;
    }
  `
  static properties = {
    closeOnClickOverlay: {},
    open: {},
  }

  constructor() {
    super()
    this.open = false
    this.closeOnClickOverlay = true
  }

  render() {
    return html`
      <div class=${this.open ? 'wrapper open' : 'wrapper'}>
        <div class="overlay" @click="${this._dispatchClose}"></div>
        <div class="dialog-content">
          <div class="layout">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }

  _dispatchClose() {
    if (!this.closeOnClickOverlay) return
    const options = {
      bubbles: false,
      composed: false,
    }
    this.dispatchEvent(new CustomEvent('close', options))
  }
}
customElements.define('lit-dialog', LitDialog)