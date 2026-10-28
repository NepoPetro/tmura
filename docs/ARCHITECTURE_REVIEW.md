# Architecture Review: Tmura Data Lineage and Governance Platform

**Author:** Senior Data Architect & Governance Tech Lead
**Date:** October 2026
**Status:** Approved for next phase

## 1. Executive Summary

Tmura (formerly Archify-Bridge) has successfully completed its initial construction phase. Conceived as a satellite project of Imut (1DFlfRMH), Tmura solves a critical governance requirement: producing verifiable, traceable, and visually professional data lineage diagrams.

This review evaluates the current architecture, the decisions recorded in ADRs 001 through 009, and proposes the formal verification and infrastructure standards for the next phase. The architecture is approved, with a strategic shift towards fully open-source, auditable mathematical verification tools.

## 2. Governance & Compliance Assessment

The current architecture demonstrates a strong commitment to data governance:

*   **Traceability:** The interactive portal and individual ADRs provide a clear audit trail of every engineering decision.
*   **Integrity:** The multi-layer cryptographic design (bcrypt for passwords, SHA-256 for chained audit logs, ECDSA for digital signatures) ensures non-repudiation.
*   **Tool Scoping:** ADR-009 correctly identifies the limits of Archify and implements a hybrid approach, preventing the tool from dictating the architectural truth.

**Assessment:** The governance baseline is solid. The next step is to formalize the verification of these cryptographic guarantees mathematically.

## 3. Formal Verification Standard (Julia + SageMath)

**Decision:** Replace proprietary tools (Mathematica) with an open-source, auditable stack.

*   **SageMath** will be the primary engine for cryptographic simulation and formal proofs (e.g., verifying elliptic curve operations, validating the SHA-256 chain integrity).
*   **Julia** will be used for orchestrating tests, validating infrastructure constraints, and scripting the evidence generation.

**Rationale:** As a governance lead, the evidence must be verifiable by anyone without licensing costs. Julia and SageMath provide the mathematical rigor required for fintech/legaltech compliance (e.g., GDPR, Ley 25.326).

## 4. Infrastructure as Code (IaC) Proposal

**Decision:** Adopt open-source, vendor-neutral IaC tools.

*   **OpenTofu** (MPL 2.0) is selected over Terraform Cloud for its open governance.
*   **Pulumi** (Apache 2.0) is an acceptable alternative for teams preferring general-purpose languages over HCL.

**Governance Integration:** All IaC deployments must pass "Policy as Code" checks (using Open Policy Agent or Pulumi CrossGuard) to enforce security invariants. The PoC will include an experimental deployment on AWS/Azure, but the primary pipeline will remain cloud-agnostic.

## 5. Risks & Mitigations

*   **Risk:** Polyglot complexity (Node.js, Python, Julia, SageMath).
    *   *Mitigation:* Containerize the verification environment using Docker.
*   **Risk:** SageMath community dependency.
    *   *Mitigation:* Pin specific versions in the CI/CD pipeline and document fallback procedures.

## 6. Roadmap for Issue #9 (IaC)

1.  Create a Proof of Concept (PoC) with OpenTofu.
2.  Write Julia scripts to validate network topology constraints.
3.  Attach the PoC evidence to the new ADR-010 (Formal Verification Standard).
