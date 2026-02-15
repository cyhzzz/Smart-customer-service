# Smart Customer Service 原型分析报告

## 项目概览

**项目名称**: Smart-customer-service (智能客服原型)  
**原型类型**: Axure导出的静态HTML原型  
**创建时间**: 2020年以前  
**项目状态**: 早期产品原型，需要现代化改造

---

## 一、文件结构分析

### 1.1 目录结构

```
Smart-customer-service/
├── data/                    # 数据文件
│   └── document.js         # 页面配置数据
├── files/                   # 页面资源文件夹（29个子目录）
│   ├── 智能客服首页/
│   ├── 交易查询/
│   ├── 个贷场景/
│   └── ... (共29个页面)
├── images/                  # 图片资源（28个子目录）
├── plugins/                 # Axure插件
├── resources/              # 核心资源
│   ├── css/               # 样式文件
│   │   ├── default.css
│   │   ├── reset.css
│   │   ├── axure_rp_page.css
│   │   └── jquery-ui-themes.css
│   ├── scripts/           # JavaScript文件
│   │   ├── jquery-1.7.1.min.js
│   │   ├── axutils.js
│   │   └── axure/ (多个Axure核心脚本)
│   └── images/            # 资源图片
├── *.html                  # 页面文件（36个HTML页面）
└── start.html             # 主入口
```

### 1.2 页面统计

**总页面数**: 36个HTML页面

**主要页面类别**:

1. **入口页面** (3个)
   - start.html
   - start_c_1.html
   - start_g_0.html

2. **核心业务页面** (20个)
   - 智能客服首页.html
   - 交易查询.html
   - 交易存疑.html
   - 个贷场景（贷前）.html
   - 个贷场景（贷中、贷后）.html
   - 理财场景.html
   - 展开开户行查询.html
   - 工具展开页.html
   - 答案页面.html
   - 等等...

3. **功能页面** (8个)
   - 公告.html
   - 公告全文.html
   - 科普.html
   - 小招理财顾问.html
   - 客户经理卡片.html
   - 等等...

4. **引导/下载页面** (5个)
   - web引导页面.html
   - 下载页面.html
   - 跳转页面.html
   - 自助申请.html
   - 招呼.html

---

## 二、样式系统分析

### 2.1 CSS文件结构

**核心样式文件**:
1. `reset.css` - 重置样式
2. `default.css` - 默认样式
3. `axure_rp_page.css` - Axure页面样式
4. `jquery-ui-themes.css` - jQuery UI主题

**页面特定样式**:
- 每个页面都有独立的`styles.css`文件
- 位于`files/[页面名称]/styles.css`

### 2.2 样式特点

**典型问题**:
1. ❌ **固定宽度布局** - 使用像素(px)定义宽度，不响应式
2. ❌ **内联样式** - HTML中包含大量style属性
3. ❌ **过时的CSS** - 使用float、display: table等老旧布局
4. ❌ **命名不规范** - 使用u0, u1等无意义类名
5. ❌ **!important滥用** - 大量使用!important覆盖样式
6. ❌ **绝对定位** - 使用position: absolute定位所有元素
7. ❌ **固定字体大小** - 使用px定义字体，无法缩放

**示例代码**:
```css
#outerContainer {
    width: 1000px;  /* 固定宽度 */
    height: 1500px; /* 固定高度 */
}

#u1_div {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 1334px;
}
```

### 2.3 响应式缺陷

- ❌ 没有viewport meta标签（部分页面有，但不完整）
- ❌ 没有媒体查询
- ❌ 没有弹性布局
- ❌ 没有相对单位
- ❌ 图片固定尺寸，无法自适应

---

## 三、JavaScript交互分析

### 3.1 依赖库

**核心依赖**:
- jQuery 1.7.1 (2011年发布，严重过时)
- jQuery UI 1.8.10 (2011年发布)

**Axure核心脚本** (20+个文件):
- axQuery.js - 查询引擎
- model.js - 数据模型
- visibility.js - 可见性控制
- style.js - 样式管理
- events.js - 事件处理
- adaptive.js - 自适应（但未真正实现）
- 等等...

### 3.2 交互特点

**交互方式**:
1. ✅ 点击跳转 - 通过`data.js`定义跳转逻辑
2. ✅ 动态显示/隐藏 - 使用jQuery控制元素可见性
3. ✅ 简单动画 - 使用jQuery动画

**问题**:
- ❌ 依赖Axure特定的运行时环境
- ❌ 代码分散，难以维护
- ❌ 性能低下（大量DOM操作）
- ❌ 不支持模块化

### 3.3 数据结构

**document.js示例**:
```javascript
var $axure = {
    document: {
        configuration: {
            prototypeId: '...',
            isAxshare: false
        }
    }
};
```

---

## 四、HTML结构分析

### 4.1 典型页面结构

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 大量脚本引用 -->
    <script src="resources/scripts/jquery-1.7.1.min.js"></script>
    <script src="resources/scripts/axure/*.js"></script>
    <!-- 20+个script标签 -->
</head>
<body>
    <div id="base" class="">
        <!-- 使用绝对定位的嵌套div -->
        <div id="u0" class="ax_default" data-label="我关心的">
            <div id="u1" class="ax_default box_1">
                <div id="u1_div" class=""></div>
            </div>
            <div id="u2" class="ax_default label">
                <p><span>文本内容</span></p>
            </div>
        </div>
    </div>
    <script>
        // 页面初始化代码
    </script>
