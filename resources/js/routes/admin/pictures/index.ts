import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/pictures',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::index
* @see Http/Controllers/admin/AdminPicturesConverter.php:15
* @route '/dashboard/pictures'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::convert
* @see Http/Controllers/admin/AdminPicturesConverter.php:21
* @route '/dashboard/pictures/convert'
*/
export const convert = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convert.url(options),
    method: 'post',
})

convert.definition = {
    methods: ["post"],
    url: '/dashboard/pictures/convert',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::convert
* @see Http/Controllers/admin/AdminPicturesConverter.php:21
* @route '/dashboard/pictures/convert'
*/
convert.url = (options?: RouteQueryOptions) => {
    return convert.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::convert
* @see Http/Controllers/admin/AdminPicturesConverter.php:21
* @route '/dashboard/pictures/convert'
*/
convert.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: convert.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::convert
* @see Http/Controllers/admin/AdminPicturesConverter.php:21
* @route '/dashboard/pictures/convert'
*/
const convertForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convert.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPicturesConverter::convert
* @see Http/Controllers/admin/AdminPicturesConverter.php:21
* @route '/dashboard/pictures/convert'
*/
convertForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: convert.url(options),
    method: 'post',
})

convert.form = convertForm

const pictures = {
    index: Object.assign(index, index),
    convert: Object.assign(convert, convert),
}

export default pictures