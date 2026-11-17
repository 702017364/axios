# @vope/axios

基于 Axios 的封装库，提供类型安全和增强的 HTTP 请求功能。

## 安装

```bash
npm install @vope/axios
```

## 导出 API

| 函数名 | 描述 |
|--------|------|
| apiPost | 基于 axios.post 封装的 post 方法 |
| apiGet | 基于 axios.get 封装的 get 方法 |

## 配置选项

| 选项 | 类型 | 描述 |
|------|------|------|
| rejectValue | `symbol \| string \| false` | 变更默认错误返回值 |
| twist | `(e: Error) => void` | 错误拦截 |


## logs
[CHANGELOG](./CHANGELOG.md)


## License

ISC
