import DashboardController from './DashboardController'
import AdminPostController from './AdminPostController'
import AdminContactController from './AdminContactController'
import AdminNewsletterController from './AdminNewsletterController'
import AdminProjectController from './AdminProjectController'
import AdminPicturesConverter from './AdminPicturesConverter'

const admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    AdminPostController: Object.assign(AdminPostController, AdminPostController),
    AdminContactController: Object.assign(AdminContactController, AdminContactController),
    AdminNewsletterController: Object.assign(AdminNewsletterController, AdminNewsletterController),
    AdminProjectController: Object.assign(AdminProjectController, AdminProjectController),
    AdminPicturesConverter: Object.assign(AdminPicturesConverter, AdminPicturesConverter),
}

export default admin