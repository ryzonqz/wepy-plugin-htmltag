import { setting } from './config'
import { transformHtml, transformCss } from './transform'

export default class WepyPluginTag {
  constructor(opts = {}) {
    this.setting = Object.assign(setting, opts)
  }
  apply(op) {
    let setting = this.setting
    if (setting.filter.test(op.file)) {
      if (/\.wxml$/.test(op.file)) {
        op.code = transformHtml(op.code, setting.config)
      }
      if (/\.wxss$/.test(op.file)) {
        op.code = transformCss(op.code, setting.config)
      }
    }

    op.next()
  }
}
