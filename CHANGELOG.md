# Change log

## 1.1.2 (04 July 2023)

- Remove "Facebook" from name of extension due to trademark claim by Facebook on the chrome web store.

## 1.1.1 (22 May 2021)

- Fix language detection due to Facebook changes ([Issue #10](https://github.com/addshore/browser-facebook-advert-interest-cleaner/issues/10))

## 1.1.0 (25 January 2021)

- Refactoring to allow running the same logic for multiple FB things
- Also add a clear all button to "Other Categories" when viewing in English ([Issue #6](https://github.com/addshore/browser-facebook-advert-interest-cleaner/issues/5))
- Make sure that all of the "Remove" buttons are clicked if they don't instantly load ([Issue #5](https://github.com/addshore/browser-facebook-advert-interest-cleaner/issues/5))

## 1.0.8 (15 January 2021)

- Update for case change in English FB page
  - This includes general handling for uppercase things now

## 1.0.7 (11 January 2021)

- Added multilingual functionality. Currently supported:
  - en_US, en_GB, de_DE, fr_FR, pt_BR, pt_PT, tr_TR
- Fixed issue when no "See All Interests" button was shown
- Fixed issue with not defined `removeAllInterestsForAllClickableTabs` method

## 1.0.6 (11 January 2021)

- Fixes for Facebook page changes

## 1.0.5

- Run on all frames in order to work with the new FB UI (which has these elements in an frame)
- Update text to hint reloading might be required when many interests need to be cleared

## 1.0.4

- Also enable the code on /ds/ facebook urls (apparently also a thing)

## 1.0.3

- TBA

## 1.0.2

- Also load on root page /ads/preferences

## 1.0.1

- No longer minify builds

## 1.0.0

- Initial version
