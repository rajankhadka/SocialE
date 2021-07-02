import { BASEURL } from '../baseurl';

const signinApi = {
    'sigin': BASEURL+'signin/',
    'phonenumberget': BASEURL+'pnumber/',
    'chech2fstatus': BASEURL+'status/auth/',
    'sigin2f': BASEURL+'signin/2f/',
    'signintotp': BASEURL+'signin/totp/',
    'verifyotp': BASEURL+'verify/otp/',
    'sendotpmail':BASEURL+'mail/',
    'usersignup':BASEURL+'signup/',
    'select2f':BASEURL+'select/twofactor/',
    'passwordupdate':BASEURL+'user/update/password/',
    'disable2f':BASEURL+'disable/twofactor/',
    'enabletotp':BASEURL+'enable/totp/',

    // change password
    'setpassword':BASEURL+'setpassword/',
    'sendmail':BASEURL+'sendmail/',

    //token check
    'tokenverification':BASEURL +'user/state/',

}
export { signinApi };