</body>
</html>
```

### 4.2 结构问题

1. ❌ **过度嵌套** - 3-4层div嵌套才显示文本
2. ❌ **无语义化** - 全部使用div，没有header/nav/section等语义标签
3. ❌ **ID滥用** - 每个元素都有唯一ID，难以复用
4. ❌ **内联脚本** - 大量JavaScript写在HTML中
5. ❌ **无accessibility** - 没有ARIA标签，可访问性差

---

## 五、资源文件分析

### 5.1 图片资源

**图片类型**:
- PNG截图
- GIF占位图
- SVG图标（少数）

**问题**:
- ❌ 未优化，体积大
- ❌ 没有响应式图片
- ❌ 没有懒加载

### 5.2 文件大小

**估计大小**:
- HTML文件: ~36个 × 20KB = 720KB
- CSS文件: ~30个 × 5KB = 150KB
- JS文件: ~20个 × 50KB = 1MB
- 图片: 估计5-10MB

**总计**: 约7-12MB（未优化）

---

## 六、兼容性问题

### 6.1 浏览器兼容性

**当前支持**:
- ✅ IE 9+
- ✅ Chrome (旧版本)
- ✅ Firefox (旧版本)

**不支持的现代浏览器**:
- ❌ Chrome 最新版（部分API过时）
- ❌ Safari 最新版
- ❌ Edge 最新版

### 6.2 移动端支持

- ❌ 无响应式设计
- ❌ 不支持触摸事件
- ❌ 固定宽度，手机上显示异常

---

## 七、性能问题

### 7.1 加载性能

**问题**:
1. ❌ 36个HTML页面，每个页面都加载完整的Axure运行时
2. ❌ jQuery 1.7.1体积90KB（未压缩）
3. ❌ Axure脚本合计>500KB
4. ❌ 没有代码压缩
5. ❌ 没有资源合并
6. ❌ 没有缓存策略

### 7.2 运行性能

**问题**:
1. ❌ 大量DOM操作
2. ❌ 频繁的样式计算
3. ❌ 没有虚拟DOM
4. ❌ 动画使用jQuery，性能差

---

## 八、现代化改造需求总结

### 8.1 核心改造目标

1. ✅ **视觉现代化**
   - 使用Tailwind CSS重写样式
   - 采用现代设计语言
   - 提升视觉效果

2. ✅ **完全响应式**
   - 移动优先设计
   - 多设备适配
   - 流式布局

3. ✅ **性能优化**
   - 使用Vite构建
   - 代码分割
   - 资源优化

4. ✅ **主题切换**
   - 保留原始样式
   - 新增现代样式
   - 一键切换功能

### 8.2 技术栈选择

**确认使用**:
- ✅ Vite (构建工具)
- ✅ Tailwind CSS (样式框架)
- ✅ 原生JavaScript (交互)
- ✅ 静态部署 (GitHub Pages)

### 8.3 保留内容

**必须保留**:
1. ✅ 页面结构 (36个页面)
2. ✅ 核心交互逻辑
3. ✅ 页面跳转关系
4. ✅ 内容文本

### 8.4 废弃内容

**可以废弃**:
1. ❌ jQuery 依赖
2. ❌ Axure运行时脚本
3. ❌ 过时的CSS
4. ❌ 冗余的HTML嵌套

---

## 九、潜在风险

### 9.1 技术风险

1. ⚠️ **交互复杂度** - 某些Axure交互可能难以用原生JS实现
2. ⚠️ **样式冲突** - 原始样式和现代样式可能冲突
3. ⚠️ **资源路径** - 图片路径需要重新组织

### 9.2 解决方案

1. ✅ 渐进增强 - 先实现基础功能，再添加高级交互
2. ✅ CSS作用域 - 使用类名隔离两种主题
3. ✅ 路径重映射 - Vite自动处理资源路径

---

## 十、下一步行动计划

### Phase 1: 原型获取与结构分析 ✅ (已完成)

- ✅ 克隆项目
- ✅ 分析目录结构
- ✅ 分析样式系统
- ✅ 分析JavaScript交互
- ✅ 生成分析报告

### Phase 2: 现代化工程环境搭建 (下一步)

- ⏳ 初始化Vite项目
- ⏳ 配置Tailwind CSS
- ⏳ 设计双主题架构
- ⏳ 规划目录结构

---

## 附录：关键文件清单

### A. 核心HTML页面 (Top 10)

1. 智能客服首页.html (33KB)
2. 工具展开页.html (38KB)
3. 展开开户行查询.html (35KB)
4. 交易存疑.html (33KB)
5. 带场景的智能客服.html (17KB)
6. 个贷场景（贷前）.html (18KB)
7. 个贷场景（贷中、贷后）.html (14KB)
8. 理财场景.html (15KB)
9. 账户管理费尊贵版.html (23KB)
10. 无帮助.html (20KB)

### B. 核心CSS文件

1. resources/css/default.css
2. resources/css/reset.css
3. resources/css/axure_rp_page.css
4. data/styles.css

### C. 核心JS文件

1. resources/scripts/jquery-1.7.1.min.js
2. resources/scripts/axutils.js
3. resources/scripts/axure/axQuery.js
4. data/document.js

---

**分析完成时间**: 2026-02-14  
**分析人**: OpenClaw (静态原型现代化专家)  
**下一步**: 进入Phase 2 - 现代化工程环境搭建
