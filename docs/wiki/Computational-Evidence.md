# Computational Evidence with Julia and SageMath

## Status

Julia and SageMath are the project's preferred free and open-source environments for computational evidence. They are intended to support reproducible analyses, proof-of-concepts, and mathematical or cryptographic exploration. The choice of tool must match the claim being supported; a computational result alone is not a formal proof of a system's correctness.

## Tool roles

- **Julia** is used for numerical experiments, simulations, and analyses that benefit from a general-purpose, high-performance language.
- **SageMath** is used for symbolic mathematics, algebra, number theory, and related computations through its integrated open-source environment.

These roles are guidance, not a restriction. A project may use either tool when it provides the clearest, auditable evidence for the question at hand.

## Evidence requirements

Each computational artifact should:

1. State the question, assumptions, inputs, and conclusion.
2. Include the source code or notebook and identify its required Julia packages or SageMath version.
3. Record relevant tool and dependency versions, along with instructions to reproduce the result.
4. Keep generated outputs or expected results where they help a reviewer compare a rerun.
5. Separate measured or computed observations from interpretation and claims of proof.
6. Avoid secrets and private production data; use synthetic or appropriately sanitized inputs.

Reviewers should be able to inspect the source and run the artifact with the documented environment. When exact reproducibility depends on platform, randomness, or external data, document those limits and provide seeds or immutable input snapshots where practical.

## Relationship to ADRs

When an ADR relies on computational evidence, link the artifact from the ADR and explain which claim it supports. A notebook or script supplements the decision record; it does not replace the rationale, alternatives, consequences, or review in the ADR itself.

## Previous proposal

[Evidence Standard: Mathematica](Evidence-Standard.md) records the rejected proposal and why the project chose tools that contributors can access and audit without proprietary licensing.
