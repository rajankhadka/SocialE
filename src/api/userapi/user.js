import { BASEURL } from "../baseurl"

export const userapi = {
    'individualuserprofile':BASEURL + 'user/view/',
    'individualuserprofileupdate': BASEURL + 'user/update/profile/',

    //permission and group
    'availableAdjustedPermission':BASEURL + 'group/perm/',

    //group create
    "groupcreate": BASEURL + 'group/create/',

    //all group get
    "grouplist": BASEURL + 'group/get/',

    //get all user
    "userlist": BASEURL + 'users/',

    //user permission and group detail
    "usergroup": BASEURL + 'group/details/',

    //view group permission
    "viewgrouppermission": BASEURL + 'group/viewpermissions/',

    //update group
    "updateGroup": BASEURL + 'group/update/',

    //delete group
    "deleteGroup":BASEURL + 'group/delete/'
}