# Profile revamp testing

Feature: [DMOE-21785](https://dm.stc.com.sa/browse/DMOE-21785).

- [Test design](DMOE-21785-test-cases.md): 83 source scenarios from nine linked stories, plus additional acceptance-criteria and boundary checks.
- [Structured cases](DMOE-21785-test-cases.json): source scenario IDs, preconditions, steps, and expected results.
- [Execution report](DMOE-21785-execution.md): live account results and remaining coverage.
- [Detailed results](DMOE-21785-execution.json): individual automated checks and failure evidence.

Run from the project root:

```powershell
npx.cmd playwright test tests/igate-profile.spec.ts --project=chromium --workers=1
```

The new suite runs headlessly and uses the existing UI/API credentials from `.env`. It reports independent acceptance checks as steps with soft assertions in one authenticated browser session. Any failed check fails the Playwright test. Clipboard checks with no populated number are recorded as blocked in the `acceptance-results` attachment. Tracing is disabled because this authenticated flow handles credentials and tokens.

The live suite covers the supplied account and English interface. The 83 design scenarios are broader than the automated checks; a passing automated check does not certify its entire source story. Role variants, uploads and nickname persistence, Arabic localization, network fault injection, backend-value reconciliation, loading indicators, visual styling, and Family record-count boundaries require further execution. Source scenario examples are illustrative and must not be hardcoded as this account's expected data.

Raw Jira responses and temporary inspection artifacts are excluded from Git under `.jira-cache/`. Tokens stay in `.env`. No Jira issues or comments are created by this suite.
