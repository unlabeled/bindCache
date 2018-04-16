declare module "bindcache" {
  function bind(context: any, f: Function, ...args: any[]): any
  function bindArgs(f: Function, ...args: any[]): any
}
