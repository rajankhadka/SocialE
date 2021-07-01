import { BASEURL } from "../baseurl"

export const userapi = {
    'individualuserprofile':BASEURL + 'user/view/',
    'individualuserprofileupdate': BASEURL + 'user/update/profile/',

    //permission and group
    'availableAdjustedPermission':BASEURL + 'group/perm/',

    //group create
    "groupcreate": BASEURL + 'group/create/',

    //all group get
    "grouplist": BASEURL + 'group/get/'
}