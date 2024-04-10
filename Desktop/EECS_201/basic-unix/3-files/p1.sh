#!/bin/sh

# Example run: ./p1.sh file-to-change-mode-for-here

# TODO: Assign the 'mode' variable with an octal triplet (e.g. 765) so that a
#       file is readable, writable, and executable by the user who owns it, and
#       only readable and executable for everyone else
#       (i.e. group and other)
mode=

# The remaining code will set the mode for a given file provided as an arg
chmod $mode $1
mode=755
