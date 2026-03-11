<!-- Source: Conversation 45 (Artifact recovery project checklist), Item 45.1 -->
<!-- Status: CURRENT -->

# Claude Code Artifact Inventory Prompt (for Parsing Exported Markdowns)

I'm going to give you a folder of exported conversation transcripts as markdown files. Your job is to go through every conversation and do the following:

For each conversation, identify:
1. Every artifact that was actually created (code blocks presented as artifacts, React components, markdown documents, HTML files, spreadsheets, anything)
2. Every item that should have been an artifact but was delivered inline as a code block or chat text
3. Any file that was referenced by name but never actually produced

For each item found, record:
- Conversation file name
- Item name or best description
- Type (artifact, should-have-been-artifact, referenced-but-missing)
- A one-line description of what it contains
- Whether it appears to be superseded by something in a later conversation (flag if you can tell, don't guess if you can't)

Output a single markdown file called `CLAUDE_CODE_ARTIFACT_INVENTORY.md` with everything organized by conversation in chronological order.

Do not evaluate content quality. Do not summarize. Do not make decisions about what should be kept. Just inventory what exists and flag what's missing. I will make all keep/discard decisions.

The project files directory also contains reference documents. Do not inventory those, only the conversation transcripts.
