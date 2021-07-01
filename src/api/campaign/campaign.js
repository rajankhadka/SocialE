import { BASEURL} from "../baseurl";

const campaignApi = {
    'campaigncreate': BASEURL+'campaign/create/',
    'campaigngetlist': BASEURL+'campaign/getlist/',
    'campaignsend': BASEURL + 'campaign/send/',
    'campaignupdate': BASEURL + 'campaign/update/detail/',
    'campaigndelete': BASEURL + 'campaign/delete/',
    'campaignretrieve': BASEURL + 'campaign/retrieve/',
    'campaignmail_list': BASEURL + 'campaign/update/mail_list/',
    'addUsermailList':BASEURL + 'campaign/target_mail_list/',

    //all campaign retrive
    'campaignallretrive': BASEURL +'campaign/list/'
}

export { campaignApi };