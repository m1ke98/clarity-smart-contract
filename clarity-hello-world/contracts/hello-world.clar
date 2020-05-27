;; Storage

(define-data-var counter int 0)

;; Functions

(define-public (say-hi)
   "hello world")

(define-public (increment-number (number int))
   (+ 1 number))

(define-public (increment-number-by-10 (number int))
   (+ 10 number))

(define-public (decrement-number (number int))
   (- number 1))

(define-public (increment-counter)
   (set-var! counter (+ 1 counter)))

(define-public (get-counter)
   (counter))
