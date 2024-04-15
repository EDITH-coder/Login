let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data2")) || [];

let generateItems =()=>{
    return ( shop.innerHTML= shopItemData.map((x)=>{
        let { id, name, desc, price, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        return (`

        <div id= product-id-${id} class="item">
                <img width="220" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id= ${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
                
            </div>
    
        `
    )}).join(""))
};

generateItems();

let increment = (id) => {

        let selectedId = id;
        let search = basket.find((x) => x.id ===selectedId.id);

        if(search === undefined){
            basket.push({
                id:selectedId.id,
                item:1,
            })
        }else{
            search.item += 1
        }

       localStorage.setItem("data2",JSON.stringify(basket));
    update(selectedId.id);

}
let decrement = (id)=>{
    let selectedId = id;
    let search = basket.find((x) => x.id ===selectedId.id);

    if(search===undefined)return;
     else if(search.item === 0) return;
        
    else{
        search.item -= 1
    }

    update(selectedId.id);
    
    basket = basket.filter((x) => x.item !==0);

    localStorage.setItem("data2",JSON.stringify(basket));
    
}

let update = (id)=>{
    
    let search = basket.find((x) =>x.id ===id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation=() =>{
    let cartIcon= document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y ,0)
}
calculation();

//<div id= ${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>

//let basket = JSON.parse(localStorage.getItem("data") || [])