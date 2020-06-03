# KonfHub-Assignment

## Displaying the conferences in human readable format

The conferences are of two main types: Paid and Free

The most important details of conference are displayed:

 - Conference Name
 - City
 - State
 - Country
 - Conference Start Date
 - Conference End Date
 - Registration URL
 

## Finding Exact Duplicates

To find the exact duplicates, each Conference object is compared based on the key-values.

> duplicate[]

This array stores the duplicates.

## Finding Semantic Duplicates

Semantic duplicates can have varying values for most keys, except ConferenceID and Start date.

These two object properties are used for identifying the semantic duplicates
