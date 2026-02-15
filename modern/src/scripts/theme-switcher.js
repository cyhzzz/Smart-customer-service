/**
 * 主题切换器
 * 管理原始样式与现代样式的一键切换
 */

const THEME_KEY = 'smart-cs-theme';

export class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.loadTheme();
    this.applyTheme(this.currentTheme);
  }

  /**
   * 从localStorage加载主题设置
   */
  loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return saved || 'modern'; // 默认使用现代主题
  }

  /**
   * 保存主题设置到localStorage
   */
  saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * 应用主题
   */
  applyTheme(theme) {
    const html = document.documentElement;
    
    // 移除所有主题类
    html.classList.remove('theme-legacy', 'theme-modern');
    
    // 添加新主题类
    html.classList.add(`theme-${theme}`);
    
    // 更新按钮状态
    this.updateButtons(theme);
    
    // 保存设置
    this.saveTheme(theme);
    this.currentTheme = theme;
  }

  /**
   * 切换主题
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'modern' ? 'legacy' : 'modern';
    this.applyTheme(newTheme);
  }

  /**
   * 更新按钮状态
   */
  updateButtons(activeTheme) {
    const buttons = document.querySelectorAll('[data-theme]');
    buttons.forEach(btn => {
      const theme = btn.dataset.theme;
      if (theme === activeTheme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * 创建切换器UI
   */
  createUI() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    switcher.innerHTML = `
      <button data-theme="modern" class="${this.currentTheme === 'modern' ? 'active' : ''}">
        🎨 现代样式
      </button>
      <button data-theme="legacy" class="${this.currentTheme === 'legacy' ? 'active' : ''}" style="margin-left: 8px;">
        📜 原始样式
      </button>
    `;

    // 绑定点击事件
    switcher.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        this.applyTheme(theme);
      });
    });

    document.body.appendChild(switcher);
  }
}

// 导出单例
export const themeSwitcher = new ThemeSwitcher();
