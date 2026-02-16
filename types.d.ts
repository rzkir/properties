declare module "@tailwindcss/vite" {
  const plugin: any;
  export default plugin;
}

declare module "rollup-plugin-visualizer" {
  export function visualizer(options?: any): any;
}

