;; Storage
(define-data-var multiply int 1)

;; Constant
(define-constant two 2)

;; Multiply
(define-public (multiply-number)
    (begin 
        (var-set multiply
            (* (var-get multiply) two)
        )
        (ok
            (var-get multiply)
        )
    )
)

(define-public (get-multiply)
    (ok (var-get multiply))
)