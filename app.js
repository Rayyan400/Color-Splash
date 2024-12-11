let iconCard = document.querySelector('.shopping');
let closeCard = document.querySelector('.close');
let listCardHTML = document.getElementById('cart');
let Quantity = document.querySelector('.quantity');
let body = document.querySelector('body');
// let btn = document.querySelectorAll('button');

var main = document.getElementById('mainContainer');    


// btn1.addEventListener('click', (o)=>{
//     var itemm = document.createElement('div');

    
// })


var listCards = [];
var cart = [];

iconCard.addEventListener('click', ()=>{
    body.classList.toggle('showCard')
})
closeCard.addEventListener('click', ()=>{
    body.classList.toggle('showCard')
})

var currentSection = "";
const addDataToHTML = () => {
    if(listCards.length > 0){
        listCards.forEach(product => {
            let section;
            let sectionDive ;
            if(currentSection=="" || currentSection != product.name.split(" ")[0])
            {
                section = document.createElement('section');
                section.id = product.name.split(" ")[0]

                sectionDive = document.createElement('div');
                sectionDive.className = "row mt-3"

                Heading = document.createElement('h2');
                Heading.className = "screen mt-5";
                Heading.innerText = product.name.split(" ")[0] + " Paintings";
                currentSection = product.name.split(" ")[0];

                sectionDive.appendChild(Heading);
                section.appendChild(sectionDive);

                main.appendChild(section);

                
            }
            else {
                section = document.getElementById(product.name.split(" ")[0]);
                sectionDive = section.children[0]

            }


             let bigDive = document.createElement('div');
             bigDive.className ="col-md-4";

             let SmallDiv = document.createElement('div');
             SmallDiv.className = "cat-item image-zoom-effect";

             let imgDive = document.createElement('div');
             imgDive.className = "image-holder";

             let img = document.createElement('img');
             img.src = product.image;
             img.className ="product-image img-fluid";
             img.id = "Cartimg";
             imgDive.appendChild(img);

            
             let btnDive = document.createElement('div');
             btnDive.className = "mt-2 m-auto";


             let btn1 = document.createElement('button');
             btn1.className = "btn btn-danger btn-sm rounded-3 p-1 px-5";
             btn1.id = "addCart";
             btn1.innerHTML = "Add to Cart";

            //  btn.onclick = () => {
            //     this.listCardHTML.appendChild(product.image);
            //  }

             btn1.addEventListener('click', (event) => {
                let positionClick = event.target;
                if(positionClick.classList.contains('btn')) {
                    let product_id = product.id;
                    addToCart(product_id);
                }
             });

             btnDive.appendChild(btn1);
             SmallDiv.appendChild(imgDive);
             SmallDiv.appendChild(btnDive);
             bigDive.appendChild(SmallDiv);
             sectionDive.appendChild(bigDive);

            // newCard.id = classList.add('item');
            //items.dataset.id = product.id; 
        })
    }
}

const addToCart = (product_id) => {
    let positionsThisProductCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionsThisProductCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionsThisProductCart].quantity = cart[positionsThisProductCart].quantity + 1;
    }
    // console.log(cart);
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    listCardHTML.innerHTML = "";  // Clear existing cart HTML
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.classList.add('mt-1');
            newCart.dataset.id = cart.product_id;
            let product = listCards.findIndex((value) => value.id === cart.product_id);
            let info = listCards[product];
            if (product) {
                let img = document.createElement('img');
                img.src = info.image;
                img.className = "product-image img-res";  // Add appropriate classes
                newCart.appendChild(img);

                let producName = document.createElement('div');
                producName.classList.add('name');
                producName.innerText = `${info.name}`;
                newCart.appendChild(producName);
                
                let Price = document.createElement('div');
                Price.className = "totalPtice";
                Price.innerText = `${info.price}`;
                newCart.appendChild(Price);

                let cartQuantity = document.createElement('div');
                cartQuantity.className ='quantity';
                newCart.appendChild(cartQuantity);

                let Minus = document.createElement('span');
                Minus.classList.add('minus');
                Minus.innerText = "<";
                cartQuantity.appendChild(Minus);

                let cartNumber = document.createElement('span');
                cartNumber.innerText = `${cart.quantity}`;
                cartQuantity.append(cartNumber);

                let Plus = document.createElement('span');
                Plus.classList.add('plus');
                Plus.innerText = ">";
                cartQuantity.append(Plus);


                listCardHTML.appendChild(newCart);
            }
        });
    }
    Quantity.innerText = totalQuantity;
}


listCardHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.dataset.id;
        console.log(product_id);
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;

            default:
                let valueChange = cart[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    cart[positionItemInCart].quantity = valueChange;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
const initApp = () => {
    //get data from Json
    fetch('painting.json')
    .then(response => response.json())
    .then(data => {
        listCards = data;
        addDataToHTML();

        // get cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();


