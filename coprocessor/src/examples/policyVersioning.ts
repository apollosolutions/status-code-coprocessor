type CoprocessorBody = {
  body: {
    query: string;
  };
  headers: {
    version: string;
  };
  sdl: string;
  context: {
    entries: {
      "apollo_authorization::policies::required": Object;
    };
  };
};

const calculateIfValidVersion = (version: String, policy: String) => {
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
  } else if (type === "REMOVED") {
    result = versionYear < policyYear;
    if (versionYear === policyYear) {
      result = versionMonth < policyMonth;
    }
  }

  return result;
};

const parseSchema = (schema: String) => {
  const sdlLines = schema.split("\n");
  return sdlLines.filter((line) => !line.includes("@policy")).join("\n");
};

const policyVersioning = (resBody: CoprocessorBody) => {
  const { body, headers, sdl, context } = resBody;

  // console.log("Res body -> ", body);

  const isIntrospection = body?.query?.includes("__schema");

  // console.log("isIntrospection -> ", isIntrospection);

  if (isIntrospection) {
    resBody.sdl = parseSchema(sdl);
  }

  if (context) {
    const policies =
      context.entries["apollo_authorization::policies::required"];

    // Loop through each policy in schema to determine validity of version
    policies &&
      headers.version &&
      Object.entries(policies).forEach(([policy]) => {
        // @ts-ignore
        policies[`${policy}`] = calculateIfValidVersion(
          headers.version[0],
          policy,
        );
      });

    // console.log("policies outcomes ->", policies);

    // @ts-ignore
    resBody.context.entries["apollo_authorization::policies::required"] =
      policies;
  }

  // return response
  return resBody;
};

export default policyVersioning;
