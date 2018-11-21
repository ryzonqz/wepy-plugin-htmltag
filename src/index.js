import { config } from './config'
import { transformSelector, transformTag } from './transform'

export default class WepyPluginTag {
  constructor(opts = {}) {
    this.setting = Object.assign(config, opts)
  }
  apply(op) {
    let setting = this.setting
    if(setting.filter.test(op.file)){
      if (/\.wxss$/.test(op.file)) {
        op.code = transformSelector(op.code, setting.config)
      }
      if(/\.wxml$/.test(op.file)){
        op.code = transformTag(op.code, setting.config)
      }
    }

    op.next()
  }
}