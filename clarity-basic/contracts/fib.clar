(define-map fibs ((key int)) ((val int)))
(define-public (initialize-map)
    (ok
        (begin 
            (map-insert fibs ((1)) ((1)))
            (map-insert fibs ((2)) ((2))))))

(define-public (check-map (input int))
    (ok
        (begin
            (if (true 
                (is-some (map-get? fibs ((key input)))))
                (map-get? fibs ((key input)))))))

(define-private (fibonacci (input int))
    (begin
        (map-insert fibs ((key input))
        ((val (fibonacci (input (- 1)))
        (+ (fibonacci (input (- 2)))))))))

(define-public (get-fibonacci)
    (ok (fibonacci (input))))
