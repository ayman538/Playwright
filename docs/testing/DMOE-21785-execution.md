# DMOE-21785 execution report

Executed 3 November 2026 against the development portal in Chromium, using the configured employee account and English UI. Final run duration: approximately 38 seconds.

**44 acceptance checks: 32 passed, 10 failed, 2 blocked.** These are checks inside one Playwright test, which failed overall. They are not 44 fully executed source scenarios. The separate design contains 83 source scenarios; full feature coverage remains incomplete.

Command:

```powershell
npx.cmd playwright test tests/igate-profile.spec.ts --project=chromium --workers=1
```

Detailed evidence: [execution JSON](DMOE-21785-execution.json). Future runs attach `acceptance-results` to the Playwright report; this document records the verified run above.

## Failed checks

| Story | Check | Expected | Observed |
| --- | --- | --- | --- |
| HUBCS-7684 | Address labels | `P.O. Box` | `PO box`; punctuation differs. |
| HUBCS-7685 | Copy ID | Copy control, matching clipboard, confirmation | No accessible copy button beside the populated ID. |
| HUBCS-7687 | Copy passport | Copy control, matching clipboard, confirmation | No accessible copy button beside the populated passport number. |
| HUBCS-7690 | Bank fields | Account number only | Additional `bank` field. |
| HUBCS-7689 | Family table | Name and relation headers | No table headers while section is in an error state. |
| HUBCS-7689 | Family data load | No section error | Section displays a load error. This also blocks verification of the Family table contents. |
| HUBCS-7683 | Birth-date format | `D MMMM YYYY` | Numeric `DD-MM-YYYY` format. |
| Personal info stories | Missing fields | Two hyphens, `--` | Em dash, `—`, in eight displayed fields. |
| HUBCS-7692 | Header actions | Create meeting, Add task, Org chart, Delegation | Create meeting button absent; this grouped check stops at the first missing action. Remaining action behavior is unverified. |
| HUBCS-7692 | Email copy confirmation | Clipboard matches email and `Email copied` confirmation | Clipboard equality passes; expected confirmation is not found in a status element. Confirm whether a different notification component is intended. |

These are acceptance mismatches requiring review, not ten independently diagnosed defects. In particular, two Family failures share one observed load error. No bugs or comments were posted to Jira.

## Passed coverage

Header identity/email, selected Personal info navigation, My info as the first section, default expansion and absence of editing controls across all eight sections, collapse/expand across all sections, most field lists and ordering, no section error in seven sections, GOSI clipboard equality and confirmation, and expansion reset after leaving and returning to Personal info.

An initial re-entry check returned before navigation completed. After adding an explicit wait for Personal info to disappear, re-entry passed. Only the corrected run is reported in the totals above.

## Blocked and remaining coverage

Driving-license and bank clipboard equality are blocked because this account has no populated numbers. Family table behavior cannot be verified while its section fails to load.

Not executed: alternate role access/default landing, Arabic localization, controlled loading/error/missing-data fixtures, backend-to-UI value reconciliation, Family counts at 0/1/5/6/9 and ordering, bank-logo variants, visual styling and icons, expiry styling, successful uploads and persistence, nickname editing and boundaries, profile-header action destinations, and other conditional header scenarios. Successful profile updates need an account whose data may be changed and restored; role scenarios need suitable accounts or verified role fixtures.

The source criteria also refer to opening Business info in Personal info expansion rules, and leave the Arabic Saudi ID subtitle blank. These ambiguities remain open. Current re-entry coverage uses Personal info.
