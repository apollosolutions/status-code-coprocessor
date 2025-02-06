"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateIfValidVersion = (version, policy) => {
    // Example version - 2023-01
    const [versionYear, versionMonth] = version.split("-");
    //example policy - REMOVED_2023_04
    const [type, policyYear, policyMonth] = policy.split("_");
    let result;
    if (type === "ADDED") {
        result = versionYear > policyYear;
        if (versionYear === policyYear) {
            result = versionMonth >= policyMonth;
        }
    }
    else if (type === "REMOVED") {
        result = versionYear < policyYear;
        if (versionYear === policyYear) {
            result = versionMonth < policyMonth;
        }
    }
    return result;
};
const parseSchema = (schema) => {
    const sdlLines = schema.split("\n");
    return sdlLines.filter((line) => !line.includes("@policy")).join("\n");
};
const policyVersioning = (resBody) => {
    var _a;
    const { body, headers, sdl, context } = resBody;
    console.log("Res body -> ", body);
    const isIntrospection = (_a = body === null || body === void 0 ? void 0 : body.query) === null || _a === void 0 ? void 0 : _a.includes("__schema");
    console.log("isIntrospection -> ", isIntrospection);
    if (isIntrospection) {
        resBody.sdl = parseSchema(sdl);
    }
    if (context) {
        const policies = context.entries["apollo_authorization::policies::required"];
        // Loop through each policy in schema to determine validity of version
        policies &&
            headers.version &&
            Object.entries(policies).forEach(([policy]) => {
                // @ts-ignore
                policies[`${policy}`] = calculateIfValidVersion(headers.version[0], policy);
            });
        console.log("policies outcomes ->", policies);
        // @ts-ignore
        resBody.context.entries["apollo_authorization::policies::required"] =
            policies;
    }
    // return response
    return resBody;
};
exports.default = policyVersioning;
