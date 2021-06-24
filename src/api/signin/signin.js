import { BASEURL } from '../baseurl';

const signinApi = {
    'sigin': BASEURL+'signin/',
    'phonenumberget': BASEURL+'pnumber/',
    'chech2fstatus': BASEURL+'status/auth/',
    'sigin2f': BASEURL+'signin/2f/',
    'signintotp': BASEURL+'signin/totp/',
    'verifyotp': BASEURL+'verify/otp/',
    'sendotpmail':BASEURL+'mail/'
}
export { signinApi };