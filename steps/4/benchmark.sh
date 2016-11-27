#!/bin/sh

for bench in 10; do
    ab -n 1000 -c $bench -g "out_$bench" "http://localhost:8082/fib/30"
done;

gnuplot plot.p
