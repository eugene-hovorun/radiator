// import * as fs from "fs";
// import { URL } from "url";
// import * as path from "path";
// import * as cheerio from "cheerio";

// const __dirname = new URL(".", import.meta.url).pathname;

// export const processCountry = (
//   countryIso: string,
// ): Promise<string[] | undefined> => {
//   const filePath = path.resolve(
//     __dirname,
//     "../../server/utils/4x3/",
//     `${countryIso}.svg`,
//   );

//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err) {
//         console.error(`Error reading file for ${countryIso}:`, err);
//         reject(err);
//         return;
//       }

//       const $ = cheerio.load(data);
//       const colors = new Set<string>();

//       $("[fill]").each((_, element) => {
//         const fillValue = $(element).attr("fill");

//         if (
//           fillValue &&
//           fillValue !== "none" &&
//           fillValue !== "transparent" &&
//           !fillValue.startsWith("url(")
//         ) {
//           colors.add(fillValue);
//         }
//       });

//       // Extract stroke colors
//       $("[stroke]").each((_, element) => {
//         const strokeValue = $(element).attr("stroke");

//         if (
//           strokeValue &&
//           strokeValue !== "none" &&
//           strokeValue !== "transparent" &&
//           !strokeValue.startsWith("url(")
//         ) {
//           colors.add(strokeValue);
//         }
//       });

//       resolve(Array.from(colors));
//     });
//   });
// };
