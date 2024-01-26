import Div from "@/components/Div";
import { headers } from "next/headers";
import React from "react";

export const fetchGet = async (host: string) => {
    const params = {
        from: "next",
        domainName: host,
    };
    try {
        const response: any = await fetch(
            `https://api.ecopara.ovh/api/parameters/visual-params?from=next&domainName=${host}`
        );
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();

        return data;
    } catch (e) {
        // (e.message);
        return e;
    }
};

const Home = async () => {
    const host = headers().get("host");
    console.log("first", headers().get("host"));
    const staticData = await fetchGet(host!);
    console.log("staticData", staticData);

    return (
        <div>
            <Div bgColor={staticData?.mainBackgroundColor ?? ""} />
        </div>
    );
};

export default Home;
