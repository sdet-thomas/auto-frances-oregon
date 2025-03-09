# Auto Frances Oregon

## Overview

auto-frances-oregon is a Playwright script that automates weekly Unemployment Insurance Benefits claims submission on https://frances.oregon.gov/. It aims to reduce manual data entry, save time, and minimize errors. All information provided through this script must be accurate and truthful.

## Important Considerations

1. **Data Accuracy**: Users are responsible for ensuring all input data is correct and honest.
2. **Legal Compliance**: The script should be used in accordance with State of Oregon Employment Department regulations.
3. **Regular Updates**: Keep the script updated to maintain compatibility with any changes to the frances.oregon.gov website.

## Usage

### Prerequisites
- Node.js and npm installed on your system
- A valid frances.oregon.gov account
- Job search information in CSV format

### Setup
1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `config.ts` file in the scripts directory with your credentials:
   ```typescript
   export const username = 'your-username';
   export const password = 'your-password';
   ```
4. Update the `jobs.csv` file with your job search activities

### Running the Script
Run the script with a visible browser:
```
npx playwright test --headed
```

**Important Note:** During the multi-factor authentication step, the script will pause and wait for manual input. You will have a maximum of 2 minutes to complete this step before the script times out. Additionally, after the Job Search Direct Contacts are entered, the script will take a screenshot and pause for your review. It is essential to carefully verify all automated entries and manual inputs before proceeding. Please note that you must submit the claim manually yourself after completing the review.

### Test Results
After running the script, a video recording and screenshoot will be saved in the test-results directory.

## Disclaimer

auto-frances-oregon is provided "as-is" without any warranties or guarantees. The developers are not liable for any consequences, including but not limited to issues with receiving unemployment benefits, that may result from using this script. Users should exercise caution and verify all submitted information for accuracy.

## License
This project is licensed under the MIT License.
