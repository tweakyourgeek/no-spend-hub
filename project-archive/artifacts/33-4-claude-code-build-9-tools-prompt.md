<!-- Source: Conversation 33 (Building 18 GPTs for No-Spend Collective), Item 33.4 -->
<!-- Status: CURRENT -->

# Instruction Prompt for Claude Code (Build All 9 Tools)

## The Prompt

"Read NO_SPEND_TOOLS_BUILD_SPEC.md and build all 9 tools to my nospend-apps repo. Start with Decision Matrix. Deploy to Vercel as you go."

## Alternative (with project context)

"Read the 'No Spend Collective — Artifact Build Specifications' doc in my project. You already gave me the Exhale style guide. Build and deploy all 9 tools to my nospend-apps repo on Vercel. Start with Decision Matrix."

## Context

The NO_SPEND_TOOLS_BUILD_SPEC.md is a 500+ line build specification containing:
- Complete Exhale design system (colors, typography, spacing, shadows, dark mode patterns)
- Core philosophy (AAL clarity, no shame rules, C3 framework, voice guidelines)
- All 9 tools with detailed specs:
  1. Decision Matrix
  2. Marketing Decoder
  3. Talk Me Out (Impulse Brake)
  4. Subscription Audit
  5. Trigger Decoder Pattern Quiz
  6. No-Spend Meal Planner
  7. Use-What-You-Have Activity Generator
  8. Digital Declutter
  9. Post-Decision Rumination Interrupter
- Build order priority
- Technical requirements
- Quality checklist

## Decision Made

Use Claude Code (not Claude Artifacts) to build the 9 tools. Rationale: Faster deployment, already has infrastructure (nospend-apps repo + Vercel), gets all 9 tools done in under an hour. One-step process vs. two-step (prototype in artifacts then deploy).

## Note

The actual NO_SPEND_TOOLS_BUILD_SPEC.md artifact was created as a downloadable file in this conversation but the content appears as "This block is not supported on your current device yet" in the exported markdown. The spec content itself lives in artifact 31-3 (Artifact Build Specifications from Conversation 32).
