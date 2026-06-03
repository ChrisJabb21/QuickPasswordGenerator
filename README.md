# QuickPasswordGenerator

A web app project for generating secure passwords via Cryptographically Secure Pseudorandom Number Generation (CSPRNG)
useful for the busy user needing a hard to guess password for a password manager
made as part of the learn javascript path from Scrimba

Title: SecurePassCraft — a privacy-first password & passphrase generator

Tagline: ***“In math or cryptography, we trust for security; ”***

## Process Workflow

App returns:

- generated password (default password of 20 characters with symbols, letters, and numbers)

## Security features

- use crypto.getRandomValues(), not Math.random()
- enforce minimum length, 12+ characters
- show strength feedback

## MVP Fucntionality Features

- Generate passwords
- No backend (pure client-side)

## Enchancements and WIP
- Ability to let user choose and customize any of following:
  - password length (no less than 8 characters as per recommended password strength and best practices)
  - uppercase yes/no
  - lowercase yes/no
  - numbers yes/no
  - symbols yes/no
- Copy to clipboard
- Entropy score (real calculation, not fake meter)
- Generate multiple passwords at once (at least 2)

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
- Secure password generation
- Web Crypto API usage
- DOM manipulation (Vanilla JavaScript at the moment)
- Frontend architecture (applying responsive web design)
- Secure coding practices
