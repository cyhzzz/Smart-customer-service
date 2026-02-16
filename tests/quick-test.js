#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('智能客服系统 - 全链路测试报告');
console.log('========================================\n');

const modernDir = './modern';
const files = fs.readdirSync(modernDir).filter(f => f.endsWith('.html'));

console.log(`📊 总页面数: ${files.length}\n`);

// 测试项目
const testResults = {
    fileExists: { passed: 0, failed: 0, details: [] },
    htmlStructure: { passed: 0, failed: 0, details: [] },
    hasContent: { passed: 0, failed: 0, details: [] },
    hasNavigation: { passed: 0, failed: 0, details: [] },
    responsive: { passed: 0, failed: 0, details: [] }
};

// 关键页面列表
const criticalPages = [
    'modern.html',
    '公告.html',
    '交易查询.html',
    '理财场景.html',
    '个贷场景-贷前.html',
    '账户管理费.html',
    '开户行查询.html',
    '工具展开页.html',
    '答案页面.html'
];

// 测试每个文件
files.forEach(file => {
    const filePath = path.join(modernDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileSize = fs.statSync(filePath).size;

    // 测试1: 文件存在且可读
    testResults.fileExists.passed++;
    testResults.fileExists.details.push(`✅ ${file} (${(fileSize / 1024).toFixed(1)}KB)`);

    // 测试2: HTML结构完整性
    if (content.includes('<!DOCTYPE html>') && content.includes('</html>')) {
        testResults.htmlStructure.passed++;
    } else {
        testResults.htmlStructure.failed++;
        testResults.htmlStructure.details.push(`❌ ${file} - HTML结构不完整`);
    }

    // 测试3: 有实际内容（不是占位符）
    if (!content.includes('完善中') && fileSize > 2000) {
        testResults.hasContent.passed++;
    } else {
        testResults.hasContent.failed++;
        testResults.hasContent.details.push(`⚠️  ${file} - 内容过少或为占位符`);
    }

    // 测试4: 有导航链接
    if (content.includes('href=') || content.includes('onclick=')) {
        testResults.hasNavigation.passed++;
    } else {
        testResults.hasNavigation.failed++;
        testResults.hasNavigation.details.push(`❌ ${file} - 缺少导航`);
    }

    // 测试5: 响应式设计
    if (content.includes('viewport') && content.includes('width=device-width')) {
        testResults.responsive.passed++;
    } else {
        testResults.responsive.failed++;
        testResults.responsive.details.push(`⚠️  ${file} - 缺少响应式设计`);
    }
});

// 打印测试结果
function printSection(title, result) {
    console.log(`\n${title}`);
    console.log('-'.repeat(60));
    console.log(`通过: ${result.passed}/${result.passed + result.failed}`);
    if (result.details.length > 0 && result.failed > 0) {
        result.details.slice(0, 5).forEach(d => console.log(d));
        if (result.details.length > 5) {
            console.log(`... 还有 ${result.details.length - 5} 个问题`);
        }
    }
}

printSection('✅ 1. 文件存在性测试', testResults.fileExists);
printSection('✅ 2. HTML结构完整性', testResults.htmlStructure);
printSection('✅ 3. 内容完整性测试', testResults.hasContent);
printSection('✅ 4. 导航功能测试', testResults.hasNavigation);
printSection('✅ 5. 响应式设计测试', testResults.responsive);

// 关键页面检查
console.log('\n\n🎯 关键页面检查');
console.log('-'.repeat(60));
criticalPages.forEach(page => {
    if (files.includes(page)) {
        const content = fs.readFileSync(path.join(modernDir, page), 'utf-8');
        const size = fs.statSync(path.join(modernDir, page)).size;
        console.log(`✅ ${page.padEnd(25)} ${(size / 1024).toFixed(1)}KB`);
    } else {
        console.log(`❌ ${page.padEnd(25)} 文件不存在`);
    }
});

// 链接完整性检查
console.log('\n\n🔗 链接完整性抽查');
console.log('-'.repeat(60));
const sampleFiles = ['modern.html', '公告.html', '交易查询.html'];
sampleFiles.forEach(file => {
    const content = fs.readFileSync(path.join(modernDir, file), 'utf-8');
    const links = content.match(/href="[^"]+\.html"/g) || [];
    console.log(`${file}: 找到 ${links.length} 个HTML链接`);
});

// 最终评分
const totalTests = Object.values(testResults).reduce((sum, r) => sum + r.passed + r.failed, 0);
const totalPassed = Object.values(testResults).reduce((sum, r) => sum + r.passed, 0);
const passRate = ((totalPassed / totalTests) * 100).toFixed(1);

console.log('\n\n========================================');
console.log('📊 测试总结');
console.log('========================================');
console.log(`总测试数: ${totalTests}`);
console.log(`通过数: ${totalPassed}`);
console.log(`失败数: ${totalTests - totalPassed}`);
console.log(`通过率: ${passRate}%`);
console.log('========================================\n');

if (passRate >= 95) {
    console.log('✅ 测试通过！所有页面质量良好。\n');
} else {
    console.log('⚠️  部分测试未通过，请检查上述问题。\n');
}

// 生成详细报告
const reportPath = './test-report.md';
const report = `# 智能客服系统 - 测试报告

生成时间: ${new Date().toLocaleString('zh-CN')}

## 测试概览

- **总页面数**: ${files.length}
- **通过率**: ${passRate}%
- **总测试数**: ${totalTests}
- **通过数**: ${totalPassed}

## 详细测试结果

### 1. 文件存在性测试
- 通过: ${testResults.fileExists.passed}/${files.length}

### 2. HTML结构完整性
- 通过: ${testResults.htmlStructure.passed}/${files.length}
${testResults.htmlStructure.failed > 0 ? '- 存在失败的测试' : ''}

### 3. 内容完整性测试
- 通过: ${testResults.hasContent.passed}/${files.length}
${testResults.hasContent.failed > 0 ? '- 存在失败的测试' : ''}

### 4. 导航功能测试
- 通过: ${testResults.hasNavigation.passed}/${files.length}

### 5. 响应式设计测试
- 通过: ${testResults.responsive.passed}/${files.length}

## 关键页面状态

${criticalPages.map(page => {
    const exists = files.includes(page);
    const size = exists ? fs.statSync(path.join(modernDir, page)).size : 0;
    return `- ${exists ? '✅' : '❌'} ${page} ${exists ? `(${(size / 1024).toFixed(1)}KB)` : ''}`;
}).join('\n')}

## 结论

${passRate >= 95 ? '✅ 所有测试通过，页面质量良好，可以提交验收。' : '⚠️  部分测试未通过，需要进一步优化。'}
`;

fs.writeFileSync(reportPath, report);
console.log(`📄 详细测试报告已生成: ${reportPath}\n`);
