import Vue, { ComponentOptions, PluginFunction, PluginObject } from 'vue'

export interface VueDebuggerPluginOptions {}

export class VueDebuggerPlugin
  implements PluginObject<VueDebuggerPluginOptions> {
  install: PluginFunction<VueDebuggerPluginOptions>
}

declare const VueDebugger: VueDebuggerPlugin
declare const VueDebuggerComponent: ComponentOptions<Vue>

export { VueDebuggerComponent as VueDebugger }
export default VueDebugger
