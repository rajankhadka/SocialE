import {BASEURL } from '../baseurl';

const template = {
    'resource_list': BASEURL+'template/resource/list/',
    'templateresourcecreate': BASEURL+'template/resource/create/',
    'templatesend': BASEURL+'campaign/send/',
    'templateValidateandresource': BASEURL+'campaign/validate/template/',
    'templateIPtracing': 'https://ipgeolocation.abstractapi.com/v1/?api_key=c45b67797f8f462ebbe9d79f4f47a1c2',
    'useragentData':BASEURL+'campaign/ua_data/',

    //get all template 
    'templateallget': BASEURL +`template/resource/get/`,

    //template resource retrieve
    'templateresourceretrieve': BASEURL +'template/resource/retrieve',

    //template delete
    'templatedelete': BASEURL +'template/resource/delete/'
}


export { template };