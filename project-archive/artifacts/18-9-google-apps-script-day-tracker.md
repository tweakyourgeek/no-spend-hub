# Google Apps Script Code for Day Tracker
# Source: Conversation 18 - Native Google Sheets integration
# URL: https://claude.ai/chat/f43d7cf2-256a-42e7-a2d2-76fd5f7129a0
# Status: CURRENT
#
# NOTE: The actual Google Apps Script code was created as a downloadable artifact
# in the original conversation (embedded in Day Tracker v2 workbook "Google Apps Script Code" tab).
# The artifact block was not renderable in the markdown export ("This block is not supported
# on your current device yet."). The code exists in the .xlsx file: Business_No_Spend_Day_Tracker_v2.xlsx
#
# Below is the specification and description extracted from the conversation text.

## Day Tracker v2 - Google Apps Script Specification

### Functionality:
- Click "No-Spend Tracker -> Create New Month Sheet" to automatically generate new tracking sheets
- No more manual duplication
- No more entering dates manually
- Script creates everything with one click

### What the script does:
- Creates a new sheet named with the month/year
- Generates all dates for that month automatically
- Sets up all formulas (streak counter, success rate)
- Applies conditional formatting:
  - "No" days (no spending) = Light green
  - "Yes" days (spent) = Light red
- Includes built-in tracking formulas

### Setup Instructions (for users):
1. Upload the Day Tracker file to Google Sheets
2. Follow the instructions in the "HOW TO USE" tab
3. Enable Google Apps Script (Extensions -> Apps Script)
4. Authorize the script when prompted
5. Use the custom menu "No-Spend Tracker -> Create New Month Sheet"

### Workbook Structure:
- Tab 1: HOW TO USE (full setup guide with step-by-step instructions)
- Tab 2: Google Apps Script Code (copy/paste-ready JavaScript)
- Tab 3: Sample month to see how it works

### Gamification Features:
- Streak Counter at the top showing current no-spend streak
- Success Rate Percentage (piggy bank meter)
- Automatic conditional formatting for visual progress
- Built-in formulas to track progress

### User Decision:
- User confirmed they use Google Apps Script in their other products (Spreadsheetable subscription)
- Customers are comfortable enabling it
- Preferred over manual sheet duplication
