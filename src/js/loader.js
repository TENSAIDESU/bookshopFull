let loader = () => {
const API_Key='AIzaSyDszvaaBOPGUYhjJ5L2m_OvNUPs6U6CH78';
const GET_COUNT_BOOKS= 6;
let currentStep = 0;
let currentSubject = document.querySelector('.link.active').innerText;
const container = document.querySelector('.cartCounter');
const storage = JSON.parse(localStorage.getItem('cart') ?? '[]');


const useRequestBooks =(subject, start, count) => {
return fetch (`https://www.googleapis.com/books/v1/volumes?q=${subject}&key=${API_Key}&printType=books&startIndex=${start}&maxResults=${count}&langRestrict=en`)
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
    let img = book.volumeInfo.imageLinks?.thumbnail ?? './src/images/imgslider/place-holder.png';
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
<img src="./src/images/imgslider/gray.png" class="gray-star">
<img src="./src/images/imgslider/gray.png" class="gray-star">
<img src="./src/images/imgslider/gray.png" class="gray-star">
<img src="./src/images/imgslider/gray.png" class="gray-star">
<img src="./src/images/imgslider/gray.png" class="gray-star">
</div>
<div class="card_item-count">${ratingsCount}<span></span></div>
        </div>
        <div class="card_item__desribtion">${description}</div>
        <div class="price">
        <div class="card_item__price">${price}</div>
        <div class="card_item__priceType">${priceType}</div>
        </div>
      <button class="buybtn ${storage.includes(book.id) ? 'added' : ''}" id="${book.id}">${storage.includes(book.id) ? 'IN THE CARD' : 'Buy now'}</button> 
      </div>
    `
    document.querySelector('.card').innerHTML += newBook;


let rating = Math.floor(book.volumeInfo.averageRating);

let stars = document.querySelectorAll('.gray-star'); 

for (let i = 0; i < rating; i++) {
  stars[i].src = './src/images/imgslider/gold.png';
}
  })
}

  const cartCounterNumber = () => {
    if (storage.length == 0) {
      container.innerHTML = " ";
      } else  {
    const  bagItems = `<span class="itemsnumber">${storage.length}</span>`;
      container.innerHTML = bagItems;
    }
  }
  
cartCounterNumber();
getAndShowBooks();
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
  
  if(event.target.classList.contains('buybtn')){       
    const button = event.target
  const idName = button.id;
    if (!button.classList.contains("added")) {
    button.innerHTML = "IN THE CART";
    button.classList.add("added");
    storage.push(idName)
    } else  {
    button.innerHTML = "BUY NOW";
    button.classList.remove("added");
    if(storage.includes(idName)){
  storage.splice(storage.indexOf(idName), 1)
    }
    }

localStorage.setItem('cart', JSON.stringify(storage))
cartCounterNumber();
 }
})}
export { loader }

