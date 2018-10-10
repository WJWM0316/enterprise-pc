/**
 * 所有设置对应的接口请求
 */
import { request } from './index.js'


// 获取分类列表
export const getCategoryListsApi = params => request(
	`/category`, 
	'get', 
	params
)

// 添加分类
export const createCategoryApi = params => request(
	`/category/create`, 
	'get', 
	params
)

// 编辑分类
export const editCategoryApi = params => request(
	`/category/${params.id}/edit`, 
	'get', 
	params
)

// 更新分类排序
export const updateCategoryApi = params => request(
	`/category/${params.id}`, 
	'put', 
	params
)

// 删除分类
export const deleteCategoryApi = params => request(
	`/category/${params.id}`, 
	'delete', 
	params
)

