import { apiPost, apiGet } from '../index'
import type { AxiosInstance } from 'axios'

describe('apiPost', () => {
  // 测试所需的数据结构
  interface User {
    id: number
    name: string
  }

  // 创建一个模拟的axios实例
  let mockAxios: AxiosInstance
  let errorHandler: jest.Mock

  beforeEach(() => {
    // 重置所有模拟函数
    jest.resetAllMocks()

    // 创建模拟函数
    const postMock = jest.fn()

    mockAxios = {
      post: postMock
    } as unknown as AxiosInstance

    errorHandler = jest.fn()
  })

  it('应该成功发送POST请求并返回响应数据', async () => {
    // 准备数据
    const mockResponseData: User = { id: 1, name: 'John Doe' };

    // 设置模拟行为
    (mockAxios.post as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockResponseData)
    )

    // 执行测试
    const post = apiPost(mockAxios, errorHandler)
    const result = await post<User, false>('/users', { name: 'John Doe' })

    // 验证结果
    expect(result).toEqual(mockResponseData)
    expect(mockAxios.post).toHaveBeenCalledWith('/users', { name: 'John Doe' }, undefined)
    expect(errorHandler).not.toHaveBeenCalled()
  })

  it('应该在请求失败时返回false作为默认拒绝值', async () => {
    // 准备数据
    const error = new Error('Network Error');

    // 设置模拟行为
    (mockAxios.post as jest.Mock).mockImplementation(() =>
      Promise.reject(error)
    )

    // 执行测试
    const post = apiPost(mockAxios, errorHandler)
    const result = await post<User, false>('/users', { name: 'John Doe' })

    // 验证结果
    expect(result).toBe(false)
    expect(errorHandler).toHaveBeenCalledWith(error)
  })

  it('应该在请求失败时返回自定义拒绝值', async () => {
    // 准备数据
    const error = new Error('Network Error');

    // 设置模拟行为
    (mockAxios.post as jest.Mock).mockImplementation(() =>
      Promise.reject(error)
    )

    // 执行测试
    const post = apiPost(mockAxios, errorHandler)
    const result = await post<User, string>('/users', { name: 'John Doe' }, {
      rejectValue: 'FAILED'
    })

    // 验证结果
    expect(result).toBe('FAILED')
    expect(errorHandler).toHaveBeenCalledWith(error)
  })

  it('应该使用twist选项处理错误而不是默认处理器', async () => {
    // 准备数据
    const error = new Error('Network Error')
    const twistHandler = jest.fn();

    // 设置模拟行为
    (mockAxios.post as jest.Mock).mockImplementation(() =>
      Promise.reject(error)
    )

    // 执行测试
    const post = apiPost(mockAxios, errorHandler)
    const result = await post<User, false>('/users', { name: 'John Doe' }, {
      twist: twistHandler
    })

    // 验证结果
    expect(result).toBe(false)
    expect(twistHandler).toHaveBeenCalledWith(error)
    expect(errorHandler).not.toHaveBeenCalled()
  })
})

describe('apiGet', () => {
  // 测试所需的数据结构
  interface User {
    id: number
    name: string
  }

  // 创建一个模拟的axios实例
  let mockAxios: AxiosInstance
  let errorHandler: jest.Mock

  beforeEach(() => {
    // 重置所有模拟函数
    jest.resetAllMocks()

    // 创建模拟函数
    const getMock = jest.fn()

    mockAxios = {
      get: getMock
    } as unknown as AxiosInstance

    errorHandler = jest.fn()
  })

  it('应该成功发送GET请求并返回响应数据', async () => {
    // 准备数据
    const mockResponseData: User = { id: 1, name: 'John Doe' };

    // 设置模拟行为
    (mockAxios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockResponseData)
    )

    // 执行测试
    const get = apiGet(mockAxios, errorHandler)
    const result = await get<User, false>('/users/1')

    // 验证结果
    expect(result).toEqual(mockResponseData)
    expect(mockAxios.get).toHaveBeenCalledWith('/users/1', undefined)
    expect(errorHandler).not.toHaveBeenCalled()
  })

  it('应该使用options参数构造URL查询参数', async () => {
    // 准备数据
    const mockResponseData: User = { id: 1, name: 'John Doe' };

    // 设置模拟行为
    (mockAxios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockResponseData)
    )

    // 执行测试
    const get = apiGet(mockAxios, errorHandler)
    const result = await get<User, false>('/users', { active: 'true', limit: '10' })

    // 验证结果
    expect(result).toEqual(mockResponseData)
    expect(mockAxios.get).toHaveBeenCalled()
    expect(errorHandler).not.toHaveBeenCalled()
  })

  it('应该在请求失败时返回false作为默认拒绝值', async () => {
    // 准备数据
    const error = new Error('Network Error');

    // 设置模拟行为
    (mockAxios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(error)
    )

    // 执行测试
    const get = apiGet(mockAxios, errorHandler)
    const result = await get<User, false>('/users/1')

    // 验证结果
    expect(result).toBe(false)
    expect(errorHandler).toHaveBeenCalledWith(error)
  })

  it('应该在请求失败时返回自定义拒绝值', async () => {
    // 准备数据
    const error = new Error('Network Error');

    // 设置模拟行为
    (mockAxios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(error)
    )

    // 执行测试
    const get = apiGet(mockAxios, errorHandler)
    const result = await get<User, string>('/users/1', undefined, {
      rejectValue: 'FAILED'
    })

    // 验证结果
    expect(result).toBe('FAILED')
    expect(errorHandler).toHaveBeenCalledWith(error)
  })

  it('应该使用twist选项处理错误而不是默认处理器', async () => {
    // 准备数据
    const error = new Error('Network Error')
    const twistHandler = jest.fn();

    // 设置模拟行为
    (mockAxios.get as jest.Mock).mockImplementation(() =>
      Promise.reject(error)
    )

    // 执行测试
    const get = apiGet(mockAxios, errorHandler)
    const result = await get<User, false>('/users/1', undefined, {
      twist: twistHandler
    })

    // 验证结果
    expect(result).toBe(false)
    expect(twistHandler).toHaveBeenCalledWith(error)
    expect(errorHandler).not.toHaveBeenCalled()
  })
})