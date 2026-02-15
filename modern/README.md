# Smart Customer Service - 现代化原型

## 项目结构

```
modern/
├── src/
│   ├── styles/
│   │   ├── main.css           # 主样式入口
│   │   ├── theme-legacy.css   # 原始Axure样式
│   │   └── theme-modern.css   # 现代化样式 (Tailwind)
│   ├── scripts/
│   │   └── theme-switcher.js  # 主题切换逻辑
│   ├── pages/                 # 页面内容 (待添加)
│   ├── assets/                # 静态资源
│   └── main.js                # 应用入口
├── index.html                 # 主HTML
├── tailwind.config.js         # Tailwind配置
├── postcss.config.js          # PostCSS配置
├── package.json
└── README.md
```

## 技术栈

- **Vite** - 构建工具
- **Tailwind CSS** - 现代样式框架
- **PostCSS** - CSS处理
- **原生JavaScript** - 交互逻辑

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 主题系统

### 双主题架构

1. **现代主题 (theme-modern)**
   - 使用Tailwind CSS
   - 移动优先
   - 完全响应式
   - 现代化视觉设计

2. **原始主题 (theme-legacy)**
   - 保留Axure原始样式
   - 用于对比展示

### 切换方式

- 右上角切换按钮
- localStorage持久化
- URL参数控制 (待实现)

## 下一步

- [ ] 迁移页面内容
- [ ] 完善响应式设计
- [ ] 实现交互逻辑
- [ ] 优化性能
- [ ] 部署到GitHub Pages

## 项目进度

- ✅ Phase 1: 原型获取与结构分析
- ⏳ Phase 2: 现代化工程环境搭建
- ⏳ Phase 3: 内容迁移与核心样式重构
- ⏳ Phase 4: 深度响应式优化
- ⏳ Phase 5: 静态构建、测试与部署准备
