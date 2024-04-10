#!/bin/sh

# Use the following commands in a pipeline to generate a sorted list of the most
# popular baby names in 2022 as reported by the US Social Security Agency,
# supplied in the file 'baby_names'
# ** You may only use these three commands and the pipe operator | **
# Source: https://www.ssa.gov/OACT/babynames/

# command: tail -n +2 baby_names
# description: This will print out the file from line 2 and onwards. The data
#              provided has a header line, so we want to get lines 2 and onwards
#              to get the actual names

# command: sort
# description: This will sort the provided input

# command: awk '{print $2; print $3}'
# description: awk is a program that interprets the awk programming language,
#              designed for manipulating textual data. In this provided command,
#              the argument '{print $2; print $3}' (include the single quotes)
#              is written in the awk programming language and prints out
#              the second field and the third field (separated by whitespace)
#              of a given line, onto separate lines. For instance, the text
#                   1   Bob    Alice
#                   2   Tyler  Sophia
#              will result in
#                   Bob
#                   Alice
#                   Tyler
#                   Sophia
#              being printed out.
#              awk will process each line of input provided to it.

# TODO: write your pipeline below
tail -n +2 baby_names | sort | awk '{print $2; print $3}'

