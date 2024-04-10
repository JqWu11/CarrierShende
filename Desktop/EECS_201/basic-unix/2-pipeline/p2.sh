#!/bin/sh

# Use the following commands in a pipeline to generate a sorted list of students
# from a file containing assignment grades inside of the file 'grades'. There
# should be no repeats in the output.
# In the 'grades'  file, there are three columns as well as a header line.
# Column 1 is the assignment name, column 2 is the student, and column 3 is
# the grade.

# command: tail -n +2 grades
# description: This will print out the file from line 2 and onwards. The data
#              provided has a header line, so we want to get lines 2 and onwards
#              to get the actual names.

# command: uniq
# description: This will take the inputted lines and omit repeated, adjacent lines.
#              For example, if we see the following input
#                   hello
#                   hello
#                   hello
#              uniq will print out only
#                   hello

# command: sort
# description: This will sort the provided input

# command: awk '{print $2}'
# description: awk is a program that interprets the awk programming language,
#              designed for manipulating textual data. In this provided command,
#              the argument '{print $2}' (include the single quotes)
#              is written in the awk programming language and prints out
#              the second field (separated by whitespace) of a given line
#              i.e. isolates the second column of the input.
#              For example, the text
#                   "1   Bob    Alice"
#                   "1   Matt   Kelly"
#                   "1   Jonas  Rachel"
#              will result in
#                   Bob
#                   Matt
#                   Jonas
#              being printed out.
#              awk will process each line of input provided to it.

# TODO: write your pipeline below
tail -n +2 grades | awk '{print $2}' | sort | uniq
