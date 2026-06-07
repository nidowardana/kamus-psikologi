# Editorial Guidelines

## Kamus Psikologi Indonesia

Version: 0.1

---

# 1. Purpose

This document defines the editorial conventions used throughout the Kamus Psikologi Indonesia.

Its purpose is to ensure that entries remain consistent regardless of when they are created or edited.

When in doubt, follow these guidelines unless a later version of this document supersedes them.

---

# 2. General Principles

1. Entries should be written in clear Indonesian.
2. Definitions should prioritize meaning over translation.
3. Metadata should contain data, not presentation.
4. Similar terms should be described using similar wording and structure.
5. Definitions should be concise but sufficiently informative.
6. Every factual claim should be traceable to a source.

---

# 3. Entry Identification

Each entry must have a unique identifier.

Example:

term_id: abnormal

Rules:

* Use lowercase letters.
* Use hyphens when necessary.
* Avoid spaces.
* The identifier should remain stable even if the title changes.

---

# 4. Titles

Titles use standard Indonesian orthography.

Example:

title: Abnormal

Rules:

* Capitalize the first letter.
* Do not include part of speech.
* Do not include field information.

Disambiguated entries follow KBBI-style numbering.

Examples:

Kesadaran (1)
Kesadaran (2)

---

# 5. English Equivalents

English equivalents belong inside the relevant sense.

Example:

english:

* Abnormal

Rules:

* List the most common equivalent first.
* Use multiple equivalents only when necessary.
* Do not include explanations in this field.

---

# 6. Parts of Speech

Use abbreviated forms.

Approved values:

* noun = nomina
* verb = verba
* adj = adjektiva
* adv = adverbia
* pron = pronomina

Always store as a list.

Example:

class:

* adj

---

# 7. Categories

Categories describe the type of concept.

Examples:

* konsep
* teori
* aliran
* fenomena
* kondisi
* proses
* tokoh
* metode
* instrumen
* intervensi
* anatomi

Store as a list.

---

# 8. Fields

Fields describe the psychological subdiscipline.

Examples:

* umum
* psi-klinis
* psi-sosial
* psi-pendidikan
* psi-io
* psi-perkembangan
* psi-biokognitif
* psi-kepribadian
* psikometri
* metodologi
* filsafat

Store as a list.

---

# 9. Definitions

Each sense should contain one definition.

Example:

definition: >
Tidak biasa; luar biasa; menyimpang dari keadaan normal.

Rules:

* Write in complete Indonesian.
* Avoid circular definitions.
* Avoid unnecessary jargon.
* Prefer neutral wording.
* Do not include HTML.
* Use plain text only.

---

# 10. Examples

Examples demonstrate usage.

Example:

example: >
Hasil pemeriksaan menunjukkan tingkat kecemasan yang {abnormal}.

Rules:

* Use natural Indonesian.
* Prefer real-world contexts.
* The target term should be marked using curly braces.

Markup:

{term}

Example:

Ia menunjukkan perilaku yang {abnormal}.

The website may later render marked terms as italics, links, tooltips, or other visual elements.

---

# 11. Usage Notes

Usage notes are optional.

Use them when:

* a term is controversial,
* a translation is disputed,
* a term is obsolete,
* usage differs across subfields.

Example:

usage_note: >
Dalam neuropsikologi, istilah ini sering digunakan secara lebih sempit.

---

# 12. Etymology

Origins should identify the source language and original form.

Example:

origin:

* language: Latin
  original: abnormis

Multiple origins may be listed when necessary.

---

# 13. Related Terms

Related terms should contain entry identifiers.

Example:

related:

* norma
* deviasi

Do not include explanatory text.

---

# 14. Aliases

Aliases contain alternative spellings or names.

Example:

aliases:

* abnormalitas

Do not include translations.

---

# 15. References

References should point to entries in the reference database.

Example:

references:

* hasan_1981

References belong to the sense they support.

---

# 16. Status

Approved values:

* established
* new
* reviewed
* debated
* obsolete

Definitions:

established
: Official or widely used in Indonesian.

new
: Newly introduced, suggested, or experimental.

reviewed
: Reviewed by community or subject experts.

debated
: Usage or meaning remains contested.

obsolete
: No longer recommended for current use.

---

# 17. Dates

Use ISO 8601.

Example:

date_added: 2026-06-04
last_modified: 2026-06-04

Format:

YYYY-MM-DD

---

# 18. HTML Policy

HTML should generally not appear inside entry metadata.

Avoid:

<i>abnormal</i> <br>

Preferred:

{abnormal}

and plain paragraph text.

The website templates should control visual presentation.

---

# 19. Future-Proofing

Metadata should describe meaning rather than appearance.

Good:

{abnormal}

Bad:

<i>abnormal</i>

Good:

related:

* norma

Bad:

related:

* "<a href='/norma'>Norma</a>"

The database should remain usable even if the website design changes.

---

# 20. Editorial Principle

When uncertain:

Prefer consistency over perfection.
