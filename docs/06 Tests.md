## 06 单元测试
> 单元测试可以使用mocha测试框架，结合chai.js作为断言库，利用sinon.js构建测试桩。

### 单元测试
client端的测试跟着模块走，server端的测试统一放在tests文件夹下，文件命名为[name].spec.js。
模块的入口文件应该符合Commonjs规范；支持ES6语法。

测试文件结构示例：

	client/common/
	├── index.js
	└── index.spec.js
	tests/
	├── lib
	│   ├── render.spec.js


### 执行测试
执行测试脚本：npm run test:unit
执行测试分支覆盖率：npm run test:coverage
