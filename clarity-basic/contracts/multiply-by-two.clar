;; Storage
;; Define the data to be changed by multiplier
(define-data-var multiply int 1)

;; Constant
;; Define a constant of two to be used as the multiplier
(define-constant two 2)

;; Multiply
;; Function which multiplies the data by two
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

;; Getter
;; Return the data value
(define-public (get-multiply)
    (ok (var-get multiply))
)