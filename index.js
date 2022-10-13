const http = require("http")

const books = [
  {
    id: "1",
    title: "Shaytanat",
    pages: 250,
    author: "Azizbek Yunusov"
  }
]
const server = http.createServer((req, res) => {
  
})

server.listen(3000, () => console.log("Server running on port 3000 http://localhost:3000"))