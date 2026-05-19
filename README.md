# QuickPasswordGenerator

A UI project for generating secure passwords for the busy user as part of the learn javascript path from Scrimba

Working Title: Passcraft — a privacy-first password & passphrase generator

Tagline: ***“In math, we trust; Strong by default and using (strong pseudo) randomness.”***

## Process Workflow

User chooses:

- password length
- uppercase yes/no
- lowercase yes/no
- numbers yes/no
- symbols yes/no

App returns:

- generated password
- copy button

## Security features

- use crypto.getRandomValues(), not Math.random()
- require at least one character set
- enforce minimum length, maybe 12+
- show strength feedback

## MVP Fucntionality Features

- Generate passwords (length, charset options)
- Entropy score (real calculation, not fake meter)
- Copy to clipboard
- No backend (pure client-side)

## Development Workflow

This project was developed using modern AI-assisted development workflows alongside traditional programming, refactoring, documenting, and debugging practices.

AI tooling was used for:

- code review and refactoring suggestions
- debugging assistance
- Learning-focused approach
- Knowledge checks on concepts used in the code
- generating and improving test cases
- explaining implementation details and security concepts
- accelerating frontend iteration and UI planning
- Defer to resources to specific concepts

The primary focus of this project was understanding and improving the implementation independently while strengthening skills in:

- JavaScript
- secure password generation
- Web Crypto API usage
- DOM manipulation
- frontend architecture
- secure coding practices