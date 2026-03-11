# Claude Code Artifact Inventory Prompt
# Source: Conversation 44 (Cloud project artifacts inventory)
# URL: https://claude.ai/chat/e621f71d-9bc1-41c4-827c-898138d4044a
# Status: CURRENT
# Notes: Prompt used to ask Claude to inventory all artifacts in a Cloud project (project files + conversations). This is the initial request that kicked off the 43-conversation extraction sweep.

---

## Prompt for Cloud Project Artifact Inventory

Please check the no spend project plan and give me a list of the artifacts that exist in this Cloud project. Not the repo for the no spend apps. But in this Cloud project, feel free to check the project, the project files, the conversations to make sure.

---

## What This Produces

When run in a Claude project, this prompt generates:
1. A numbered list of every file attached to the project (the `/mnt/project/` directory)
2. Cross-references against the project plan and artifact inventory
3. A list of artifacts created inside past conversations that were never saved to project files
4. Identification of what's missing vs what exists

## Key Findings from Running This Prompt
The inventory revealed 27 files in the project, organized as:
- Foundational Strategy Documents (6)
- Strategy and Planning Docs (4)
- GPT Infrastructure (5)
- Project Management and Inventory (5)
- Updated/Active Documents (2)
- Technical and Site Files (4)
- Conversation Archive (1)

It also identified 13+ known conversation artifacts that were never saved to project files, which led to the full 43-conversation extraction sweep using the Conversation Extraction Prompt (artifact 44-2).
