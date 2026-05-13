# QuickPasswordGenerator

A UI project for generating secure passwords for the busy user as part of the learn javascript path from Scrimba

Working Title: Passcraft — a privacy-first password & passphrase generator

Tagline: ***“In math, we trust; Strong by default and using randomness.”***

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
  