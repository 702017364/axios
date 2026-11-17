# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2026-11-17
### Changed
- 升级依赖

## [1.3.0] - 2026-05-11
### Changed
- 升级依赖

## [1.2.2] - 2026-03-25
### Fixed
- 修复 publish 前没有重新 build 导致没有发布最新代码问题

### Added
- 添加 README

### Changed
- 升级依赖包
- 修改apiGet：当 options 为非空字符串时将使用路径拼接(原为参数)


## [1.1.5] - 2025-11-26
### Added
- 添加了完整的测试套件，包括对 [apiPost](index.ts) 和 [apiGet](index.ts) 函数的全面测试
- 配置了 Jest 测试环境，支持 TypeScript 测试
- 添加了测试相关的依赖项：jest, ts-jest, @types/jest, lodash, @types/lodash
- 添加了 [jest.config.js](jest.config.js) 配置文件用于测试配置
- 添加了 [tsconfig.test.json](tsconfig.test.json) 用于测试环境的 TypeScript 配置

### Changed
- 更新了 [package.json](package.json) 添加了 `test` 脚本命令