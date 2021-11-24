# Avoiding Common Attacks

## SWC-101 Integer Overflow and Underflow
Automatically true because of use of Solidity 0.8.

## SWC-102 Outdated Compiler Version
Currently, used compiler contains no vulnerabilities.

## SWC-103 Floating pragma
Specific compiler pragma 0.8.10 used in contracts to avoid accidental bug inclusion through outdated compiler versions.

## SWC-108 State Variable Default Visibility
All state variables have declared visibility.

## SWC-111 Use of Deprecated Solidity Functions
None of functions presented in SWC-111 isused.

## SWC-115 Authorization through tx.origin
Contracts aren't usign `tx.origin` at all.

## SWC-119 Shadowing State Variabels
None of inherited variables is shadowed.


