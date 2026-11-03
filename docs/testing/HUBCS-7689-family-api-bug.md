# Bug: Personal info API fails to retrieve employee family data

Type: Bug
Environment: Development ? https://igate-dev-new.stc.com.sa
User story: [HUBCS-7689](https://dm.stc.com.sa/browse/HUBCS-7689)
Feature reference: [DMOE-21785](https://dm.stc.com.sa/browse/DMOE-21785) (verified in Jira)
Requested Jira links: relates to HUBCS-7689 and DMOE-21785

## Description
The supplied Personal info API response for rzahrani@stc.com.sa contains an errors.family entry reporting a failure in the upstream getFamily integration. Family data is absent, while the response includes My info, Address, Bank, and Official documents data.

## Steps to reproduce
1. Sign in to the development portal as rzahrani@stc.com.sa using a valid session.
2. Open Profile > Personal info.
3. Inspect the GET request to:
   https://apiblinkdev.hubplatforms.com/v1/private/mygate/api/profile/profileHome/rzahrani%40stc.com.sa/personal-info
4. Inspect the family data and errors.family in the response.

## Expected result
The API retrieves the employee's family data successfully and makes it available to the Family section. An employee with no family records should receive the supported empty-data response rather than an upstream service failure.

## Actual result
The response has no family data and includes:

```json
{
  "errors": {
    "family": {
      "pointer": "HUB SERVICE ERROR",
      "source": "HUB ERROR",
      "message": "Failed to get response from third party for getFamily"
    }
  }
}
```

## Impact
Family information cannot be verified for the affected account. This blocks HUBCS-7689-A (Family Display) and data-dependent ordering/pagination checks. The upstream failure does not by itself establish a defect in the Family error-state UI (HUBCS-7689-J).

## Evidence and scope
Based on the request and response provided by the reporter on 3 November 2026. The HTTP status and frequency were not supplied, and this API failure was not independently replayed. Authentication headers and unrelated personal information are omitted.

Jira bug: [HUBCS-7717](https://dm.stc.com.sa/browse/HUBCS-7717)
