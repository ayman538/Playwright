# DMOE-21785 profile revamp test cases

Source: https://dm.stc.com.sa/browse/DMOE-21785 and nine directly linked stories, including the HUBCS-7692 DOCX attachment.

Preconditions: authenticated employee on the development portal; use local environment credentials. Story example values are illustrative, not expected values for this employee. Tests requiring other roles, missing data, more than five family members, controlled failures, or successful profile updates need matching data or isolated network fixtures.

## HUBCS-7683-A — My Info Display

Story: https://dm.stc.com.sa/browse/HUBCS-7683

Scenario and expected result: An employee opens Personal info. The My info section displays first name "Abdullah", second name "Ali", family name "Aldosari", date of birth "30 January 1993", and nationality "Saudi Arabia" with the Saudi flag.

Execution: Not run.

## HUBCS-7683-B — Missing Value

Story: https://dm.stc.com.sa/browse/HUBCS-7683

Scenario and expected result: An employee has no second name in the backend. The second name field displays "--".

Execution: Not run.

## HUBCS-7683-C — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7683

Scenario and expected result: An employee views the My info section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7683-D — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7683

Scenario and expected result: An employee collapses the My info section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7683-E — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7683

Scenario and expected result: An employee collapses the My info section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7683-F — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7683

Scenario and expected result: The system fails to load the My info data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your info. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7684-A — Address Display

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: An employee opens Personal info. The Address section displays address "3080 Imam Saud Road", city "Riyadh", district "Al Mursalat", and zip code "123863".

Execution: Not run.

## HUBCS-7684-B — No P.O. Box

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: An employee has no P.O. Box in the backend. The P.O. Box field displays "--".

Execution: Not run.

## HUBCS-7684-C — No Address Data

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: An employee has no address data. The Address section is displayed with all fields shown as "--".

Execution: Not run.

## HUBCS-7684-D — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: An employee views the Address section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7684-E — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: An employee collapses the Address section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7684-F — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: An employee collapses the Address section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7684-G — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7684

Scenario and expected result: The system fails to load the Address data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your address. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7685-A — Saudi ID Display

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: A Saudi employee opens Personal info. The Official documents section displays the sub-title "saudi id", id number "2611939946", issue place "Riyadh", issue date "17-02-2023", and expiry date "16-02-2028".

Execution: Not run.

## HUBCS-7685-B — Copy ID Number

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: An employee presses the copy icon beside the id number. The number is copied and the default system message is displayed.

Execution: Not run.

## HUBCS-7685-C — Expired Document

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: An employee's ID expiry date has passed. The expiry date is displayed normally, without a highlight.

Execution: Not run.

## HUBCS-7685-D — No Document Data

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: An employee has no ID data. The section is displayed with all fields shown as "--".

Execution: Not run.

## HUBCS-7685-E — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: An employee views the Official documents section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7685-F — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: An employee collapses the Official documents section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7685-G — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: An employee collapses the Official documents section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7685-H — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7685

Scenario and expected result: The system fails to load the Official documents data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your official documents. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7686-A — GOSI Display

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: An employee opens Personal info. The Social insurance section displays the GOSI number "4692343" with the GOSI logo.

Execution: Not run.

## HUBCS-7686-B — Copy GOSI Number

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: An employee presses the copy icon beside the GOSI number. The number is copied and the default system message is displayed.

Execution: Not run.

## HUBCS-7686-C — No GOSI Data

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: An employee has no GOSI number. The section is displayed with the GOSI number shown as "--".

Execution: Not run.

## HUBCS-7686-D — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: An employee views the Social insurance section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7686-E — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: An employee collapses the Social insurance section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7686-F — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: An employee collapses the Social insurance section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7686-G — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7686

Scenario and expected result: The system fails to load the Social insurance data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your social insurance details. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7687-A — Passport Display

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: An employee opens Personal info. The Passport section displays number "A273014270", issue place "120", issue date "17-02-2023", and expiry date "16-02-2028".

Execution: Not run.

## HUBCS-7687-B — Issue Place as Received

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: The backend provides the issue place as a code ("120"). It is displayed as received.

Execution: Not run.

## HUBCS-7687-C — Copy Passport Number

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: An employee presses the copy icon beside the passport number. The number is copied and the default system message is displayed.

Execution: Not run.

## HUBCS-7687-D — No Passport

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: An employee has no passport data. The Passport section is displayed with all fields shown as "--".

