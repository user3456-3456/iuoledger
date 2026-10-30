# IOU Ledger(I OWE U)

A simple website for keeping track of money you have lent or borrowed, so nothing gets forgotten.

## The problem
People lend and borrow small amounts of money from friends and family, then forget who owes what. That leads to awkward conversations. IOU Ledger keeps everything in one clear list.

## What it does
- Add an IOU with a person, amount, direction (they owe me / I owe them), an optional due date and a note
- Search and filter all IOUs by name, direction and status
- Mark an IOU as paid or unpaid, or delete it
- A dashboard shows the total owed to me, the total I owe, the net balance and the 5 newest IOUs

## Pages
- index.html - Dashboard
- ious.html - All IOUs
- add.html - Add IOU

## Technologies
HTML, CSS and JavaScript only (no frameworks). Data is saved in the browser with localStorage.

# How to run
1. Download or clone this repo
2. Open index.html in a browser, or use the Live Server extension in VS Code

## Known issues to solve later
- Data is stored in the browser only, so clearing browser data or using another device means it is gone
- An IOU cannot be edited after saving. Delete it and add it again(need to figure that out)
- Amounts are in Ksh only(need to figure this out also)


Live site: https://user3456-3456.github.io/iuoledger/