# QuickPasswordGenerator

A security-focused password generator built with the Web Crypto API. This project demonstrates cryptographically secure randomness, rejection sampling to eliminate modulo bias and secure password generation best practices. Useful for the busy user needing a hard to guess password for a password manager. Adapted from project to create on my own from the learn javascript path from Scrimba.

TLDR; A web app project for generating secure passwords via Cryptographically Secure Pseudorandom Number Generation (CSPRNG).

Title: SecurePassCraft - a privacy-first password & passphrase generator

Tagline: ***“In math or cryptography, we trust for security; ”***

## Process Workflow

App returns:

- Generated strong password
  - default password of 16 characters with symbols, letters (uppercase and lowercase), and numbers

## Security features

- use of crypto.getRandomValues(), not Math.random()

## Minimum Viable Project (MVP) Fucntionality Features

- Generate passwords
- Responsive UI with color palette
- Rejection sampling to solve issue of modulo bias
- No backend (pure client-side)

## Work-In-Progresss (WIP) Roadmap

- Ability to let user customize how the password is made based on following criteria:
  - password length (Ability to show recommended password strength based on best practices)
  - uppercase yes/no
  - lowercase yes/no
  - numbers yes/no
  - symbols yes/no
- ~~Copy to clipboard~~
- Entropy score 
- Generate multiple passwords at once (at least 2)

## Development Workflow

This project was developed using modern AI-assisted development workflows alongside traditional programming, refactoring, documenting, and debugging practices.

AI tooling was used for:

- code review and refactoring suggestions
- debugging assistance
- Learning-focused approach and vetting LLM output
- Knowledge checks for developer on concepts used in the code
- generating and improving test cases
- accelerating frontend iteration and UI planning
- Defer to resources for understanding specific concepts and room for improvement

The primary focus of this project was understanding and improving the implementation independently while strengthening skills in:

- JavaScript
- Secure password generation
- Web Crypto API usage
- DOM manipulation (Vanilla JavaScript at the moment)
- Frontend architecture (applying responsive web design)
- Secure coding practices
- Git workflows
