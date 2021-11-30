import { post } from '@/util/https';
const api = {
    get_name: (params) => post(`/tools/api/get_name`,params),
    notary_region_rate: (params) => post(`/tools/api/notary_region_rate`,params),
    new_seven_data: (params) => post(`/tools/api/new_seven_data`,params),
    distribution_data: (params) => post(`/tools/api/distribution_data`,params),
    notary_distribution_data: (params) => post(`/tools/api/notary_distribution_data`,params),
    handle_efficiency: (params) => post(`/tools/api/handle_efficiency`,params),
    notary_handle_efficiency_borad: (params) => post(`/tools/api/notary_handle_efficiency_borad`,params),
    provider_borad: (params) => post(`/tools/api/provider_borad`,params),
    request_borad: (params) => post(`/tools/api/request_borad`,params),
    region_disribution_rate: (params) => post(`/tools/api/region_disribution_rate`,params),
    region_notary_disribution_rate: (params) => post(`/tools/api/region_notary_disribution_rate`,params),
    user_info: (params) => post(`/tools/api/user_info`,params),
    assumption_details: (params) => post(`/tools/api/assumption_details`,params),
    request_records: (params) => post(`/tools/api/request_records`,params),
    provider_info_basic_info: (params) => post(`/tools/api/provider_info_basic_info`,params),
    provider_info_order_details_list: (params) => post(`/tools/api/provider_info_order_details_list`,params),
    provider_info_client_list: (params) => post(`/tools/api/provider_info_client_list`,params),
    notary_info: (params) => post(`/tools/api/notary_info`,params),
    notary_req: (params) => post(`/tools/api/notary_req`,params),
    query_msg: (params) => post(`/tools/api/query_msg`,params),
};
export default api;
