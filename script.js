const fetchBooks = () => {
  fetch(" https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((books) => {
      console.log(books);
      const carrello = []
      books.forEach(e => {
        carrello.push(e)
      })
      const row = document.getElementsByClassName("row")[0];

      books.forEach((element) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
            <div class="card mb-3" id="${element.asin}" style="width: 18rem;">
  <img src="${element.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">Price: ${element.price} $</p>
    <a href="#" class="btn btn-danger deleteBtn">Delete</a>
  </div>
</div>`;
        row.appendChild(col);

    });
    const deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach(e => {
        e.addEventListener("click", e => {
            const card = e.target.closest(".card")
            console.log(card.id)
            e.target.closest(".col").remove();
           const id = books.findIndex(e => {
               return e.asin === card.id
            })

            carrello.splice(id, 1)
            console.log(id)
            console.log(carrello)
            const span = document.getElementsByClassName("badge")[0];
            span.innerHTML = carrello.length;
        })
    })
})
.catch(error => {
    console.log(error)
})

};
fetchBooks();
