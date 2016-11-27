#!/bin/sh

for bench in 10 50 100 150; do
    ab -n 1000 -c $bench -g "out_$bench" "http://localhost:8082/file"
done;

gnuplot plot.p
