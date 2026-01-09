import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import post from './post'
import contact50a660 from './contact'
import newsletterC9f74d from './newsletter'
import project from './project'
/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\DashboardController::dashboard
* @see Http/Controllers/admin/DashboardController.php:14
* @route '/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/dashboard/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminContactController::contact
* @see Http/Controllers/admin/AdminContactController.php:13
* @route '/dashboard/contact'
*/
contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contact.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

contact.form = contactForm

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
export const newsletter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: newsletter.url(options),
    method: 'get',
})

newsletter.definition = {
    methods: ["get","head"],
    url: '/dashboard/newsletter',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
newsletter.url = (options?: RouteQueryOptions) => {
    return newsletter.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
newsletter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: newsletter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
newsletter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: newsletter.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
const newsletterForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: newsletter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
newsletterForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: newsletter.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\admin\AdminNewsletterController::newsletter
* @see Http/Controllers/admin/AdminNewsletterController.php:13
* @route '/dashboard/newsletter'
*/
newsletterForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: newsletter.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

newsletter.form = newsletterForm

const admin = {
    dashboard: Object.assign(dashboard, dashboard),
    post: Object.assign(post, post),
    contact: Object.assign(contact, contact50a660),
    newsletter: Object.assign(newsletter, newsletterC9f74d),
    project: Object.assign(project, project),
}

export default admin