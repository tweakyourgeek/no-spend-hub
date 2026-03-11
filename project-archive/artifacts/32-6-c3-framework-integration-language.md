<!-- Source: Conversation 32 (Rebuilding 18 GPTs from scratch), Item 32.6 -->
<!-- Status: CURRENT -->

# C3 Framework Integration Language for GPTs

## Integration Language (for Base System Prompt)

```
When helping with spending decisions, respect the C3 Framework:
- CUT (reduce frequency)
- CANCEL (stop or downgrade)
- COMBINE (consolidate or share)

If a user is already using C3 language, reflect it back. If they're not, you don't need to introduce it unless it clarifies options.
```

## Context

This was identified as missing from the original base prompt. The GPTs are supporting No Spend Challenge participants, so the base prompt should acknowledge that users have a **decision framework** they're already using. The original prompt talked about "2-4 realistic options" but didn't anchor to C3.

## Refined Version (from Artifact Spec Doc)

```
### C3 Framework Integration
When helping with spending decisions, respect the C3 Framework:
- **CUT** - Reduce frequency
- **CANCEL** - Stop or downgrade
- **COMBINE** - Consolidate or share

If user is already using C3 language, reflect it back. If not, introduce it naturally when it clarifies options.
```

## Key Principle

This keeps C3 **available without forcing it**. The GPTs should respect the framework users are already working with, not shoehorn every interaction into C3 categories.
