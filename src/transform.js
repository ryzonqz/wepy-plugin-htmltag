import css from 'css'
import { config } from './config'

//adjust class
const adjustClass = (attrs, tag) => {
  let classReg = new RegExp('(class=")([^"]*)"')
  if (!classReg.test(attrs)) {
    return ` class="_${tag}"` + attrs
  }
  return attrs.replace(classReg, (match, $1, $2) => {
    return $1 + `_${tag} ` + $2 + '"'
  })
}

//some tag need new close
const closeTag = tag => {
  if (tag === 'hr') return '</view>'
  if (tag === 'img') return '</image>'
  return ''
}

class TagTransform {
  constructor(opts = {}) {
    let opt = Object.assign(config, opts)

    let arr = opt.block.concat(opt.inline)
    let joins = arr.join('|')

    //style and html regexp
    this.selectorReg = new RegExp(`(^|[^\\.])(\\b${joins})\\b`, 'g')
    this.tagStartReg = new RegExp(`<(${joins})((\\s+(@|\\.|\\:|\\-|\\w)+(="[^"]*")?)*)\\s*(\\/)?>`, 'g')
    this.tagEndReg = new RegExp(`<\\/\s*(${joins})\s*>`, 'g')

    this.weTags = {}
    opt.block.forEach(t => (this.weTags[t] = 'view'))
    opt.inline.forEach(t => (this.weTags[t] = 'text'))
    if (this.weTags.img) this.weTags.img = 'image'
  }

  //replace selector tag
  replaceSelector(selector) {
    return selector.replace(this.selectorReg, (matach, $1, $2) => {
      return $1 + '._' + $2
    })
  }

  //replace html tag
  replaceTag(html) {
    return html
      .replace(this.tagStartReg, (match, $1, $2) => {
        if ($1 === 'br') return '<text>\n</text>'
        return '<' + this.weappTag($1) + adjustClass($2, $1) + '>' + closeTag($1)
      })
      .replace(this.tagEndReg, (match, $1) => {
        return '</' + this.weappTag($1) + '>'
      })
  }

  //html tag transform to view|text|image
  weappTag(tag) {
    return this.weTags[tag]
  }
}

const transformHtml = (content, setting) => {
  let tt = new TagTransform(setting)

  return tt.replaceTag(content)
}

const transformCss = (content, setting) => {
  let tt = new TagTransform(setting)
  let astObj = css.parse(content)

  astObj.stylesheet.rules.forEach(rule => {
    switch (rule.type) {
      // recursive invocation while dealing with media queries
      case 'media':
        transformCss(rule.rules)
        break
      // recursive invocation while dealing with keyframes
      case 'keyframes':
        transformCss(rule.keyframes)
        break
      default:
        if (rule.selectors && rule.selectors.length) {
          // need transform: selector
          rule.selectors = rule.selectors.map(selector => tt.replaceSelector(selector))
        }
    }
  })

  return css.stringify(astObj)
}

export { transformHtml, transformCss }
