import { BASEURL} from "../baseurl";

const campaignApi = {
    'campaigncreate': BASEURL+'campaign/create/',
    'campaigngetlist': BASEURL+'campaign/getlist/',
    'campaignsend': BASEURL + 'campaign/send/',
    'campaignupdate': BASEURL + 'campaign/update/detail/',
    'campaigndelete': BASEURL + '',
    'campaignretrieve': BASEURL + 'campaign/retrieve/',
    'campaignmail_list': BASEURL + 'campaign/update/mail_list/',
}

export { campaignApi };