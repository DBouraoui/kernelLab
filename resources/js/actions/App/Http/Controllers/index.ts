import GuestController from './GuestController'
import BlogController from './BlogController'
import ContactController from './ContactController'
import NewsletterController from './NewsletterController'
import ProjectController from './ProjectController'
import admin from './admin'
import Settings from './Settings'

const Controllers = {
    GuestController: Object.assign(GuestController, GuestController),
    BlogController: Object.assign(BlogController, BlogController),
    ContactController: Object.assign(ContactController, ContactController),
    NewsletterController: Object.assign(NewsletterController, NewsletterController),
    ProjectController: Object.assign(ProjectController, ProjectController),
    admin: Object.assign(admin, admin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers