import { AppConfig } from '../models/app.js';

const default_company_banner = 'https://wallpaperaccess.com/full/136845.png';
const default_user_picture = 'https://www.svgrepo.com/show/527946/user-circle.svg'
const default_company_picture = 'https://www.svgrepo.com/show/380481/building-company-office-real-estate.svg';

const appConfig: AppConfig = {

    client: {

        user: {
            default_picture: default_user_picture
        },

        candidate: {
            default_picture: default_user_picture
        },

        company: {
            default_banner: default_company_banner,
            default_picture: default_company_picture
        }
    }
}

export default appConfig;