# Architecture and Governance Context

Tmura is the documentation engine for Imut. Imut requires a 7-layer data lineage diagram to satisfy governance requirements.

## The Density Problem

Archify fails to render diagrams with more than 12 nodes. As documented in ADR-009, we use a hybrid approach:

- **Archify:** Executive views.
- **draw.io:** Detailed, 28-node faithful diagram.
- **Custom HTML:** Presentation layer.

The client does not adapt to the tool.