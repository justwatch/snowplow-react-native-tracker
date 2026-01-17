import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const plugin = require('./plugin/build');
export default plugin.default;
