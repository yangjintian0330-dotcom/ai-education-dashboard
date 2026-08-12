# School Dashboard Flywheel Focus Design

## Goal

Remove the duplicated top KPI strip from the school dashboard and make the center flywheel the single visual source of truth for the four school-level AI metrics.

## Layout

- Keep the school title, date range, return link, and fullscreen control in the header.
- Remove the top `.metrics` section entirely.
- Expand the three-column content grid to fill the released vertical space while preserving the no-scroll 900px canvas.
- Keep the left AI-capability panel, center flywheel, right teacher rankings, and bottom query feed.

## Flywheel

- Retain the sequence: 使用老师数 → AI 对话次数 → AI 生成任务数 → 内容沉淀数 → 使用老师数.
- Use four large stationary data cards around a thicker segmented ring.
- Give every card a distinct accent matching its ring segment, a large number, unit, step number, and short label.
- Use four visible clockwise arrows and a subtle rotating light sweep to explain direction without moving the cards.
- Enlarge the center core copy while keeping the ring readable.

## Data Behavior

- `setRange(days)` remains the only source of metric values.
- Update flywheel values directly from the computed period values in the order teachers, dialogues, tasks, resources.
- Remove the hidden dependency on the deleted top metrics and the related mutation observer.
- Preserve stage tooltips and date-range interaction.

## Verification

- Confirm no `.metrics` section remains in school markup.
- Confirm all four flywheel values update after changing the date range.
- Confirm the page remains 900px tall with no global scrollbar.
- Run the existing school dashboard regression tests and visual inspection.
