import api from "./interceptor";


//template list api
export const getTemplateList = async (company_id) => {
    const response = await api.get(`/company/${company_id}/templates`);
    return response;
}

//template details by id
export const getTemplateDetails = async (template_id) => {
    const response = await api.get(`/templates/${template_id}`);
    return response;
}

//status color
export const getStatusColor = async (data) => {
    const response = await api.post(`/colours`, data);
    return response;
}


//get template types
export const getTemplateTypes = async (data) => {
    const response = await api.post(`/template-types`, data);
    return response;
}


//add milestone under the compnay
export const addMilestone = async (data) => {
    const response = await api.post(`/milestones`, data);
    return response;
}

//get all milestones under the company
export const getMilestone = async (data) => {
    const response = await api.post(`/company-milestones`, data);
    return response;
}
//add template
export const addTemplate = async (data) => {
    const response = await api.post(`/templates`, data);
    return response;
}