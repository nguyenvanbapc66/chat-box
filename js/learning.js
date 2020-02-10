// // 1. async / await, asynchronous ~ bất đồng bộ, synchronous ~ đồng bộ
// // Đồng bộ là có các dòng code 1, 2, 3  --> nó sẽ chạy từ trên xuống dưới
// // Bất đồng bộ là nó ko chạy 1 rồi đên 2 rồi đến 3, nó chạy ko theo thứ tự

// // callback -----------------------------------------------------------------------

// // function test() {
// //     asyncTask(function() {
// //         console.log('call this function when task end')
// //     })
// // }

// // function asyncTask(callback) {
// //     setTimeout(function() {
// //         console.log('task end')
// //         callback()
// //     }, 5000)
// // }

// // test()

// // Promise (promise hell) ---------------------------------------------------------

// // function test() {
// //     asyncTask()
// //         .then(function() {
// //             console.log('task end')
// //         })
// // }

// // function asyncTask(callback) {
// //     return new Promise(function(resolve) {
// //         setTimeout(resolve, 2000)
// //     })
// // }

// // test()

// // async / await ------------------------------------------------------------------

// // async function test() {
// //     await asyncTask()
// //     console.log('task 1 end')
// //     await asyncTask()
// //     console.log('task 2 end')
// // }

// // test()

// // function asyncTask() {
// //     return new Promise(function(resolve) {
// //         setTimeout(resolve, 2000)
// //     })
// // }


// // 2. try / catch / thorw / error

// // function test() {
// //     let i = -10
// //     try {
// //         console.log(1)
// //         console.log(2)
// //         if (i < 0) {
// //             console.log(3)
// //             let error = new Error('Number i must greater then 0')
// //             throw error
// //         }
// //         console.log('sucess!')
// //     } catch (err) {
// //         console.warn(err)
// //         console.log(6)
// //         console.log(7)
// //     }
// // }

// // test()



// // 1. type
// let a = 1;
// console.log(typeof a) 

// // 2. boolean
// // 3. string

// //.toLowerCase() | .toUpperCase() | .trim() => xóa dấu cách / dấu xuống dòng

// // cắt chuỗi bằng ký tự (.split()/.substring())
// let str = "nguyen van ba";
// str.split(' ') // => cắt theo dấu cách

// let num = "0123456789"
// num.substring(3, 6) // => cắt từ vị trí thứ 3 đến trc vị trí thứ 6
// // 4. number

// 5. object - class, OOP - lap trinh huong doi tuong
// 6. array
// .push() - .pop() >> them/xoa o dau mang
// .shift() - .unshitf() >> them/xoa o cuoi mang
// .find() ~ tra ve phan tu trong mang - .findIndex() - .includes()
// let arr1 = [1, 2, 3]
// arr1.find(function(number){
//     return number % 2 == 0
// })
// let arr2 = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}]
// // arr2.sort(function(o1, o2){
// //     return o1.id - o2.id
// // })
// arr2.sort(function(key1, key2){
//     return key1.id == key2.id
//         ? (key1.name > key2.name ? 1 : key1.name == key2.name ? 0 : -1)
//         : key1.id - key2.id
// })

// map >> duyet cac phan tu
// filter >> loc cac phan tu theo dieu kien

// 7. (condition) ? (value if true) : (value if false)
// 8. destructering
let obj = {
    id: 1,
    name: 'abc'
}
let {id, name} = obj
let newObj = {
    ...obj
}
let newObj1 = {
    ...obj,
    age: 19,
    gender: "female"
}
// 9. arrow function
let sum = (a, b) => a + b