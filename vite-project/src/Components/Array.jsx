import { useState } from "react";

function MyArray() {
  const [array, setArray] = useState(["Banana", "Orange", "Apple", "Mango"]);

  const appendOne = (fruit = "kiwi") =>
    setArray((prevState) => {
      return [fruit, ...prevState];
    });

  return (
    <>
      {array.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <button onClick={() => appendOne("PineApple")}>Push One</button>
    </>
  );
}

export default MyArray;
