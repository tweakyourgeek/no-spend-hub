# Conversation Extraction Prompt (6-Section Template)
# Source: Conversation 44 (Cloud project artifacts inventory)
# URL: https://claude.ai/chat/e621f71d-9bc1-41c4-827c-898138d4044a
# Status: CURRENT
# Notes: Reusable prompt to paste into every conversation in a project. Comprehensive extraction of all artifacts, decisions, content, parked items, and outstanding work.

---

## Conversation Extraction Prompt

Paste this into every conversation in this project. Copy the response back to the project management conversation.

I need a full extraction of this conversation. This is for project management purposes so nothing gets lost. Please be thorough and specific.

**1. ARTIFACTS / FILES CREATED**
List every artifact, file, or document that was created or generated in this conversation. For each one:
* Exact file name (if it has one)
* What it contains (1 sentence)
* Whether it's downloadable right now or only exists in chat text
* If downloadable: is it the most current version, or was it superseded by a later version in this same conversation?

If nothing was created, say "No artifacts created in this conversation."

**2. DECISIONS MADE**
List every decision that was finalized (not just discussed) in this conversation. Include:
* What was decided
* Why (1 sentence max)
* Whether it affects other parts of the project

**3. CONTENT DRAFTED (even if not saved as a file)**
List any content that was written, drafted, or composed in the chat messages themselves but never saved as a downloadable artifact. This includes: copy, scripts, prompts, outlines, page content, social posts, email drafts, system prompts, etc.
* What it is
* Where in the conversation it lives (early, middle, late)
* Whether it should be saved

**4. PARKED / DEFERRED**
Anything that was explicitly set aside for later, flagged as "not now," or deliberately deprioritized.

**5. STILL OUTSTANDING**
Anything that was started but not finished, or identified as needed but never created.

**6. CONVERSATION METADATA**
* Conversation title (as it appears in the sidebar)
* Conversation URL (the full https://claude.ai/chat/... link if you can see it)
* Approximate date range of the conversation
* One sentence summary of what this conversation was primarily about

Format your response as a clean document I can copy. Do not editorialize or add commentary. Just the facts.
