const clickButton = document.querySelectorAll(".button")
const tbody = document.querySelector(".tbody")
const pbody = document.getElementsByClassName("pbody")
let carrito = []
let pedidos = []
clickButton.forEach(btn => {
    btn.addEventListener('click', addToCartItem)
})

function addToCartItem(event) {
    const button = event.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent; 
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        cantidad: 1,
    }
    addItemCart(newItem)
}


function addItemCart(newItem) {

    const alert = document.querySelector('.alert')
    setTimeout(function() {
        alert.classList.add('hide')
    }, 2000)
        alert.classList.remove('hide')

    const inputElemento = tbody.getElementsByClassName('input__elemento')
    for(let i=0;i<carrito.length;i++){
        if(carrito[i].title.trim() == newItem.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito() {
    tbody.innerHTML = ''
    var i = 1
    carrito.map(item => {
        
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const Content = `
        <th scope="row">${i}</th>
                        <td class="table__productos">
                            <img src=${item.img} alt="" srcset="">
                            <h6 class="title">${item.title}</h6>
                        </td>
                        <td class="table__price">
                            <p>${item.price}</p>
                        </td>

                        <td class="table__cantidad">
                            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                            <button class="delete btn btn-danger">x</button>
                        </td>`
        tr.innerHTML = Content
        i++
        tbody.append(tr)         
        tr.querySelector(".delete").addEventListener('click', removeitemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function renderPedidos() {
    pbody.innerHTML = '<h1>Esto no sirve</h1>'
       
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.price.replace("$", ''))
        Total = Total + precio*item.cantidad
    })
    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeitemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length; i++) {
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
            console.log("Hola mundo")
        }
    }

    const alert = document.querySelector('.remove')
    setTimeout(function() {
        alert.classList.add('remove')
    }, 2000)
        alert.classList.remove('remove')
    tr.remove()
    renderCarrito()
    
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector(".title").textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){
            sumaInput.calue < 1? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value
            CarritoTotal()
        }
    })

}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage =  JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito =  storage;
        renderCarrito()
        
    }
}



