set terminal png
set output "benchmark.png"
set title "ab"
set size 1,1
set grid y
set xlabel "request"
set ylabel "response time (ms)"
plot "out_20" using 9 with lines title "out20", \
    "out_25" using 9 with lines title "out25", \
    "out_30" using 9 with lines title "out30", \
    "out_35" using 9 with lines title "out35"