Execution: Not run.

## HUBCS-7687-E — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: An employee views the Passport section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7687-F — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: An employee collapses the Passport section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7687-G — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: An employee collapses the Passport section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7687-H — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7687

Scenario and expected result: The system fails to load the Passport data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your passport details. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7688-A — License Display

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: An employee opens Personal info. The Driving license section displays number "435435", issue date "17-02-2023", and expiry date "16-02-2028".

Execution: Not run.

## HUBCS-7688-B — Copy License Number

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: An employee presses the copy icon beside the license number. The number is copied and the default system message is displayed.

Execution: Not run.

## HUBCS-7688-C — No Driving License

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: An employee has no driving license data. The section is displayed with all fields shown as "--".

Execution: Not run.

## HUBCS-7688-D — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: An employee views the Driving license section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7688-E — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: An employee collapses the Driving license section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7688-F — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: An employee collapses the Driving license section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7688-G — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7688

Scenario and expected result: The system fails to load the Driving license data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your driving license details. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7689-A — Family Display

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee opens Personal info. The Family section displays a table with "Ali Abdullah Aldosari – Father" and "Yasser Ali Aldosari – Brother".

Execution: Not run.

## HUBCS-7689-B — Order as Received

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee has 4 family members. They are displayed in the order received from the backend.

Execution: Not run.

## HUBCS-7689-C — Show More

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee has 9 family members. The first 5 are displayed with a "show more" button; pressing it displays all 9 and the button changes to "show less".

Execution: Not run.

## HUBCS-7689-D — Show Less

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee presses "show less". The table returns to the first 5 family members.

Execution: Not run.

## HUBCS-7689-E — 5 or Fewer Members

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee has 4 family members. All 4 are displayed, and the show more button is not displayed.

Execution: Not run.

## HUBCS-7689-F — No Family Members

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee has no registered family members. The Family section is displayed with the table header and no rows.

Execution: Not run.

## HUBCS-7689-G — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee views the Family section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7689-H — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee collapses the Family section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7689-I — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: An employee collapses the Family section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7689-J — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7689

Scenario and expected result: The system fails to load the Family data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your family members. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7690-A — Bank Display

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: An employee opens Personal info. The Bank section displays the account number "1000023677089" with their bank's logo.

Execution: Not run.

## HUBCS-7690-B — Bank Logo

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: Two employees have accounts in different banks. Each sees their own bank's logo beside the account number.

Execution: Not run.

## HUBCS-7690-C — Copy Account Number

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: An employee presses the copy icon beside the account number. The number is copied and the default system message is displayed.

Execution: Not run.

## HUBCS-7690-D — No Bank Data

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: An employee has no bank data. The section is displayed with the account number shown as "--".

Execution: Not run.

## HUBCS-7690-E — Read-Only

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: An employee views the Bank section. No add or edit icon is displayed.

Execution: Not run.

## HUBCS-7690-F — Collapse & Expand

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: An employee collapses the Bank section and expands it again. The content is hidden and then displayed again.

Execution: Not run.

## HUBCS-7690-G — State Not Saved

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: An employee collapses the Bank section, leaves the page, and returns to Personal info. The section is displayed expanded.

Execution: Not run.

## HUBCS-7690-H — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7690

Scenario and expected result: The system fails to load the Bank data. The section displays the error state "Something went wrong" with the subtitle "Unable to load your bank details. Please try again.", while the other sections display normally. 🔄

Execution: Not run.

## HUBCS-7692-A — Default Landing - Employee

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An STC Employee opens their profile. The profile opens on the Profile Overview section, which is highlighted in the sections menu, with the header displayed at the top.

Execution: Not run.

## HUBCS-7692-B — Default Landing - Contractor

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An STC Contractor Employee opens their profile. Profile Overview is not displayed in the menu, and the profile opens on the Business Info section instead.

Execution: Not run.

## HUBCS-7692-C — Manager Sections

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An STC Manager opens their profile and sees 10 sections in the menu, including My Team.

Execution: Not run.

## HUBCS-7692-D — Employee Sections

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An STC Employee opens their profile and sees 9 sections in the menu. My Team is not displayed.

Execution: Not run.

## HUBCS-7692-E — Contractor Sections

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An STC Contractor Employee opens their profile and sees 4 sections only: Business Info, Attendance, Vacations and Career Development.

Execution: Not run.

