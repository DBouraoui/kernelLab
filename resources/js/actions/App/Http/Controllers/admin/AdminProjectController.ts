import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/project',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::index
* @see Http/Controllers/admin/AdminProjectController.php:16
* @route '/dashboard/project'
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
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/project/add',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::create
* @see Http/Controllers/admin/AdminProjectController.php:26
* @route '/dashboard/project/add'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/project/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::edit
* @see Http/Controllers/admin/AdminProjectController.php:82
* @route '/dashboard/project/{id}/edit'
*/
editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\admin\AdminProjectController::store
* @see Http/Controllers/admin/AdminProjectController.php:34
* @route '/dashboard/project'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/project',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::store
* @see Http/Controllers/admin/AdminProjectController.php:34
* @route '/dashboard/project'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminProjectController::store
* @see Http/Controllers/admin/AdminProjectController.php:34
* @route '/dashboard/project'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::store
* @see Http/Controllers/admin/AdminProjectController.php:34
* @route '/dashboard/project'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::store
* @see Http/Controllers/admin/AdminProjectController.php:34
* @route '/dashboard/project'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\admin\AdminProjectController::update
* @see Http/Controllers/admin/AdminProjectController.php:99
* @route '/dashboard/project/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/project/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::update
* @see Http/Controllers/admin/AdminProjectController.php:99
* @route '/dashboard/project/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminProjectController::update
* @see Http/Controllers/admin/AdminProjectController.php:99
* @route '/dashboard/project/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::update
* @see Http/Controllers/admin/AdminProjectController.php:99
* @route '/dashboard/project/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::update
* @see Http/Controllers/admin/AdminProjectController.php:99
* @route '/dashboard/project/{id}'
*/
updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\admin\AdminProjectController::destroy
* @see Http/Controllers/admin/AdminProjectController.php:143
* @route '/dashboard/project/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/project/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::destroy
* @see Http/Controllers/admin/AdminProjectController.php:143
* @route '/dashboard/project/{id}'
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
* @see \App\Http\Controllers\admin\AdminProjectController::destroy
* @see Http/Controllers/admin/AdminProjectController.php:143
* @route '/dashboard/project/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::destroy
* @see Http/Controllers/admin/AdminProjectController.php:143
* @route '/dashboard/project/{id}'
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
* @see \App\Http\Controllers\admin\AdminProjectController::destroy
* @see Http/Controllers/admin/AdminProjectController.php:143
* @route '/dashboard/project/{id}'
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

/**
* @see \App\Http\Controllers\admin\AdminProjectController::toggleFeatured
* @see Http/Controllers/admin/AdminProjectController.php:163
* @route '/dashboard/project/{id}/toggle-featured'
*/
export const toggleFeatured = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleFeatured.url(args, options),
    method: 'patch',
})

toggleFeatured.definition = {
    methods: ["patch"],
    url: '/dashboard/project/{id}/toggle-featured',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\admin\AdminProjectController::toggleFeatured
* @see Http/Controllers/admin/AdminProjectController.php:163
* @route '/dashboard/project/{id}/toggle-featured'
*/
toggleFeatured.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleFeatured.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminProjectController::toggleFeatured
* @see Http/Controllers/admin/AdminProjectController.php:163
* @route '/dashboard/project/{id}/toggle-featured'
*/
toggleFeatured.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleFeatured.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::toggleFeatured
* @see Http/Controllers/admin/AdminProjectController.php:163
* @route '/dashboard/project/{id}/toggle-featured'
*/
const toggleFeaturedForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleFeatured.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminProjectController::toggleFeatured
* @see Http/Controllers/admin/AdminProjectController.php:163
* @route '/dashboard/project/{id}/toggle-featured'
*/
toggleFeaturedForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleFeatured.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggleFeatured.form = toggleFeaturedForm

const AdminProjectController = { index, create, edit, store, update, destroy, toggleFeatured }

export default AdminProjectController