# Sakura Village Guard category — implementation plan

**Goal:** Add an adjacent Sakura Village Guard roster to the existing House of Rai character area without altering approved portraits or the existing carousel.

**Source:** Current `index.html` on `benaviv311-eng/raika-website`, 8 Nov 2026.

**Visual references:** Existing site portrait of Rai; user-supplied helmet-and-rope-dart Hikari and archer Yumi; creator-identified shield-and-lightning Gō; a distinctly marked pending portrait for Mamoru. A dark axe warrior from the same archive day may be shown only as an unconfirmed Gō profile variant.

## Steps

- [ ] Verify no guard roster exists (failing structural checks).
- [ ] Convert approved reference files to efficient WebP assets without changing their design.
- [ ] Add one self-contained section directly after House of Rai, using the existing carousel design, five cards, and unique controls.
- [ ] Extend profile data only for guard-specific entries; keep family profiles unchanged.
- [ ] Add a separate carousel controller with navigation, swipe, and reduced-motion behavior.
- [ ] Verify five cards, image references, JavaScript syntax, original House of Rai preservation, and nonduplicated IDs.
- [ ] Publish one commit with the new roster and assets; verify GitHub Pages deployment completes successfully.

## Limits

Gō's name for the shield image is creator-confirmed. Mamoru's standalone portrait is not; mark it pending rather than inventing or assigning an unapproved identity. All names and roles remain editable in a later revision.
