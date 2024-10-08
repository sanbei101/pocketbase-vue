// eslint.config.mjs
import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default [
  ...pluginVue.configs['flat/essential'], // 提取 flat/essential 配置
  ...vueTsEslintConfig() // 提取 TypeScript 推荐配置
];
