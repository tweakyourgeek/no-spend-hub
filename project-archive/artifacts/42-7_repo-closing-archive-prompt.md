<!-- Source: Conversation 42 (No Spend 3 031026), Item 42.7 -->
<!-- Status: REFERENCE -->

# Repo Closing/Archive Prompt

## Version 1 (Original — before learning Claude can't archive repos)

**CLAUDE CODE PROMPT:**

The migration from `nospend` into `no-spend-hub` is confirmed complete. Now close out the source repo.

Do these three things in order:

1. Go to https://github.com/Tweak-Your-Geek/nospend and archive the repository. It should be read-only from this point forward. No deletions.

2. Go to https://github.com/Tweak-Your-Geek/nospend-apps and archive that repository as well. Same thing, read-only.

3. In `no-spend-hub`, confirm that `docs/references/ARCHIVED_REPOS.md` exists and contains both repo URLs and today's date. If it only has one, add the second.

Report back when all three are done.

---

## Version 2 (Revised — repos already archived via GitHub UI)

**CLAUDE CODE PROMPT:**

The `nospend` and `nospend-apps` repos have been archived. Confirm that `docs/references/ARCHIVED_REPOS.md` in `no-spend-hub` exists and contains both repo URLs, their archive date of March 10 2026, and the note that `docs/history/conversations/` holds 37 threads covering the full product development history. If anything is missing, add it and push.
