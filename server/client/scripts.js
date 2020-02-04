const socket = io("http://localhost:3000");

socket.on("data", myData => {
  console.log(myData);
});
