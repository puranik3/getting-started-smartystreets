const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usAutocompletePro.Lookup;

let client;

const init = () => {
    // for Server-to-server requests, use this code:
    let authId = process.env.SMARTY_AUTH_ID;
    let authToken = process.env.SMARTY_AUTH_TOKEN;
    const credentials = new SmartyCore.StaticCredentials(authId, authToken);

    // for client-side requests (browser/mobile), use this code:
    // let key = process.env.SMARTY_EMBEDDED_KEY;
    // const credentials = new SmartyCore.SharedCredentials(key);

    // The appropriate license values to be used for your subscriptions
    // can be found on the Subscription page of the account dashboard.
    // https://www.smarty.com/docs/cloud/licensing
    let clientBuilder = new SmartyCore.ClientBuilder(credentials).withLicenses([
        "us-autocomplete-pro-cloud",
    ]);
    // .withBaseUrl("YOUR URL") // withBaseUrl() should be used if you are self-hosting the Smarty API

    client = clientBuilder.buildUsAutocompleteProClient();

    // Documentation for input fields can be found at:
    // https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-request-input-fields
};

// *** Simple Lookup ***
const lookupSimple = async (input) => {
    let lookup = new Lookup(input);
    const results = await client.send(lookup);
    return results;
};

// *** Using Filter and Prefer ***
const lookupFilterAndPrefer = async (input) => {
    let lookup = new Lookup(input);

    lookup.maxResults = 10;
    lookup.includeOnlyCities = ["Chicago,La Grange,IL", "Blaine,WA"];
    lookup.preferStates = ["IL"];
    lookup.preferRatio = 33;
    lookup.source = "all";

    const results = await client.send(lookup);
    return results;
}

// *** Using 'selected' to Expand Secondaries ***
// lookup = new Lookup("4770 Lincoln");

// lookup.selected = "4770 N Lincoln Ave Ste 2 (3) Chicago, IL 60625";

// await handleRequest(lookup, "Using 'selected' to Expand Secondaries");

// ************************************************

function logSuggestions(response, message) {
    console.log(message);
    console.log(response.result);
    console.log("*********************");
}

async function handleRequest(lookup, lookupType) {
    try {
        const results = await client.send(lookup);
        logSuggestions(results, lookupType);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    init,
    lookupSimple,
    lookupFilterAndPrefer
}