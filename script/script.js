const addProductNode = document.querySelector("#add_product");
let products = [];
addProductNode.addEventListener("submit",event =>{
    event.preventDefault();
    //const {title,price,count}=event.target;
    const title =event.target.title.value;
    const price =+event.target.price.value;
    const count =+event.target.count.value;
    const product={
        title:title,
        price:price,
        count:count
    };
    products.push(product);
    console.log(products);

    rerender();
    event.target.reset();
});
// const product={
//     title:"banan",
//     price:2300,
//     count:7
// };

function createProductCart(title,price,count){
    const containerNode =document.createElement("div");
    const titleNode =document.createElement("p");
    const priceNode =document.createElement("p");
    const countNode =document.createElement("p");
    const buttonNode = document.createElement("button")
    const increaseButton = document.createElement("button");    
    const decreaseButton = document.createElement("button");
    
    containerNode.classList.add("product_cart");
    titleNode.innerText= title;
    priceNode.innerText= price;
    countNode.innerText= count;
    buttonNode.innerText="удалить";
    increaseButton.innerText = "+";    
    decreaseButton.innerText = "-";
    if(products.length === 0){
        containerNode.innerText="товаров нет";
    }
    if(count===0){
        countNode.innerText= "товар закончился";
    }
    containerNode.style.borderColor=count ===0?"#c0392b":"green"
    

    containerNode.append(titleNode,priceNode,countNode,increaseButton, decreaseButton,buttonNode);
    increaseButton.addEventListener("click", () => {        
        countNode.innerText = ++count;        
        rerender();    
    });    
    decreaseButton.addEventListener("click", () => {        
        if (count > 0) {            
            countNode.innerText = --count;            
            rerender();        
        }    });

    buttonNode.addEventListener("click",() => remove(title));
    return containerNode;
}
   const productsNode =document.querySelector(".products");
// const productNode = createProductCart(product.title,product.price,product.count);
// productsNode.append(productNode);
// добавить очистку productsNode

    // пройтись циклом по массиву products и для каждого объекта создать карточку 
    // с продуктом и добавить эту карточку в productsNode
function rerender(){
    const productNode = document.querySelector(".products");
    productNode.innerText="";
    products.forEach(({title,price,count}) => {
        
        if(products.length === 0){
            const noProductNode = document.createElement("div");
            noProductNode.innerText = "Товаров нет";
            productsNode.append(noProductNode);
        }
        const productNode= createProductCart(title,price,count);
        productsNode.append(productNode);
       
    });
}

function remove(title){
    const newProductsArray = products.filter(product => product.title!==title);
    products=newProductsArray;
    rerender();
}



