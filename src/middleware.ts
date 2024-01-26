import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    // console.log("req", req);
    const hostname = req.headers.get("host");
    const currentHostname = hostname;
    if (!pathname.includes(".") && !pathname.startsWith("/api")) {
        console.log("pathname", pathname);
        const url = req.nextUrl.clone();
        url.pathname = `${currentHostname}${pathname}`;
        console.log("url.pathname", url.pathname);
        return NextResponse.rewrite(url);
    }
    return null;
}
// export const middleware = (handler) => async (req: NextRequest, res: NextResponse) => {
//     const host = req.headers.get("host");
//     // Add your logic to determine the store based on the hostname
//     const store = getStoreFromHostname(host);
//     // If a store is found, redirect to its domain
//     if (store) {
//       return {
//         redirect: {
//           destination: `https://${store.domain}`, // Replace with the actual destination
//           permanent: true, // Set to true for permanent redirect, false for temporary
//         },
//       };
//     }
//     // If no store is found, continue with the original handler
//     return handler(req, res);
//   };
