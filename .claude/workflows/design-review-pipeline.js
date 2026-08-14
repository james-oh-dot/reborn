export const meta = {
  name: 'design-review-pipeline',
  description: 'Sequential design -> UX -> UI -> GUI/motion -> dev -> QA review pass over Rebornsoft WIP changes',
  whenToUse: 'Run after a UI/UX change lands in work_in_progress/prototype, to get a role-by-role review before treating the change as done.',
  phases: [
    { title: 'Design' },
    { title: 'UX' },
    { title: 'UI' },
    { title: 'GUI/Motion' },
    { title: 'Dev' },
    { title: 'QA' },
  ],
}

const target = (args && args.target) || 'the current changes in work_in_progress/prototype (check git status/diff to see what changed)'
const notes = (args && args.notes) || ''

phase('Design')
const designSpec = await agent(
  `Target: ${target}\nExtra context: ${notes}\n\nReview this against the site's information architecture and section-role boundaries (AGENTS.md, docs/canonical/). Confirm no section duplicates another section's purpose, and no EVIDENCE_LEDGER status distinction (CONTRACTED/DELIVERED/MOU/etc.) was blurred. Report findings in under 200 words: pass/concerns.`,
  { agentType: 'design-lead', label: 'design-lead' }
)

phase('UX')
const uxSpec = await agent(
  `Target: ${target}\n\nPrior design review:\n${designSpec}\n\nReview the interaction model: triggers (hover/click/scroll), state transitions, desktop/mobile parity, keyboard and screen-reader access. Report findings in under 200 words: pass/concerns.`,
  { agentType: 'ux-flow', label: 'ux-flow' }
)

phase('UI')
const uiSpec = await agent(
  `Target: ${target}\n\nPrior UX review:\n${uxSpec}\n\nReview visual styling: does it reuse existing CSS tokens/utility classes in css/site.css, does it hold the site's restrained dark B2B tech tone, is hierarchy built with size/weight/spacing before color. Report findings in under 200 words: pass/concerns.`,
  { agentType: 'ui-visual', label: 'ui-visual' }
)

phase('GUI/Motion')
const guiSpec = await agent(
  `Target: ${target}\n\nPrior UI review:\n${uiSpec}\n\nReview motion/transition/parallax behavior against Apple HIG motion principles: purposeful, transform/opacity-only, ease-out timing, immediate feedback (<100ms start), interruptible, full prefers-reduced-motion coverage, no scroll-jank. Report findings in under 200 words: pass/concerns. Do not edit files in this pass — report only.`,
  { agentType: 'gui-motion', label: 'gui-motion' }
)

phase('Dev')
const devReport = await agent(
  `Target: ${target}\n\nAll prior reviews:\nDesign: ${designSpec}\nUX: ${uxSpec}\nUI: ${uiSpec}\nGUI: ${guiSpec}\n\nVerify the actual code matches these reviews. Check image-loading-rule compliance (no raw .jpg/.png in <img src>, no loading="lazy", absolute-stacked preview+full). Report concrete file:line findings, under 300 words. Do not edit files in this pass — report only.`,
  { agentType: 'frontend-dev', label: 'frontend-dev' }
)

phase('QA')
const qaVerdict = await agent(
  `Target: ${target}\n\nAll prior reports:\nDesign: ${designSpec}\nUX: ${uxSpec}\nUI: ${uiSpec}\nGUI: ${guiSpec}\nDev: ${devReport}\n\nGive a final pass/reject verdict. List concrete issues ranked by severity (critical/recommended), each with file path and what to fix. Check for cross-page CSS class collisions with grep before flagging a naming issue.`,
  { agentType: 'qa-review', label: 'qa-review' }
)

return { designSpec, uxSpec, uiSpec, guiSpec, devReport, qaVerdict }