## HUBCS-7692-F — Header Persistence

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee navigates from Attendance to Vacations. The header and the sections menu remain fixed, and only the content area on the right is changed.

Execution: Not run.

## HUBCS-7692-G — Expand Sub Sections

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the arrow beside Earnings & Benefits. The section expands and displays Salary and Benefits. The employee then navigates to Attendance, and Earnings & Benefits is collapsed again.

Execution: Not run.

## HUBCS-7692-H — Update Cover

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses "update cover / تحديث الغلاف" selects a 2 MB JPG image from their device, and the cover image is updated immediately.

Execution: Not run.

## HUBCS-7692-I — Invalid Cover Upload

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee tries to upload a 7 MB cover image. The system rejects the file and displays "Unsupported file. Please upload a JPG or PNG image up to 5 MB."

Execution: Not run.

## HUBCS-7692-J — Update Profile Picture

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the camera icon on their profile picture, uploads a new 1 MB PNG image, and the profile picture is updated.

Execution: Not run.

## HUBCS-7692-K — Edit Nickname

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the edit icon beside the nickname, updates it to "Abo Khaled", and the nickname is displayed beside the employee name preceded by "@".

Execution: Not run.

## HUBCS-7692-L — Availability Status - Available

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee is clocked in at the office. The system displays the "Available / متاح" badge beside the nickname automatically, without any action from the employee.

Execution: Not run.

## HUBCS-7692-M — Availability Status - Vacation

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee has an approved vacation starting today. The system displays the "Vacation / في إجازة" badge automatically, and the employee cannot change it.

Execution: Not run.

## HUBCS-7692-N — Copy Email

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the copy icon beside the email address. The email is copied to the clipboard and the confirmation message "Email copied / تم نسخ البريد الإلكتروني" appears.

Execution: Not run.

## HUBCS-7692-O — Multiple Mobile Numbers

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee has 3 mobile numbers. The header displays the primary number with a "+2" badge. Pressing the badge displays the other 2 numbers.

Execution: Not run.

## HUBCS-7692-P — Navigate to Manager Profile

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the manager name in the contact row. The system navigates to the manager profile.

Execution: Not run.

## HUBCS-7692-Q — Action Buttons

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee opens their profile. The Create Meeting, Add Task, Org Chart, Delegation and More buttons are displayed in the header.

Execution: Not run.

## HUBCS-7692-R — More Menu

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the More button. A menu is displayed containing Share Profile and Report an Issue.

Execution: Not run.

## HUBCS-7692-S — Delegation

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee presses the Delegation button. The system navigates them to the Delegation Center service to manage their delegations.

Execution: Not run.

## HUBCS-7692-T — Empty Field Hidden

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee has no nickname and no location. Both fields are hidden from the header, and the remaining fields are displayed normally without empty placeholders.

Execution: Not run.

## HUBCS-7692-U — Error State

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: A network failure occurs while loading the profile. The system displays "Something went wrong / حدث خطأ ما" with the subtitle and the Contact Support button. Pressing the button opens the email client with hubsupport@stc.com.sa pre-filled.

Execution: Not run.

## HUBCS-7692-V — Localization

Story: https://dm.stc.com.sa/browse/HUBCS-7692

Scenario and expected result: An employee changes the Hub language to Arabic. All section names, labels, buttons and messages are displayed in Arabic.

Execution: Not run.

## Additional acceptance-criteria checks

For all eight Personal info sections: verify localized titles and field labels, header icons, label/value styling, loading indicator during delayed requests, section-local error isolation, read-only controls, and expanded state on re-entry. Verify two-column layouts except Social insurance, Bank, and Family. Verify each missing scalar value is exactly --.

For document sections: verify DD-MM-YYYY dates, expired dates without highlighting, copy confirmation, and clipboard equality. Verify birth date uses D MMMM YYYY. Verify Family at 0, 1, 5, 6, and 9 records, backend order, and show more/less. Verify Bank contains only the unmasked account number and the correct bank logo.

Header boundaries: nickname at 30 and 31 characters; cover at 5 MB and above, supported and unsupported formats; picture at 2 MB and above and at 199/200 px boundaries. Verify upload persistence using isolated test accounts and restore previous data.

Requirements to clarify: section criteria refer to reopening Business info when describing Personal info expansion; Saudi ID Arabic subtitle is blank. Use Personal info re-entry for current checks and leave the Arabic subtitle unresolved.
