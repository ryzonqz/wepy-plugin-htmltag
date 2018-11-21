import config from './config'
import { transformSelector, transformTag } from './transform'

export default class WepyPluginTag {
  constructor(opts = {}) {
    this.setting = Object.assign(config, opts)
  }
  apply(op) {
    let setting = this.setting
    if (/\.wxss$/.test(op.file)) {
      op.code = transformSelector(op.code, setting)
    }
    if(/\.wxml$/.test(op.file)){
      op.code = transformTag(op.code, setting)
    }

    op.next()
  }
}