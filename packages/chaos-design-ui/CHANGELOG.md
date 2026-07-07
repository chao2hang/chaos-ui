# chaos-design-ui

## 0.2.0

### Minor Changes

- feat(stories): add ~271 new Storybook stories covering all UI, layout, mobile, and business components

  - B1: 56 UI component stories (long-tail + provider/generic/mobile)
  - B2: 12 layout stories
  - B3: 24 mobile stories (4 missing + 20 split from aggregate)
  - B4: 153+ business subdomain stories (chat, charts, mobile-business, print/attachment, approval/workflow, finance/billing, auth, messaging, dialogs, nav, CRUD, data-display, pickers, forms, orders, inventory, badges, files, dashboard, maps, misc)

  fix(audit): resolve C4-C5 barrel issues, F2 CSS token references, and barrel consistency

  test(G2): add 26 missing component tests (2 UI + 12 business + 12 mobile)

  chore: sync regenerated docs files, config fixes, and audit report
