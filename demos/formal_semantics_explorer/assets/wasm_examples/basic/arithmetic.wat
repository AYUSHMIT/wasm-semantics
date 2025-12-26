;; Basic arithmetic operations in WebAssembly

;; Simple addition
(i32.const 5)
(i32.const 7)
(i32.add)
;; Stack: [12]

;; Subtraction
(i32.const 10)
(i32.const 3)
(i32.sub)
;; Stack: [12, 7]

;; Multiplication
(i32.const 4)
(i32.const 5)
(i32.mul)
;; Stack: [12, 7, 20]

;; Division
(i32.const 20)
(i32.const 4)
(i32.div_u)
;; Stack: [12, 7, 20, 5]
