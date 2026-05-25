import {cmsAPI} from "@/lib/api.ts";
import {useEffect} from "react";

const CMS = async (slug: string) => {
    const res = await cmsAPI.getAll();

    console.log(res.data.find((p: any) => p.slug === slug));
    return res.data.find((p: any) => p.slug === slug);
}
export default CMS;