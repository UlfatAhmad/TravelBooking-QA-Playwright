# Unsupported booking scenarios

These scenarios are intentionally not part of the executable Playwright suite until the public practice application supports them. They are not represented by skipped tests, so Chromium results report only executable checks.

## Reservation form, guest validation, and guest data entry

The room "Book now" action navigates to `/reservation/{roomId}`, but the route currently renders an empty page with no form controls. During inspection, the corresponding `/api/room/{roomId}` request returned HTTP 500. Therefore there are no observed required fields, validation messages, or guest fields to interact with. The tests must not submit a reservation or contact form as a workaround.

## Invalid stay-date range validation

The homepage accepts a check-out date earlier than check-in and generates room booking links containing that invalid range. The application does not currently reject the range, so a test expecting rejection would fail against the observed behavior. Recheck this scenario if the application adds client- or server-side date validation.
