# Shizuka's House — interior publication manifest
Updated 2026-11-18. Public website: `locations.html#shizuka-house`.

## Canonical authorizations
The creator approved INT-02 individually on 2026-11-16 and approved INT-01, INT-03, INT-04 conditionally upon positive source continuity QA on 2026-11-16; those conditions were recorded as satisfied. Creator said "הכל מאושר" on 2026-11-18 for the currently discussed artworks and the latest exterior closeup. Approval MUST remain associated with its exact original image; NEVER substitute another AI variant.

## Missing original files — DO NOT invent replacements
- **INT-01** — `shizuka_int01_kaminari_original_composite.png` — 1671 × 941, approved. Original Kaminari portrait from uploaded comic page, literal crop perspective-composited into memorial frame. Not found in current container, Drive search, current public GitHub repo, or currently available Library image inventory.
- **INT-02** — `a_highly_detailed_cinematic_warm_golden_hour_int.png`, image-gen id `f5215633-f0f3-4ddb-a781-37aa600c80fa`, 1672 × 941, individually approved as a reverse view through the shoji. Historic geometry caveat: steps appear ascending outward whereas approved house is above the village path. Do not swap in `shizuka_int02_shoji_closed_alt_v2_16x9.png` (in Library, but an unapproved alternate) or later failed variants. Original approved source bytes not located.
- **INT-03** — `shizuka_int03_memorial_corner_16x9.png` — 864 × 486, approved exact crop of INT-01, rectangle (799,115,1663,601). Can be reconstructed *losslessly* from verified exact INT-01 master, if recovered.
- **INT-04** — `shizuka_int04_tea_table_exact_crop_16x9.png` — 896 × 504, approved exact crop of INT-01, rectangle (420,397,1316,901). Can be reconstructed *losslessly* from verified exact INT-01 master, if recovered.

## Verified existing publication
On 2026-11-18, the site received two approved exterior views `assets/locations/shizuka-house-approach.webp` and `assets/locations/shizuka-house-shoji-entrance.webp`. Sakura Path also received two approved views. Verified from main-branch HTML and git tree. **Interior assets have NOT been uploaded**; avoid a public gallery that falsely implies otherwise.

## Recovery audit 2026-11-18
Inspected actual current container filesystem, Google Drive searches, GitHub site assets, Library file-name searches and Library image metadata listings for 2026-11-15 and 2026-11-16. Found a discarded/unapproved shoji-closed alternate and a distinct earlier generated tatami-room image with noncanonical cushions and unapproved portrait, but not the exact INT-01 or INT-02 sources. The source comic page image `image(20261115-084131).png` is in Library; it is NOT a substitute for the already approved full-room composite. Do NOT claim the source has been recovered or the interior set published.

## Next exact actions
1. Recover precise INT-01 and INT-02 source bytes from original image-generation conversation artifact / owner download / other verified storage (no AI redraw). Match expected dimensions and content.
2. Generate INT-03 and INT-04 by exact pixel crop if needed and verify full array equality against recovered INT-01.
3. Maintain owner-approved INT-02 as-is, disclosing the standing stair-grade QA caveat; do not silently change or replace it.
4. Publish the four verified exact-image files as webp assets, append **INTERIOR** views to existing `#shizuka-house` gallery, preserve the two exterior entries, and verify the repository and website.

