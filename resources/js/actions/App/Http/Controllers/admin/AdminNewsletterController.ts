import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/newsletter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::index
* @see app/Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
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
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/dashboard/newsletter/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see app/Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleActive
* @see app/Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
export const toggleActive = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/dashboard/newsletter/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleActive
* @see app/Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
toggleActive.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return toggleActive.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleActive
* @see app/Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
toggleActive.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleActive
* @see app/Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
const toggleActiveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleActive
* @see app/Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
toggleActiveForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggleActive.form = toggleActiveForm

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::destroy
* @see app/Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/newsletter/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::destroy
* @see app/Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::destroy
* @see app/Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::destroy
* @see app/Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::destroy
* @see app/Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const AdminNewsletterController = { index, exportMethod, toggleActive, destroy, export: exportMethod }

export default AdminNewsletterController