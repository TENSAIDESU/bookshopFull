let loader = () => {
const API_Key='AIzaSyDszvaaBOPGUYhjJ5L2m_OvNUPs6U6CH78';
const GET_COUNT_BOOKS= 6;
let currentStep = 0;
let currentSubject = document.querySelector('.link').getAttribute('data-category');


const useRequestBooks =(subject, start, count) => {
return fetch (`https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&key=${API_Key}&printType=books&startIndex=${start}&maxResults=${count}&langRestrict=en`)
.then((response)=> {
  return response.json();
})
.then((json) => {
  return json['items'];
})
.catch(() => {console.log(error)});
}

const getAndShowBooks = async () => {
  let books = await useRequestBooks (currentSubject, currentStep * GET_COUNT_BOOKS, GET_COUNT_BOOKS);

  currentStep++

  books.forEach((book) =>{
    let img = book.volumeInfo.imageLinks?.thumbnail ?? './imgslider/place-holder.png';
    let authors = book.volumeInfo?.authors ?? 'No authors';
    let title = book.volumeInfo.title;
    let description = book.volumeInfo.description ?? 'no describtion';
    
    let saleability = book.saleInfo.saleability;
    let price = "No for sale";
    let priceType = "";
    let rev = ` reviews`;
    let ratingsCount = book.volumeInfo?.ratingsCount ?? '';
    if (ratingsCount) {
        ratingsCount = book.volumeInfo.ratingsCount + rev;
    }
 

    if(saleability === "FOR_SALE"){
      price = book.saleInfo.retailPrice?.amount;
      priceType = book.saleInfo.retailPrice?.currencyCode;
    }
    const newBook = `
    <div class="card_item" id="${book.id}">
    <div class ="card_item__image"><img class="holder" src="${img} "></div>
      <div class="desribtion">
         <div class="card_item__author">${authors}</div>
        <div class="card_item__title">${title}</div>
          <div class="rating"> 
        <div class="stars">
<img src="./imgslider/gray.png" class="gray-star">
<img src="./imgslider/gray.png" class="gray-star">
<img src="./imgslider/gray.png" class="gray-star">
<img src="./imgslider/gray.png" class="gray-star">
<img src="./imgslider/gray.png" class="gray-star">
</div>
<div class="card_item-count">${ratingsCount}<span></span></div>
        </div>
        <div class="card_item__desribtion">${description}</div>
        <div class="price">
        <div class="card_item__price">${price}</div>
        <div class="card_item__priceType">${priceType}</div>
        </div>
      <button class="buybtn" id="${book.id}">Buy now</button> 
      </div>
    `
    document.querySelector('.card').innerHTML += newBook;


let rating = Math.floor(book.volumeInfo.averageRating);

let stars = document.querySelectorAll('.gray-star'); 

for (let i = 0; i < rating; i++) {
  stars[i].src = './imgslider/gold.png';
}
  })
}

const buttons = Array.from(document.querySelectorAll('.buybtn'));
const container = document.querySelector('.cart-counter');

buttons.forEach(button => {
if (Object.prototype.hasOwnProperty.call(localStorage, button.id)) {
    button.classList.add("added");
    button.innerHTML = "IN THE CART";
}

let bagItems = `<div class="items-number">${Object.keys(localStorage).length}</div>`;
if (Object.keys(localStorage).length > 0) {
    container.innerHTML = bagItems;
}
let cartCounter = 0;
button.addEventListener("click", () => {
    const idName = button.id;
    if (!button.classList.contains("added")) {
    button.innerHTML = "IN THE CART";
    button.classList.add("added");
    localStorage.setItem(idName, button.id);
    cartCounter--;
    } else if (button.classList.contains("added")) {
    button.innerHTML = "BUY NOW";
    button.classList.remove("added");
    localStorage.removeItem(idName, button.id);
    cartCounter++;
    }
    bagItems = `<div class="items-number">${Object.keys(localStorage).length}</div>`;
    container.innerHTML = bagItems;
    if (Object.keys(localStorage).length == 0) {
    container.innerHTML = " ";
    }
    document.getElementById('cart-counter').textContent = cartCounter;   
});
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('link')) {
    document.querySelector('.link.active')?.classList.remove('active');
    event.target.classList.add('active');
    document.querySelector('.card').innerHTML='';
      currentSubject = event.target.innerText;
     getAndShowBooks()
  }
  if (event.target.classList.contains('btn')){
    getAndShowBooks()
  }
})
};
export { loader };

