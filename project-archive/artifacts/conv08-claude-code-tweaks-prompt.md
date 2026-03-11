<!-- Source: Conversation 8 (Four week money challenge structure), Item 8.9 -->
<!-- Status: REFERENCE -->

# Claude Code Tweaks Prompt (Banner, Checkboxes, Mobile)

Context: After the initial roadmap HTML build was reviewed and screenshots confirmed it looked good, these three tweaks were identified and sent to Claude Code.

---

## Tweaks for the Roadmap

Please make these three updates:

**1. Make the sticky banner more prominent:**
- Increase the font size of the sticky banner text ("You can't do this wrong. Spending during the challenge doesn't mean failure -- it means data.")
- Make it slightly taller/more prominent overall
- Ensure it's still readable and not overwhelming on mobile

**2. Make the "Where Am I?" checkboxes functional:**
- When someone clicks a checkbox, save that state to browser localStorage
- When they return to the page, show their previously checked boxes
- This should work even if they close and reopen the browser
- Keep the scroll-to-section functionality that's already working

**3. Optimize for mobile:**
- Make sure all text is readable without zooming on phone screens
- Ensure the buttons are easy to tap (not too small)
- Check that the collapsible sections work smoothly on touch
- Make sure the sticky banner isn't too tall on mobile (doesn't take up too much screen real estate)

Keep everything else as is. The colors, layout, and content structure are all working well.
