Country Assignment Automation for SSUNS 2017

Prerequisites: node, npm

Run:
npm install will install dependencies
npm install -g grunt-cli



Inputs:
Registration forms (export from website, in JSON form)
CSV of schools in priority order
CSV of countries in priority order, with committees


TO DO:

Parse gives JSON Obj:
{
School: { NumDels:##, GA: [...], SA: [...], CRI: [...]}
}
where GA, SA, CRI is an array of the school's preferences.


We need:
Countries in order of priority + number of slots per country
Schools in order of priority

Config variable:
spread: x


ex. Sh1, Sch2, Sch3, Sch4, Sch5
ex. Cou1, Cou2, Cou3, Cou4, Cou5

x == 2

Thus, for Sch3, range is [Sch3.loc - x, Sch3.loc + x] == [0, 4]
Of these, we will randomly select any Country with positions<=remainingNumberOfDels and assign it to the school. Then, remove it from the list of countries

Checks:

Duplicates,
Have a least 1 of their preferred committees

Additions:
Swap() -> asks for school, then countries; gives a list of potential swaps(same number of positions). Then, asks for index; will swap countries
