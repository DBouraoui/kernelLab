import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/newsletter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\NewsletterController::index
* @see Http/Controllers/NewsletterController.php:12
* @route '/newsletter'
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
* @see \App\Http\Controllers\NewsletterController::store
* @see Http/Controllers/NewsletterController.php:17
* @route '/newsletter'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/newsletter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NewsletterController::store
* @see Http/Controllers/NewsletterController.php:17
* @route '/newsletter'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::store
* @see Http/Controllers/NewsletterController.php:17
* @route '/newsletter'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NewsletterController::store
* @see Http/Controllers/NewsletterController.php:17
* @route '/newsletter'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\NewsletterController::store
* @see Http/Controllers/NewsletterController.php:17
* @route '/newsletter'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const NewsletterController = { index, store }

export default NewsletterController