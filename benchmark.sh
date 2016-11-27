#!/bin/sh

for bench in 20 25 30 35; do
    ab -n 100 -g "out_$bench" "http://localhost:8082/fib/$bench"
done;

gnuplot plot.p
