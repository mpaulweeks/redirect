#!/bin/bash

OUTPUT="$(cksum package.json)"
OUTPUT="$OUTPUT $(cksum pkg/api/package.json)"
OUTPUT="$OUTPUT $(cksum pkg/fe/package.json)"
echo $OUTPUT
