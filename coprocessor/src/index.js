import express from "express";

const app = express();

const processSupergraphResponseStage = async (payload) => {
  // Thus handles what the coprocessor does with the payload sent by the router for the supergraph response stage
  // See: https://www.apollographql.com/docs/router/customizations/coprocessor#supergraphresponse

  // Print the payload to the console
  // This is useful for debugging and understanding what the payload looks like
  console.log("------- Data sent from router to coprocessor by supergraph response -------");
  console.log("Note: The payload contains the context entry for statusCode (added by the subgraph response stage)");
  console.log(payload);
  console.log("---------------------------------------------------------------------------");
  
  // Check if there is a context entry with the key "statusCode"
  if (payload.context.entries["statusCode"]) {
    // Check whtether the status code is not 200
    if (payload.context.entries["statusCode"] !== 200) {
      // Add a break to the payload control object
      // This will stop the request and return the status code from the context entry
      // https://www.apollographql.com/docs/graphos/routing/customization/coprocessor#terminating-a-client-request
      payload.control = { break: payload.context.entries["statusCode"] };
    }
  }
  
  console.log("------- Data sent from coprocessor to router by supergraph response -------");
  console.log("Note: The payload is the same as the one sent by the router, but with the control object added");
  console.log(payload);
  console.log("---------------------------------------------------------------------------");

  return payload;
}

const processSubgraphResponseStage = async (payload) => {
  // This handles what the coprocessor does with the payload sent by the router for the subgraph response stage
  // See: https://www.apollographql.com/docs/router/customizations/coprocessor#subgraphresponse

  // Print the payload to the console
  // This is useful for debugging and understanding what the payload looks like
  console.log("------- Data sent from router to coprocessor by each subgraph response -------");
  console.log(payload);
  console.log("------------------------------------------------------------------------------");

  // Check if there is a context entry with the key "statusCode"
  if (!payload.context.entries["statusCode"]) {
    // If not, add it with the same value as the subgraph response status code
    payload.context.entries["statusCode"] = payload.statusCode;
  }

  console.log("------- Data sent from coprocessor to router by each subgraph response -------");
  console.log("Note: The payload is the same as the one sent by the router, but with the context entry for statusCode added");
  console.log(payload);
  console.log("------------------------------------------------------------------------------");

  return payload;
}

app.post("/", express.json(), async (req, res) => {
  const payload = req.body;

  // The coprocessor always listens on the same address and port
  // The payload stage is used to detect which stage of the request lifecycle the coprocessor is being called
  let response = payload;
  switch (payload.stage) {
    case "SupergraphResponse":
      response = await processSupergraphResponseStage(payload);
      break;
    case "SubgraphResponse":
      response = await processSubgraphResponseStage(payload);
      break;
  }

  res.send(response);
});

app.listen(3007, () => {
  console.log("🚀 Server running at http://localhost:3007");
});
