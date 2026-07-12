# SHU-026 — Draft Mode + Live Preview

**Wave:** 6 (CMS editor experience) · **Depends on:** [[SHU-015]], [[SHU-025]]

## User story

As the site owner, I want to see how a change will look before publishing it
live, so I can catch mistakes without exposing them to visitors first.

## Technical tasks

- Next.js Draft Mode wired to Sanity's Presentation tool (or a simpler
  preview-token route if Presentation is overkill for this project's size).
- `SANITY_API_READ_TOKEN` (placeholder since [[SHU-001]]) put to use for
  authenticated draft-content reads.
- Preview banner visible whenever draft mode is active, with a one-click
  exit back to the published view.
- Draft/preview routes carry `noindex` (feeds [[SHU-019]]).

## Notes / acceptance criteria

- An editor can preview an unpublished change from within Studio without
  it ever being reachable by a search engine or a visitor without the
  preview link.
- Exiting preview mode is a single, obvious action.
- Meets the project [Definition of Done](./DEFINITION-OF-DONE.md).
