## Using SmartyStreets API

-   Go to the organization page on GitHub

    -   https://github.com/smartystreets

-   Check the Java API repo

    -   https://github.com/orgs/smartystreets/repositories
    -   https://github.com/smartystreets/smartystreets-java-sdk

-   Check the README -> documentation and examples

    -   https://www.smarty.com/docs/sdk/java
    -   https://github.com/smartystreets/smartystreets-java-sdk/tree/master/src/main/java/examples

-   Check the JavaScript SDK

    -   https://www.smarty.com/docs/sdk/javascript

-   Follow the example given in the repo

```
git clone https://github.com/smarty/smartystreets-javascript-sdk.git
```

## Obtaining an API Key

-   https://www.smarty.com/pricing/us-address-autocomplete -> Choose Free account and follow the steps
-   Then click on the left sidebar -> API keys (create a Server key)

## Recreating the example

-   Create a folder and open a terminal in that folder
-   Create `package.json`

```
npm init -y
```

-   Install libraries

```

npm i smartystreets-javascript-sdk dotenv

```

-   Store the API key and Auth token in a `.env` file

```

SMARTY_AUTH_ID=<your_auth_id>
SMARTY_AUTH_TOKEN=<your_auth_token>

```

-   Take the example code from https://github.com/smarty/smartystreets-javascript-sdk/blob/master/examples/us_autocomplete_pro.js

```js
const SmartySDK = require("smartystreets-javascript-sdk");
const SmartyCore = SmartySDK.core;
const Lookup = SmartySDK.usAutocompletePro.Lookup;

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

let client = clientBuilder.buildUsAutocompleteProClient();

// Documentation for input fields can be found at:
// https://www.smarty.com/docs/cloud/us-autocomplete-api#pro-http-request-input-fields

// *** Simple Lookup ***
let lookup = new Lookup("4770 Lincoln");

await handleRequest(lookup, "Simple Lookup");

// *** Using Filter and Prefer ***
lookup = new Lookup("4770 Lincoln");

lookup.maxResults = 10;
lookup.includeOnlyCities = ["Chicago,La Grange,IL", "Blaine,WA"];
lookup.preferStates = ["IL"];
lookup.preferRatio = 33;
lookup.source = "all";

await handleRequest(lookup, "Using Filter and Prefer");

// *** Using 'selected' to Expand Secondaries ***
lookup = new Lookup("4770 Lincoln");

lookup.selected = "4770 N Lincoln Ave Ste 2 (3) Chicago, IL 60625";

await handleRequest(lookup, "Using 'selected' to Expand Secondaries");

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
```

-

```
npm i smartystreets-javascript-sdk dotenv
```

-   Add a start script in the "scripts" section in `package.json`

```
"start": "node us-autocomplete-pro.js",
```

-   Run it from the terminal

```
npm start
```

-   For more information on using input fields for auto complete check https://www.smarty.com/docs/cloud/us-autocomplete-pro-api#pro-http-request-input-fields
