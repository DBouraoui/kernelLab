import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:44
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
* @see Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:44
* @route '/dashboard/newsletter/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::exportMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:44
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
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleactive
* @see Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
export const toggleactive = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleactive.url(args, options),
    method: 'patch',
})

toggleactive.definition = {
    methods: ["patch"],
    url: '/dashboard/newsletter/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleactive
* @see Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
toggleactive.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleactive.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleactive
* @see Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
toggleactive.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleactive.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleactive
* @see Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
const toggleactiveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleactive.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::toggleactive
* @see Http/Controllers/admin/AdminNewsletterController.php:33
* @route '/dashboard/newsletter/{id}'
*/
toggleactiveForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleactive.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggleactive.form = toggleactiveForm

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::deleteMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/dashboard/newsletter/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::deleteMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
deleteMethod.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::deleteMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::deleteMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
const deleteMethodForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::deleteMethod
* @see Http/Controllers/admin/AdminNewsletterController.php:26
* @route '/dashboard/newsletter/{id}'
*/
deleteMethodForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteMethod.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

deleteMethod.form = deleteMethodForm

const newsletter = {
    export: Object.assign(exportMethod, exportMethod),
    toggleactive: Object.assign(toggleactive, toggleactive),
    delete: Object.assign(deleteMethod, deleteMethod),
}

export default newsletter