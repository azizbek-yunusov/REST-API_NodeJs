const http = require("http");
const getBodyData = require("./util");
const { v4 } = require("uuid");

let books = [
  {
    id: "1",
    title: "Shaytanat",
    pages: 250,
    author: "Azizbek Yunusov",
  },
];
const server = http.createServer(async (req, res) => {
  // Get
  if (req.url === "/books" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json charset=utf8",
    });
    const resp = {
      status: "OK",
      books,
    };
    res.end(JSON.stringify(resp));
  } else if (req.url === "/books" && req.method === "POST") {
    res.writeHead(200, {
      "Content-Type": "application/json charset=utf8",
    });
    const data = await getBodyData(req);
    const { title, pages, author } = JSON.parse(data);
    const newBook = {
      id: v4(),
      title: title,
      pages: pages,
      author: author,
    };
    books.push(newBook);
    const resp = {
      status: "Created",
      book: newBook,
    };
    res.end(JSON.stringify(resp));
    // get id
  } else if (req.url.match(/\/books\/\w+/) && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json charset=utf8",
    });
    // "regex" macth moslikni tekshiradi string bo'yicha
    const id = req.url.split("/")[2]; // id massiv qaytaradi split borligi uchun
    const book = books.find((b) => b.id === id);
    const resp = {
      status: "OK",
      book,
    };
    res.end(JSON.stringify(resp));
  } else if (req.url.match(/\/books\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[2]; // id 3 chida turadi
    const data = await getBodyData(req);
    const { title, pages, author } = JSON.parse(data);
    const idx = books.findIndex((b) => b.id === id);
    const changedBook = {
      id: books[idx].id,
      title: title || books[idx].title, // agar yangi element kiritilmasa oldingisi olib ketadi
      pages: pages || books[idx].pages,
      author: author || books[idx].author,
    };
    books[idx] = changedBook;
    const resp = {
      status: "OK",
      book: changedBook,
    };
    res.writeHead(200, {
      "Content-Type": "application/json charset=utf8",
    });
    res.end(JSON.stringify(resp));
  } else if (req.url.match(/\/books\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    books = books.filter(b => b.id !== id)
    const resp = {
      status: "DELETED",
    };
    res.writeHead(200, {
      "Content-Type": "application/json charset=utf8",
    });
    res.end(JSON.stringify(resp));
  }
});

server.listen(3000, () =>
  console.log("Server running on port 3000 http://localhost:3000")
);
