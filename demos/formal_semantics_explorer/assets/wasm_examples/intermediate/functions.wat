;; Function definition and calls

(module
  ;; Simple function that adds two numbers
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )

  ;; Function that squares a number
  (func $square (param $x i32) (result i32)
    local.get $x
    local.get $x
    i32.mul
  )

  ;; Fibonacci function (recursive)
  (func $fib (param $n i32) (result i32)
    (if (result i32)
      (i32.lt_s (local.get $n) (i32.const 2))
      (then (local.get $n))
      (else
        (i32.add
          (call $fib 
            (i32.sub (local.get $n) (i32.const 1)))
          (call $fib 
            (i32.sub (local.get $n) (i32.const 2)))
        )
      )
    )
  )

  ;; Export functions
  (export "add" (func $add))
  (export "square" (func $square))
  (export "fib" (func $fib))
)
