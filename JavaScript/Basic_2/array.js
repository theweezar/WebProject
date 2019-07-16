function ExampleArray(){
  let arr = [1,2,3,4,5,6,7,8,9];
  console.log("\n\n\n                   Array Part                    ");
  console.log("Example : "); console.log(arr);
  console.log("Array có 1 số phương thức hoạt động tương tự như string");
  let str = "123456";
  console.log("Trick để tách chuỗi '123456' thành 1 mảng array gồm [1,2,3,5,6]: [...str] ");
  console.log([...str]);
  console.log(`arr.includes(5): ${arr.includes(5)}`); // hoạt động tương tự như string, sẽ return về 1 giá trị boolean
  // nếu có số 5 hay là ko
  console.log(`arr.every(...): ${arr.every(el => {return el === 0})}`); // phương thức này sẽ return 1 giá trị true nếu
  // như toàn bộ phần tử trong array này đều === nhau, và false nếu có ít nhất 1 phần tử khác
}

ExampleArray();