## Extended recovery audit — 2026-11-18
- Re-examined the current active filesystem, including /mnt/data and accessible workspace/temp locations. **None** of the four exact original PNG files is present by filename.
- Searched current Google Drive by 'shizuka', 'shizuka_int', and 'kaminari_original_composite': no matching original image asset.
- Queried Library and conversation file inventories, including date-filtered 2026-11-15 and 2026-11-16 images. Found `shizuka_interior_review_board.jpg` (1600x1040), which embeds DOWN-SAMPLED previews of the full room, memorial and tea-table views, and `חדר טטאמי יפני באור שקיעה.png`, a DIFFERENT earlier generated candidate with noncanonical cushions/portrait. These files cannot be substituted for original creator-approved high-resolution full-room and crop images.
- Found `shizuka_int02_shoji_closed_alt_v2_16x9.png` (1672x941), a **separately unapproved alteration**. Do not upload it as approved INT-02. Also found a separate earlier reverse-view generated still `שקיעה בבית שיזוקה: אל שביל הכפר.png` which is not the exact approved INT-02 and cannot substitute.
- Attempted authorized Library raw file materialization for the review board and old tatami candidate, but no raw-byte path was authorized. Visual preview read only. No exact image bytes recovered from Library.
- Searched GitHub site main, branches `artlist-medoshi-costume-transfer-20261114` and `artlist-sairan-reference-20261114`, plus repository commit search. No matching original image assets; prior commits contain descriptive canon logs, not the four missing PNGs.
- Recovered prior-conversation context of approvals and file names, but no source asset bytes or durable image-file IDs. This investigation is **BLOCKED on exact originals**. Preserve approval status, do not regenerate, and do not publish inaccurate substitutes.
- Website's four previously published Sakura Path / Shizuka exterior assets remain intact. Interior section has not been uploaded; no website changes made during this audit.

## Search continuation — approved source bytes (2026-11-18 afternoon)
- Attempted history recovery and personal-context lookup of both exact approved originals, no durable source path or byte-backed media ID found.
- Rechecked mounted current conversation directory and nested paths by filename, no source INT-01/02/03/04 file.
- Searched additional GitHub branches and historical commits. No exact interior image stored in main/history or checked side branches.
- Queried Artlist history: one earlier **unapproved** trial render `01a1de88-6b8a-7953-bc85-135e2c846022` (2026-11-15) was found; it is distinct from creator-approved **ChatGPT imagegen** reverse-view `f5215633-f0f3-4ddb-a781-37aa600c80fa`. Do not publish the Artlist image as INT-02.
- No approved original bytes recovered. Last verified publication remains two approved exterior views only. Preserve original approvals and leave INT-01 through INT-04 unpublished pending exact source recovery.

## Comic-grounded INT-01 re-creation — 2026-11-18
- Creator explicitly authorized re-creating Shizuka's interior scenes if original approved image files cannot be found, using the original comic as visual source. Accessed and visually inspected actual creator-supplied comic panel images in Library: `image(20261115-084052).png`, `image(20261115-084110).png`, `image(20261115-084131).png`. Comic establishes tatami interior, shoji entrance camera-left, gridded window rear-left, modest wooden tea table with teapot/two cups at center, memorial shelf rear-right containing exactly two candles and Kaminari portrait, warm sunset. No living characters in location-only outputs.
- Newly GENERATED IMAGE: `a_highly_detailed_cinematic_warm_lit_japanese_st.png`, image-gen `caa7cf39-3b19-4f52-923d-cfd1134e7491`. **New reconstruction candidate, not pixel-identical to prior approved lost original; NOT YET CREATOR APPROVED or published to the website.** Keeps framed portrait blank to avoid re-designing the canonical Kaminari character. Image source derived from comic staging but includes newly created set dressing and lighting; no claim of exact geometry.
- **DURABLE BACKUP:** uploaded new candidate PNG to Google Drive as `RAIKA_Shizuka_INT01_recreated_candidate_2026-11-18.png` (file id `1G2S6r7-TC73ysxX_NShCZtvL2LcFkhO_`; URL `https://drive.google.com/file/d/1G2S6r7-TC73ysxX_NShCZtvL2LcFkhO_/view`). This is a DRAFT archive, not website publication.
- Next: creator reviews INT-01 image. After approval, lock its geometry and produce INT-02 reverse-view from SAME room; INT-03/04 as exact detail crops. Do not reuse the prior lost-image approval as approval of this new reconstruction.
