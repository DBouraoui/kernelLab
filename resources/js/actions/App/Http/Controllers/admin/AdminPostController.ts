import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/dashboard/post/view',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::list
* @see app/Http/Controllers/admin/AdminPostController.php:17
* @route '/dashboard/post/view'
*/
listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: list.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

list.form = listForm

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/post/add',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::create
* @see app/Http/Controllers/admin/AdminPostController.php:31
* @route '/dashboard/post/add'
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
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/post/edit/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
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
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::edit
* @see app/Http/Controllers/admin/AdminPostController.php:24
* @route '/dashboard/post/edit/{id}'
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
* @see \App\Http\Controllers\admin\AdminPostController::update
* @see app/Http/Controllers/admin/AdminPostController.php:72
* @route '/dashboard/post/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/dashboard/post/{id}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::update
* @see app/Http/Controllers/admin/AdminPostController.php:72
* @route '/dashboard/post/{id}'
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
* @see \App\Http\Controllers\admin\AdminPostController::update
* @see app/Http/Controllers/admin/AdminPostController.php:72
* @route '/dashboard/post/{id}'
*/
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::update
* @see app/Http/Controllers/admin/AdminPostController.php:72
* @route '/dashboard/post/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::update
* @see app/Http/Controllers/admin/AdminPostController.php:72
* @route '/dashboard/post/{id}'
*/
updateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\admin\AdminPostController::store
* @see app/Http/Controllers/admin/AdminPostController.php:95
* @route '/dashboard/store'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::store
* @see app/Http/Controllers/admin/AdminPostController.php:95
* @route '/dashboard/store'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::store
* @see app/Http/Controllers/admin/AdminPostController.php:95
* @route '/dashboard/store'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::store
* @see app/Http/Controllers/admin/AdminPostController.php:95
* @route '/dashboard/store'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::store
* @see app/Http/Controllers/admin/AdminPostController.php:95
* @route '/dashboard/store'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteMethod
* @see app/Http/Controllers/admin/AdminPostController.php:36
* @route '/dashboard/post/{id}'
*/
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/dashboard/post/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteMethod
* @see app/Http/Controllers/admin/AdminPostController.php:36
* @route '/dashboard/post/{id}'
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
* @see \App\Http\Controllers\admin\AdminPostController::deleteMethod
* @see app/Http/Controllers/admin/AdminPostController.php:36
* @route '/dashboard/post/{id}'
*/
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteMethod
* @see app/Http/Controllers/admin/AdminPostController.php:36
* @route '/dashboard/post/{id}'
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
* @see \App\Http\Controllers\admin\AdminPostController::deleteMethod
* @see app/Http/Controllers/admin/AdminPostController.php:36
* @route '/dashboard/post/{id}'
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

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadImages
* @see app/Http/Controllers/admin/AdminPostController.php:127
* @route '/dashboard/upload-images'
*/
export const uploadImages = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImages.url(options),
    method: 'post',
})

uploadImages.definition = {
    methods: ["post"],
    url: '/dashboard/upload-images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadImages
* @see app/Http/Controllers/admin/AdminPostController.php:127
* @route '/dashboard/upload-images'
*/
uploadImages.url = (options?: RouteQueryOptions) => {
    return uploadImages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadImages
* @see app/Http/Controllers/admin/AdminPostController.php:127
* @route '/dashboard/upload-images'
*/
uploadImages.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadImages.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadImages
* @see app/Http/Controllers/admin/AdminPostController.php:127
* @route '/dashboard/upload-images'
*/
const uploadImagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadImages.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadImages
* @see app/Http/Controllers/admin/AdminPostController.php:127
* @route '/dashboard/upload-images'
*/
uploadImagesForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadImages.url(options),
    method: 'post',
})

uploadImages.form = uploadImagesForm

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:162
* @route '/dashboard/upload-thumbnail'
*/
export const uploadThumbnail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadThumbnail.url(options),
    method: 'post',
})

uploadThumbnail.definition = {
    methods: ["post"],
    url: '/dashboard/upload-thumbnail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:162
* @route '/dashboard/upload-thumbnail'
*/
uploadThumbnail.url = (options?: RouteQueryOptions) => {
    return uploadThumbnail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:162
* @route '/dashboard/upload-thumbnail'
*/
uploadThumbnail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: uploadThumbnail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:162
* @route '/dashboard/upload-thumbnail'
*/
const uploadThumbnailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadThumbnail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::uploadThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:162
* @route '/dashboard/upload-thumbnail'
*/
uploadThumbnailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: uploadThumbnail.url(options),
    method: 'post',
})

uploadThumbnail.form = uploadThumbnailForm

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:178
* @route '/dashboard/delete-thumbnail'
*/
export const deleteThumbnail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteThumbnail.url(options),
    method: 'post',
})

deleteThumbnail.definition = {
    methods: ["post"],
    url: '/dashboard/delete-thumbnail',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:178
* @route '/dashboard/delete-thumbnail'
*/
deleteThumbnail.url = (options?: RouteQueryOptions) => {
    return deleteThumbnail.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:178
* @route '/dashboard/delete-thumbnail'
*/
deleteThumbnail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteThumbnail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:178
* @route '/dashboard/delete-thumbnail'
*/
const deleteThumbnailForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteThumbnail.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteThumbnail
* @see app/Http/Controllers/admin/AdminPostController.php:178
* @route '/dashboard/delete-thumbnail'
*/
deleteThumbnailForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteThumbnail.url(options),
    method: 'post',
})

deleteThumbnail.form = deleteThumbnailForm

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteImage
* @see app/Http/Controllers/admin/AdminPostController.php:147
* @route '/dashboard/delete-image'
*/
export const deleteImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteImage.url(options),
    method: 'post',
})

deleteImage.definition = {
    methods: ["post"],
    url: '/dashboard/delete-image',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteImage
* @see app/Http/Controllers/admin/AdminPostController.php:147
* @route '/dashboard/delete-image'
*/
deleteImage.url = (options?: RouteQueryOptions) => {
    return deleteImage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteImage
* @see app/Http/Controllers/admin/AdminPostController.php:147
* @route '/dashboard/delete-image'
*/
deleteImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: deleteImage.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteImage
* @see app/Http/Controllers/admin/AdminPostController.php:147
* @route '/dashboard/delete-image'
*/
const deleteImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteImage.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\admin\AdminPostController::deleteImage
* @see app/Http/Controllers/admin/AdminPostController.php:147
* @route '/dashboard/delete-image'
*/
deleteImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: deleteImage.url(options),
    method: 'post',
})

deleteImage.form = deleteImageForm

const AdminPostController = { list, create, edit, update, store, deleteMethod, uploadImages, uploadThumbnail, deleteThumbnail, deleteImage, delete: deleteMethod }

export default AdminPostController