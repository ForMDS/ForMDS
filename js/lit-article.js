import dataBase from './f-database.js'
import { LitElement, html, css } from '../libs/lit-all.min.js'

class LitArticle extends LitElement {
  static styles = css`
    h1, h2, p {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    article {
      margin-top: 15px;
    }

    .sub-title {
      font-size: 17px;
      font-weight: 700;
      color: #5D4037;
      position: relative;
      padding: 12px 0;
    }

    .sub-title::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #5D4037;
      position: absolute;
      left: 0;
      bottom: 0;
    }

    .container {
      margin-top: 15px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    p {
      line-height: 1.5em;
    }

    h1 + p,
    p + p {
      margin-top: 10px;
    }
    
    lit-card * {
      position: relative;
      z-index: 1;
    }

    lit-card h1 {
      font-family: "Playfair Display";
      font-size: 36px;
      font-weight: 700;
      text-shadow: rgba(0, 0, 0, 0.5) 0 10px 10px;
    }

    lit-card p {
      opacity: 0;
      font-weight: 700;
      text-shadow: black 0 2px 3px;
      transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

  `

  static properties = {
    scrollTopNum: {},
  }

  constructor() {
    super()
    this.scrollTopNum = 0
  }

  render() {
    if (dataBase) {
      let artTml = []
      for (let name in dataBase) {
        let litCardArr = []
        dataBase[name].forEach(item => {
          litCardArr.push(html`
            <lit-card
              dataimage=${item.coverImg}
              .delImgs=${item.delImgs}
              scrollTopNum=${this.scrollTopNum}
              @toOpen=${this._toOpen}>
              <h1 slot="header">${item.name}</h1>
              <p slot="content">${item.desc}</p>
            </lit-card>
          `)
        })
        artTml.push(html`
          <article>
            <h2 class="sub-title">${name}</h2>
            <div class="container">
              ${litCardArr}
            </div>
          </article>
        `)
      }
      return artTml
    }
    return html`<div>获取数据失败，初始化渲染失败</div>`
  }

  _toOpen(e) {
    this.dispatchEvent(new CustomEvent('toOpen', {
      detail: {
        delImgs: e.detail.delImgs
      },
      bubbles: false,
      composed: false,
    }))
  }
}

customElements.define('lit-article', LitArticle)