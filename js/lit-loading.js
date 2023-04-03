// 基础加载效果
import { LitElement, html, css, classMap } from '../libs/lit-all.min.js'

export default class LitLoading extends LitElement {
  static styles = [
    css`
      .wrapper {
        position: fixed;
        left: -100px;
        top: 20px;
        z-index: 9999;
        transition: all .2s;
      }
      .wrapper.open {
        left: 20px;
      }
      .whiskey-loader {
        position: relative;
      }
      .whiskey-loader::before,
      .whiskey-loader::after {
        animation: cube-float 2s linear infinite;
        background-color: rgba(255,255,255, 0.85);
        border-radius: 2px;
        content: '';
        height: 17px;
        width: 17px;
        position: absolute;
        top: 28px;
        left: 35px;
        will-change: transform;
        z-index: -1;
      }
      .whiskey-loader::after {
        animation-name: cube-float--alt;
        animation-duration: 3s;
        top: 34px;
        left: 16px;
        transform: rotate(30deg);
      }

      @keyframes cube-float {
        0% {
          animation-timing-function: ease-in;
          transform: none;
        }
        
        25% {
          transform: rotate(-5deg) translate3d(-1px, 2px, 0);
        }
        
        50% {
          animation-timing-function: ease-in-out;
          transform: rotate(0deg) translate3d(-1px, 6px, 0);
        }
        
        80% {
          transform: rotate(5deg) translate3d(0, 2px, 0);
        }
        
        100% {
          animation-timing-function: ease-in;
          transform: none;
        }
      }

      @keyframes cube-float--alt {
        50% {
          animation-timing-function: ease;
          transform: rotate(20deg) translate3d(-2px, -4px, 0);
        }
      }
    `
  ]

  static properties = {
    isOpen: {}
  }

  constructor() {
    super()
    this.isOpen = false
  }

  render() {
    const wrapperClass = {
      'open': this.isOpen
    }
    return html`
      <div class="wrapper${classMap(wrapperClass)}">
        <div class="whiskey-loader">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 65 65" height="65px" width="65px">
            <path fill="#ffffff" d="M58.4,8.3c-0.6-2.2-1.7-4.1-8.4-5.5c-4.8-1-17.5-3.5-35.2-0.1C9.6,3.7,7,5.6,6.9,7.6c-0.3,1.8-5.8,32-4,40.2
          C5.3,58.5,15.3,64,32.7,64c17.6,0,26.9-5.6,29.3-16.6C63.9,39.2,58.9,10.2,58.4,8.3 M32.4,3.1c15.3,0,23.6,3.1,23.6,4.6
          c0,1.6-8.3,4.6-23.6,4.6S8.9,9.3,8.9,7.8C8.9,6.2,17.2,3.1,32.4,3.1 M60,47.4C57.7,57.4,49.4,62,32.7,62C16.4,62,7.1,57,4.9,47.4
          c-1.5-6.7,2.3-29.6,3.6-37c1.3,0.9,3.4,1.7,6.4,2.4c4.7,1.1,11,1.7,17.6,1.7s12.9-0.6,17.6-1.7c3-0.7,5.1-1.5,6.4-2.4
          C57.7,17.7,61.5,40.8,60,47.4" />
            <path fill="#EB5B45" fill-opacity="0.85" d="M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
          c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z">
            <animate attributeName="d" calcMode="spline" keySplines="0.45 0.03 0.5 0.95; 0.45 0.03 0.5 0.95" values="
                              M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
          c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z; 
                              M5.1,34.6c-0.8,6.8-0.8,9.8-0.2,12.8C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
          c0.7-3,0.6-6.1-0.2-12.9c-6,2-17,4.3-27.7,4.3C21.9,38.8,11.2,36.6,5.1,34.6z;
                              M5.4,31.3C4.6,38,4.2,44.4,4.9,47.4C7.1,57,16.4,62,32.7,62c16.7,0,25.1-4.5,27.3-14.6
          c0.7-3,0.3-9.5-0.5-16.3c-6,2-16.7,5-27.3,5C21.9,36.1,11.5,33.3,5.4,31.3z" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </div>
    `
  }

  open() {
    if (!document.querySelector('lit-loading')) {
      document.body.appendChild(this)
      setTimeout(() => {
        this.isOpen = true
      }, 20)
    }
  }

  close() {
    this.isOpen = false
  }
}

customElements.define('lit-loading', LitLoading)