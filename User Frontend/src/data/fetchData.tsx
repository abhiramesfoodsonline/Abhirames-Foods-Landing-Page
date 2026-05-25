import {companyAPI} from "@/lib/api.ts";

export const fetchCompanyName = async () => {
    try {
        const res = await companyAPI.getCompanyProfile();
        if (res.status === 200) {
            console.log(res);
            return res.data.company_name;
        } else {
            console.error('Failed to fetch company name:', res.statusText);
        }
    } catch (error) {
        console.error('Error fetching company name:', error);
    }
}