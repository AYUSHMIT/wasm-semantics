;; Control flow examples

;; Simple if-then-else
(i32.const 1)
(if (result i32)
  (then (i32.const 10))
  (else (i32.const 20))
)
;; Result: 10

;; Nested conditionals
(i32.const 0)
(if (result i32)
  (then 
    (i32.const 5)
  )
  (else
    (i32.const 1)
    (if (result i32)
      (then (i32.const 15))
      (else (i32.const 25))
    )
  )
)
;; Result: 15

;; Block with branch
(block $exit (result i32)
  (i32.const 100)
  (br $exit)
  (i32.const 200)  ;; unreachable
)
;; Result: 100
