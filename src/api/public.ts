import {AxiosResponse} from "axios";
import {$axios, Response} from "./index";
import {SystemMemberData, SystemMembersData} from "./system";
import {SystemData} from "./system";

export const getSystem = (systemId: string): Promise<AxiosResponse<Response<SystemData>>> => $axios.request<Response<SystemData>>({
    url: `/public/system/${systemId}`,
    method: 'GET',
})

export const getMember = (systemId: string, memberId: string): Promise<AxiosResponse<Response<SystemMemberData>>> => $axios.request<Response<SystemMemberData>>({
    url: `/public/system/${systemId}/members/${memberId}`,
    method: 'GET',
})

export const getMembers = (systemId: string): Promise<AxiosResponse<Response<SystemMembersData>>> => $axios.request<Response<SystemMembersData>>({
    url: `/public/system/${systemId}/members`,
    method: 'GET',
})
