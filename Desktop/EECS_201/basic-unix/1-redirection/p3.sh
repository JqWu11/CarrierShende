#!/bin/sh

# DO NOT MODIFY THE FUNCTION
# As a spoiler for the future, we're declaring a shell function
# that we can call like ow we do with any other program/utility

# Produces the expected spaced out text on standard output, and
# a log message about what's going on standard error
spacetext ()
{
    echo "LOG: Inserting spaces into text stream" 1>&2
    sed -E -e 's/(.)/\1 /g'
}

# ALL MODIFICATIONS TO THE FILE SHOULD BE HERE AND ONWARDS
# TODO: modify the following line to feed it input from the file 'input.dat',
#       save its standard output to 'output.dat', and standard error to 'log.txt'
spacetext < input.dat > output.dat 2> log.txt

