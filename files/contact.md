# Section: Reach Out (Contact + Workflow + FAQ)

## Purpose
Closing section of the homepage: show how the person works (process), let visitors message them, and pre-answer common questions.

## Layout
- Eyebrow: "Skills · Workflow · Identity"
- Heading: "Reach Out"
- Three stacked sub-blocks: Workflow Strip → Contact Form → FAQ Accordion

## Sub-block: Workflow Strip
- Horizontal (wraps on mobile) row of process step labels, presented as connected nodes/pills:
  `IDEA → PLAN → AI HELP → CODE → REVIEW → TEST → LEARN`
- Purely decorative/informative — communicates working process at a glance.

## Sub-block: Contact Form
- Fields: Name, Email, Message (textarea)
- Submit button: "Send Message"
- Minimal styling matching card system (dark input fields, accent focus ring)
- Client-side validation; submit via email service / form backend (e.g. Formspree, Resend, or a serverless function)

## Sub-block: FAQ Accordion
- 5 collapsed questions, click/tap to expand answer:
  1. How can I get this portfolio's source code?
  2. What's your educational background?
  3. What technologies do you usually work with?
  4. What's your favorite programming language?
  5. Can we collaborate on a hackathon, project, or other work?
- Only one open at a time (accordion behavior), chevron/plus icon rotates on expand.

## Interaction
- Workflow nodes: subtle hover highlight, no click action needed (or link to a "how I build" page).
- Form: inline validation messages, disabled submit state while sending, success/error toast on submit.
- FAQ: smooth height-expand animation (~250–300ms).

## Data Needed
```json
{
  "workflowSteps": ["IDEA", "PLAN", "AI HELP", "CODE", "REVIEW", "TEST", "LEARN"],
  "formEndpoint": "",
  "faqs": [
    {"q": "How can I get this portfolio's source code?", "a": ""},
    {"q": "What's your educational background?", "a": ""},
    {"q": "What technologies do you usually work with?", "a": ""},
    {"q": "What's your favorite programming language?", "a": ""},
    {"q": "Can we collaborate on a hackathon, project, or other work?", "a": ""}
  ]
}
```
