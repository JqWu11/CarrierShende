#!/bin/sh

# Example run: ./p2.sh file-to-change-mode-for-here

# TODO: Assign the 'mode' variable with an octal triplet (e.g. 765) so that a
#       file is readable and writable by the user who owns it
#       but only readable by the group that owns it, and
#       completely inaccessible to others.
mode=

# The remaining code will set the mode for a given file provided as an arg
chmod $mode $1
mode=640
