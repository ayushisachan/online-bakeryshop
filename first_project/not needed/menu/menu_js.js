let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Desert Creame Cake',
        tag: 'cake1',
        price: 15,
        inCart: 0
    },

    {
        name: 'Strawberry Tart',
        tag: 'cake2',
        price: 15,
        inCart: 0
    },

    {
        name: 'Eclair Strawberry Cake',
        tag: 'cake3',
        price: 15,
        inCart: 0
    },

    {
        name: 'Sweet Cake Sugar',
        tag: 'cake4',
        price: 15,
        inCart: 0
    },

    {
        name: 'Cake Cuts',
        tag: 'cake5',
        price: 15,
        inCart: 0
    },

    {
        name: 'Panettone Sweet',
        tag: 'cake6',
        price: 15,
        inCart: 0
    }


];



for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalcost(products[i]);
    })
}



function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}



function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }

    setItems(product);


    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems!=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart+=1;
    }else{
        product.inCart=1;
        cartItems = {
            [product.tag]:product
        }
    }

    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalcost(product){
    let cartcost = localStorage.getItem('totalcost');
    

    if(cartcost!=null){
        cartcost = parseInt(cartcost);
        localStorage.setItem("totalcost", cartcost+product.price);
    }else{
        localStorage.setItem("totalcost",product.price);
    }

    
}


function displayCart(){
    let cartItems= localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartcost = localStorage.getItem('totalcost');

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
               <a onclick="delete()"> <ion-icon name="close-circle"></ion-icon></a>
                
                <img src="/img2/${item.tag}.jpg">
                <span>${item.name}</span>
            </div> 
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
                <a onclick="${decrease(item)}">
                <ion-icon name="arrow-back-circle"></ion-icon>
                </a>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle"></ion-icon>
            </div>
            <div class="total">
              $${item.incart*item.price}.00
            </div>     

            `;
        });

        productContainer.innerHTML +=`
            <div class="basketTotalContainer">
              <h4 class ="basketTotalTitle">
                  basket Total
              </h4>
              <h4 class = "basketTotal">
                $${cartcost}.00
              </h4>  
        `;
    }

}

function decrease(item){
    item.incart--;
}

onLoadCartNumbers();
displayCart();