let buttonbag = () => {
let cartCounter = 0;


function cartCounter(button) {
    if (button.classList.contains('added')) {
        button.classList.remove('added');
        button.textContent = 'Buy now';
        button.style.border = ' 2px solid #4C3DB2'; 
        button.style.color= '#4C3DB2'
        cartCounter--;
    } else {
        button.classList.add('added');
        button.textContent = 'In the card';
        button.style.border = ' 2px solid #EEEDF5'; 
        button.style.color= '#5C6A79'
        cartCounter++;
    }
    document.getElementById('cart-counter').textContent = cartCounter;   
}
};
export {buttonbag};

