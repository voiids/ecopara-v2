// // server.js
// const https = require("https");
// const { parse } = require("url");
// const next = require("next");
// const fs = require("fs");

// const dev = process.env.NODE_ENV !== "production";
// // const hostname = 'alopara.ma';
// // const hostname = 'paradiem.ma';

// const hostname = "demo.ecopara.ovh";
// // const hostname = 'demo.ecopara.store';
// // const hostname = 'redirect.ecopara.store';
// // const hostname = 'customdomain.sobrus.ovh';
// // const hostname = 'france.ecopara.ovh';
// const port = 443;
// // when using middleware `hostname` and `port` must be provided below
// const app = next({ dev, hostname, port });
// const handle = app.getRequestHandler();

// const options = {
//     key: fs.readFileSync("localhost-key.pem"),
//     cert: fs.readFileSync("localhost.pem"),
//     // ca: [fs.readFileSync('server.crt')],
// };

// app.prepare().then(() => {
//     https
//         .createServer(options, async (req, res) => {
//             try {
//                 // Be sure to pass `true` as the second argument to `url.parse`.
//                 // This tells it to parse the query portion of the URL.
//                 const parsedUrl = parse(req.url, true);
//                 const { pathname, query } = parsedUrl;

//                 if (pathname === "/a") {
//                     await app.render(req, res, "/a", query);
//                 } else if (pathname === "/b") {
//                     await app.render(req, res, "/b", query);
//                 } else {
//                     await handle(req, res, parsedUrl);
//                 }
//             } catch (err) {
//                 // eslint-disable-next-line no-console
//                 console.error("Error occurred handling", req.url, err);
//                 res.statusCode = 500;
//                 res.end("internal server error");
//             }
//         })
//         .listen(port, (err) => {
//             if (err) throw err;
//             // eslint-disable-next-line no-console
//             console.log(`> Ready on https://${hostname}`);
//         });
// });

const https = require("https");
const fs = require("fs");
const next = require("next");
const port = parseInt(process.env.PORT) || 443;
const dev = true;
const hostname = "demo.ecopara.ovh";

const app = next({
    dev,
    dir: __dirname,
    hostname: hostname,
    port,
});
const handle = app.getRequestHandler();
const options = {
    key: fs.readFileSync("./key.pem"),
    cert: fs.readFileSync("./cert.pem"),
};
app.prepare().then(() => {
    https
        .createServer(options, (req, res) => {
            const parsedUrl = require("url").parse(req.url, true);
            handle(req, res, parsedUrl);
        })
        .listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on ${hostname}`);
        });
});
