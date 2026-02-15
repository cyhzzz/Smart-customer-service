import './styles/main.css';
import { themeSwitcher } from './scripts/theme-switcher.js';

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎨 Smart Customer Service - Modern Version');
  console.log('📦 Built with Vite + Tailwind CSS');
  
  // 创建主题切换器UI
  themeSwitcher.createUI();
  
  console.log(`✅ 当前主题: ${themeSwitcher.currentTheme}`);
});
