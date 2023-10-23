let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

function autoSlide() {
    nextSlide();
}

let intervalId = setInterval(autoSlide, 3000); // Tự động trượt slide sau mỗi 3 giây

showSlide(currentIndex);

const params = new URLSearchParams(window.location.search);
const param1 = params.get('param1');
const param2 = params.get('param2');

console.log(param1);
console.log(param2);
if (param2) {
    const link = document.getElementById('link-current')
    link.innerHTML = `<a href="./ListProduct.html?param1=${param1}">/ ${param1}</a> 
                    <span>/ ${param2}</span>`
} else {
    const tets = document.getElementsByClassName('info_2')[0];
    tets.innerHTML = `/ ${param1}`;

}

function deleteOrder(value) {
    var dataItemsOrder = JSON.parse(localStorage.getItem('savedListProduct'));
    dataItemsOrder.splice(value, 1);
    localStorage.setItem('savedListProduct', JSON.stringify(dataItemsOrder));
    document.getElementById('list-order').innerHTML = dataItemsOrder.length === 0 ?
                    `
                    <img 
                        src="https://bizweb.dktcdn.net/100/360/810/themes/732049/assets/empty-cart.png?1669015697083.png"
                    />`
                    : ''
    renderOrder()
}

function handleUpTotal(index) {
    let dataItemsOrder = JSON.parse(localStorage.getItem('savedListProduct'));
    dataItemsOrder[index].dataApi.quantity += 1;
    dataItemsOrder[index].dataApi.into_money += dataItemsOrder[index].price;
    localStorage.setItem('savedListProduct', JSON.stringify(dataItemsOrder));
    document.getElementsByClassName('total')[index].innerText = dataItemsOrder[index].dataApi.quantity;
    document.getElementsByClassName('price-prs')[index].innerText = dataItemsOrder[index].dataApi.into_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
    let tong = JSON.parse(localStorage.getItem('saveTotalAmount')) + dataItemsOrder[index].price;
    localStorage.setItem('saveTotalAmount', tong);
    document.getElementById('total_amount').innerHTML = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ'
}
function handleDownTotal(index) {
    let dataItemsOrder = JSON.parse(localStorage.getItem('savedListProduct'));
    if (dataItemsOrder[index].dataApi.quantity === 1) {
        document.getElementsByClassName('total')[index].innerText = 1
    } else {
        dataItemsOrder[index].dataApi.quantity -= 1;
        dataItemsOrder[index].dataApi.into_money -= dataItemsOrder[index].price;
        localStorage.setItem('savedListProduct', JSON.stringify(dataItemsOrder));

        document.getElementsByClassName('price-prs')[index].innerText = dataItemsOrder[index].dataApi.into_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
        document.getElementsByClassName('total')[index].innerText = dataItemsOrder[index].dataApi.quantity;
        let tong = localStorage.getItem('saveTotalAmount') - dataItemsOrder[index].price;
        localStorage.setItem('saveTotalAmount', tong);
        document.getElementById('total_amount').innerHTML = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ'
    }


}
function renderOrder() {
    var dataItemsListOrder = JSON.parse(localStorage.getItem('savedListProduct'));
    document.getElementById('list-order').innerHTML=''
    var totalAmount = 0;
    document.getElementById("btn-order").style.display = "none";
    console.log(dataItemsListOrder);
    (dataItemsListOrder | dataItemsListOrder.length !== 0) ?
        dataItemsListOrder.map((item, index) => {
            document.getElementById("btn-order").style.display = "block";
            totalAmount += item.dataApi.into_money;
            document.getElementById('list-order').innerHTML +=
                `
                  <div>
                            <div style="display: flex;">
                                <div style="width: 30%;">
                                    <img src= ${item.image}/>
                                </div>

                                <div style="width: 100%;padding: 0 32px;">
                                    <h3>
                                        ${item.nameProduct}
                                    </h3>
                                    <p style="padding: 16px 0 ;">
                                        Giá : ${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </p>
                                    <div style="display: flex;align-items: center;gap:8px;justify-content:space-between;">
                                        <div>
                                            <h4 style="padding: 8px 0;">
                                                Số lượng:
                                            </h4>
                                            <div style="display: flex;align-items: center;gap:8px;">
                                            <span
                                                onclick="handleDownTotal(${index})"
                                                style="cursor: pointer;width: 30px;background-color: rgba(224, 197, 197,0.5); border-radius: 4px; border: 1px solid rgb(101, 93, 93);">-</span>
                                            <span class="total">
                                                ${item.dataApi.quantity}
                                            </span>
                                            <span 
                                                onclick="handleUpTotal(${index})"
                                                style="cursor: pointer;width: 30px;background-color: rgba(224, 197, 197,0.5); border-radius: 4px; border: 1px solid rgb(101, 93, 93);">+</span>
                                        
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style="padding: 8px 0;">
                                                Màu sắc: 
                                            </h4>
                                            <div style="display: flex;align-items: center;gap:8px;position: relative;" class>
                                                <p
                                                    style="cursor: pointer;text-align: center;width: 60px;background-color: rgba(224, 197, 197,0.5); border-radius: 4px; border: 1px solid rgb(101, 93, 93);">
                                                    ${item.color}
                                                </p>
                                                


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="text-align: end;padding-right: unset;width: 35%;">
                                    <span style=" font-size: 1.4rem;font-weight: 600;color: orange;">
                                        <span class="price-prs">
                                        ${item.dataApi.into_money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
                                        </span>
                                    <br>
                                    <p style="color: orange;">Còn hàng</p>
                                    <div onclick ="deleteOrder(${index})"
                                        style="margin-top: 5%;cursor: pointer;display: flex;padding: 8px 0; align-items: center;justify-content: center;background-color: #212529;">
                                        <i class='bx bx-trash' style="font-size: 22px;padding: 0px 58px;"></i>
                                    </div>
                                </div>
                            </div>
                            <div style="margin: 20px 0;height: 1px;width: 100%;border: 1px; border-style: dashed;" class="col">
                            </div>
                        </div>
        `
        })
        : document.getElementById('list-order').innerHTML = 
                    `
                    <img 
                        src="https://bizweb.dktcdn.net/100/360/810/themes/732049/assets/empty-cart.png?1669015697083.png"
                    />`
    document.getElementById('total_amount').innerHTML = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VNĐ'
    localStorage.setItem('saveTotalAmount', totalAmount);
}

function handleOrder() {

    var dataItemsOrder = JSON.parse(localStorage.getItem('savedListProduct'));
    var array = JSON.parse(localStorage.getItem('savedProductDetail'));
    var configData = {
        nameProduct: array.name,
        price: array.price,
        image: array.image,
        color: array.color[JSON.parse(localStorage.getItem('savedProductColor'))].name,
        dataApi: {
            into_money: array.price,
            product_detail_id: array.id,
            quantity: 1
        }

    }
    if (dataItemsOrder) {
        dataItemsOrder = [...dataItemsOrder, configData]
        localStorage.setItem('savedListProduct', JSON.stringify(dataItemsOrder));
    } else {
        dataItemsOrder = [configData]
        localStorage.setItem('savedListProduct', JSON.stringify(dataItemsOrder));
    }
    window.location.assign("./Cart.html");



    // localStorage.setItem('savedListProduct', JSON.stringify(e.data.name));
    // const data ={
    //     address: "HN",
    //     email: "string@gmail.com",
    //     full_name: "Vũ Tùng",
    //     id: 0,
    //     password: "123456",
    //     phone: "0123456789",
    //     role_id: 1
    // }


    // axios.post("http://localhost:8080/users",data)
    //     .then((e) => {
    //         console.log(e);
    //         console.log(e.data);


    //         // data.innerHTML = 
    //     })
    //     .catch((error) => {
    //         console.error('Đã xảy ra lỗi khi gọi API.', error);
    //     });



}

function renderDetail(value, image) {
    var array = JSON.parse(localStorage.getItem('savedData'));
    var nameProduct = JSON.parse(localStorage.getItem('savedNameProduct'));
    const dataItem = array[value];
    localStorage.setItem('savedProductDetail', JSON.stringify(dataItem));
    localStorage.setItem('savedProductColor', (image));
    // console.log('TTTTTTTTTTTTTTTTT', dataItem.ram.name);4
    document.getElementById('assess-product').innerText = `Đánh giá chi tiết ${nameProduct + ' ' + dataItem.rom.name}`;
    document.getElementById('assess-detail').innerText = dataItem.description;
    document.getElementById('name-product').innerHTML = nameProduct + ' ' + dataItem.rom.name;
    document.getElementById('price-detail').innerText = dataItem.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    // document.getElementById('image-product-detail').innerHTML = `<img width="300" height="180"  style="object-fit: cover;w" src=${dataItem.color[image].image_link} />`;

    let listImage = dataItem.color[image].image_link.split(',');
    console.log('...........', listImage[0]);

    document.getElementById('item-1').innerHTML =
        `
        <img
            src= ${listImage[0]}
            alt="Slide 1">
        `
    document.getElementById('item-2').innerHTML =
        `
        <img
            src= ${listImage[1]}
            alt="Slide 1">
        `
    document.getElementById('item-3').innerHTML =
        `
        <img
            src= ${listImage[2]}
            alt="Slide 1">
        `

    document.getElementById('detail-rom').innerHTML = ''
    array.map((item, index) => {

        document.getElementById('detail-rom').innerHTML += `
        <div 
        onclick="renderDetail(${index},${image})"
        style="align-items: center;text-align: center;padding: 6px 26px;cursor: pointer;background-color:  ${item.id === dataItem.id ? '#E2E5E9' : '#F1F2F4'}">
            <p style="font-size: 0.8rem;font-weight: 600;">${item.rom.name} </p>
            <p style="font-size: 0.8rem;margin-top: 2px;">${item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        </div>`
    })
    document.getElementById('product-color').innerHTML = '';
    dataItem.color.map((item, index) => {

        document.getElementById('product-color').innerHTML +=
            `
            <div 
            onclick="renderDetail(${value},${index})"
            style="cursor: pointer;align-items: center;text-align: center;border: ${index === image ? '1px solid brown' : 'none'};padding-top: 4px;">
                    <img width="48px" height="48px"
                        src=${item.image_link.split(',')[0]} />
                        <p>${item.name}</p>
                </div>
            `
    })


    document.getElementById('table-detail').innerHTML =
        `
            <table class="one-line-border">
                <tr>
                    <th>Màn hình</th>
                    <th>${dataItem.screen}</th>
                </tr>
                <tr>
                    <td>Camera sau</td>
                    <td>${dataItem.camera}</td>
                </tr>
                <tr>
                    <th>Camera Selfie</th>
                    <th>${dataItem.cameraSelf}</th>
                </tr>
                <tr>
                    <td>RAM</td>
                     <td>${dataItem.ram.name}</td>
                </tr>
                <tr>
                    <th>Bộ nhớ trong</th>
                     <th>${dataItem.rom.name}</th>
                </tr>
                <tr>
                    <td>CPU</td>
                    <td>${dataItem.chip}</td>
                </tr>
                <tr>
                    <th>Dung lượng pin</th>
                    <th>${dataItem.battery}</th>
                </tr>
                <tr>
                    <td>Hệ điều hành</td>
                    <td>${dataItem.os.name}</td>
                </tr>
            </table>
    `;
}

function callAPIDetail() {
    const params = new URLSearchParams(window.location.search);
    const param3 = params.get('id_product');
    axios.get(`http://localhost:8080/products/${param3}`)
        .then((e) => {
            localStorage.setItem('savedData', JSON.stringify(e.data.product_detail));
            localStorage.setItem('savedNameProduct', JSON.stringify(e.data.name));
            renderDetail(0, 0)

        })
        .catch((error) => {
            // Xử lý lỗi ở đây
            console.error('Đã xảy ra lỗi khi gọi API.', error);
        });
}



function renderProduct(item, a) {

    console.log('123',);

    return (
        `
                 <div id= ${item.title} class="cart-product col-4 col-md-4" style="gap: 0;"
                >
                    <a style="
                            width: 100%;
                            border-radius: 6px;
                            padding: 10%;
                            padding-bottom: 5%;
                            align-items: center;
                            " 
                            href="./ProductDetail.html?param1=${item.category.name}&param2=${item.branch.name}&id_product=${item.id}"
                            >
                        <img class="img-product"
                            src=${item.image} />
                    </a>
                    <div
                        style="width: 100%;padding: 16px;padding-top: 0;display: flex;flex-direction: column;gap: 6px;">
                        <div>
                            <p style="font-size: 0.9rem;font-weight: 600;color: #474C51;">
                                ${item.name} ${item.product_detail[a].rom.name}
                            </p>
                        </div>
                        <div style="display: flex;border-radius: 4px;background-color: #F1F2F4;justify-content: space-between;"
                            id="detail-rom">

                             ${item.product_detail.map((item_, index) =>
            `                   
                                <div
                                    style="align-items: center;text-align: center;padding: 6px 0;flex: auto;border-radius: 6px;cursor: pointer; background-color:  ${index === a ? '#2C313A' : '#F1F2F4'}">
                                    <p style="font-size: 0.8rem;font-weight: 600;color:${index === a ? 'white' : '#474C51'};"> ${item_.rom.name} </p>
                                </div>
                                 `
        ).join('')}
                        </div>

                        <div>
                            <p style="font-size: 1.1rem;font-weight: 600;color: #EF8573;">
                              
                            </p>
                        </div>
                        <div style="display: flex;flex-wrap: wrap;gap: 8px;">
                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bx-chip'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].chip}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bx-mobile'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].screen.slice(0, 8)}
                                </span>
                            </div>

                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bxs-microchip'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].ram.name}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bxs-hdd'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].rom.name}
                                </span>
                            </div>
                        </div>
                        <a  
                            href="./ProductDetail.html?param1=Điện thoại&param2=SamSung&id_product=${item.id}"
                            style="padding:8px 10px;background-color: #fcb500;width:fit-content;border-radius: 6px;margin-top: 8px;"
                        >
                            <span style="font-size: 1rem;color: white;font-weight: 600;">
                                Mua ngay
                            </span>
                        </a>
                    </div>
                </div>
                    `
    )
}

function callAPI() {
    axios.get("http://localhost:8080/products")
        .then((e) => {
            console.log(e.data);

            let data = document.getElementById('promotion');
            e.data.map((item) => {
                data.innerHTML +=
                    renderProduct(item, 0)
            })
            // data.innerHTML = 
        })
        .catch((error) => {
            console.error('Đã xảy ra lỗi khi gọi API.', error);
        });
}
//   ${ item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") } VNĐ




function renderProductCategory(item, a) {

    return (
        `
                 <div class="cart-product col-3 col-md-3" style="gap: 0;"
                >
                    <a style="
                            width: 100%;
                            border-radius: 6px;
                            padding: 10%;
                            padding-bottom: 5%;
                            align-items: center;
                            " 
                            href="./ProductDetail.html?param1=${item.category.name}&param2=${item.branch.name}&id_product=${item.id}">
    
                        <img class="img-product"
                            src=${item.image} />
                    </a>
                    <div
                        style="width: 100%;padding: 16px;padding-top: 0;display: flex;flex-direction: column;gap: 6px;">
                        <div>
                            <p style="font-size: 0.9rem;font-weight: 600;color: #474C51;">
                                ${item.name} ${item.product_detail[a].rom.name}
                            </p>
                        </div>
                        <div style="display: flex;border-radius: 4px;background-color: #F1F2F4;justify-content: space-between;"
                            id="detail-rom">

                             ${item.product_detail.map((item_, index) =>
            `                   
                                <div
                                   
                                    style="align-items: center;text-align: center;padding: 6px 0;flex: auto;border-radius: 6px;cursor: pointer; background-color:  ${index === a ? '#2C313A' : '#F1F2F4'}">
                                    <p style="font-size: 0.8rem;font-weight: 600;color:${index === a ? 'white' : '#474C51'};"> ${item_.rom.name} </p>
                                </div>
                                 `
        ).join('')}
                        </div>

                        <div>
                            <p style="font-size: 1.1rem;font-weight: 600;color: #EF8573;">
                              
                            </p>
                        </div>
                        <div style="display: flex;flex-wrap: wrap;gap: 8px;">
                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bx-chip'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].chip}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bx-mobile'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].screen.slice(0, 8)}
                                </span>
                            </div>

                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bxs-microchip'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].ram.name}
                                </span>
                            </div>
                            <div style="display: flex; align-items: center;gap: 2px;text-align: left;">
                                <i style="color: #C5CAD3;" class='bx bxs-hdd'></i>
                                <span style="font-size: 0.7rem;">
                                    ${item.product_detail[a].rom.name}
                                </span>
                            </div>
                        </div>
                        <a  
                            href="./ProductDetail.html?param1=Điện thoại&param2=SamSung&id_product=${item.id}"
                            style="padding:8px 10px;background-color: #fcb500;width:fit-content;border-radius: 6px;margin-top: 8px;"
                        >
                            <span style="font-size: 1rem;color: white;font-weight: 600;">
                                Mua ngay
                            </span>
                        </a>
                    </div>
                </div>
                    `
    )
}

function callAPIListProductCategory() {
    axios.get("http://localhost:8080/products/category/1")
        .then((e) => {
            console.log(e.data);

            let data = document.getElementById('list-product-category');
            e.data.map((item) => {
                data.innerHTML +=
                    renderProductCategory(item, 0)
            })
            // data.innerHTML = 
        })
        .catch((error) => {
            console.error('Đã xảy ra lỗi khi gọi API.', error);
        });
}

async function callAPICreateUser() {
    var hoTen = document.getElementById("ho_ten").value;
    var soDienThoai = document.getElementById("so_dien_thoai").value;
    var emailInput = document.getElementById('email').value;
    var diaChi = document.getElementById("dia_chi").value;
    var infoUser = {
        address: diaChi,
        email: emailInput,
        full_name: hoTen,
        id: 0,
        password: '',
        phone: soDienThoai,
        role_id: 2
    }
    // console.log('in',infoUser);

    await axios.post("http://localhost:8080/users", infoUser)
        .then((e) => {
            console.log('sss', e);
            console.log('uuu', e.data);
            localStorage.setItem('user_Info', JSON.stringify(e.data))
        })
        .catch((error) => {
            console.error('Đã xảy ra lỗi khi gọi API.', error);
        });
}


async function callAPICreateOrder() {

    // console.log('in',infoUser);
    let dataBody = JSON.parse(localStorage.getItem('savedListProduct'));
    var dataList = dataBody.map((item) => item.dataApi);
    let user = JSON.parse(localStorage.getItem('user_Info'));
    // console.log(JSON.parse(localStorage.getItem('total_amount')));
    var body = {
        orderDetail: dataList,
        status: 0,
        total_amount: JSON.parse(localStorage.getItem('saveTotalAmount')),
        user_id: user.id
    }
    await axios.post("http://localhost:8080/orders", body)
        .then((e) => {
            console.log('dd',e);
            console.log(e.data);
            localStorage.removeItem('savedListProduct')
            renderOrder();
            // localStorage.setItem('user_Info', JSON.stringify(e.data))
        })
        .catch((error) => {
            console.error('Đã xảy ra lỗi khi gọi API.', error);
        });
}

function openForm() {
    if (document.getElementById("myForm").style.display !== "block") {
        let dataItemsListOrder = JSON.parse(localStorage.getItem('savedListProduct'))
        if (dataItemsListOrder | dataItemsListOrder.length !== 0){
            document.getElementById("myForm").style.display = "block";
            let user = JSON.parse(localStorage.getItem('user_Info'));
            if (user) {
                document.getElementById("ho_ten").value = user.full_name;
                document.getElementById("so_dien_thoai").value = user.address;
                document.getElementById('email').value = user.email;
                document.getElementById("dia_chi").value = user.address;
            } 
        }
       
    } else {
        console.log("123");
        callAPICreateUser();

        callAPICreateOrder();
        alert("Đặt hàng thành công!");
            window.location.href='./Singlemenu.html'
            console.log("1234");
            // localStorage.removeItem('user_Info')
    }
}

function callAPIgetOrder(){

    const id_user = JSON.parse(localStorage.getItem('user_Info'))
    console.log(id_user.id);
    axios.get(`http://localhost:8080/orders/${id_user.id}`)
        .then((e) => {
            // console.log(e.data);

            // let data = document.getElementById('list-order-bill');

            // document.getElementById('user-name').innerText = 'Họ tên: ' + id_user?.full_name;
            // document.getElementById('user-phone').innerText = 'Số điện thoại: ' + id_user?.phone_number;
            // document.getElementById('user-address').innerText = 'Địa chỉ: ' + id_user?.address;
            // document.getElementById('user-email').innerText = 'Email: ' + id_user?.email;
            // e.data.map((item) => {
            //     data.innerHTML +=
            //       `
            //       <div style="padding: 16px;background-color: azure;border-radius: 10px;margin-top: 16px;">
            //                 <div
            //                     style="display: flex;justify-content: space-between;padding-bottom: 8px;border-bottom: 1px solid rgb(158, 139, 139);">
            //                     <span style="font-weight: 600;">
            //                         Đơn hàng
            //                     </span>
            //                     <span style="font-weight: 500;">
            //                         ${item?.status ? 'Đã nhận' : 'Chưa nhận'}
            //                     </span>
            //                 </div>
            //                 <div style="padding-top: 16px;">
            //                     <div style="display: flex;">
            //                         <div style="display: block;width: 78%;">
            //                                 ${item?.order_detail.map((items)=>
            //                                     `
            //                                     <div style="width: 100%;">
            //                                 <div>
            //                                     <div style="display: flex;">
            //                                         <div style="width: 30%;">
            //                                             <img src=${items?.product_detail?.image} />
            //                                         </div>

            //                                         <div style="width: 100%;padding: 0 32px;">
            //                                             <h3>
            //                                                ${items?.product_detail?.name}
            //                                             </h3>
            //                                             <p style="padding: 16px 0 ;">
            //                                                 Giá : ${items?.product_detail?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }
            //                                             </p>
            //                                             <div
            //                                                 style="display: flex;align-items: center;gap:8px;justify-content:space-between;">
            //                                                 <div style="display: flex; align-items: center;gap: 6px;">
            //                                                     <h4 style="padding: 8px 0;">
            //                                                         Số lượng:
            //                                                     </h4>
            //                                                     <span class="total">
            //                                                         ${items?.quantity}
            //                                                     </span>

            //                                                 </div>
                                                   
            //                                             </div>
            //                                         </div>
            //                                         <div style="text-align: end;padding-right: unset;width: 35%;">
            //                                             <span
            //                                                 style=" font-size: 1.4rem;font-weight: 600;color: orange;">
            //                                                 <span>
            //                                                     ${items?.into_money?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }
            //                                                 </span>
            //                                         </div>
            //                                     </div>
            //                                     <div style="margin: 20px 0;height: 1px;width: 100%;border: 1px; border-style: dashed;"
            //                                         class="col">
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                                     `
            //                                 )}
            //                         </div>


            //                         <div style=" width: 30%;align-items: center;text-align: center;">
            //                             <h4>Tổng tiền</h4>
            //                             <h4 style="margin-top: 32px;color: orange;">${item?.into_money?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }</h4>

            //                         </div>
            //                     </div>

            //                 </div>
            //             </div>
            //       `
            // })
            localStorage.setItem('list-order-bill', JSON.stringify(e?.data))
            renderOrderBill(e?.data)
            // data.innerHTML = 
        })
        .catch((error) => {
            console.error('Đã xảy ra lỗi khi gọi API.', error);
        });
}

function filterOrderBill(i){
    const data = JSON.parse(localStorage.getItem('list-order-bill'));
        for(let k =0 ;k<3;k++){
            document.getElementsByClassName('filter')[k].style.backgroundColor = 'rgb(212, 200, 32)'
        }
    if (i === 0 || i === 1){
        document.getElementsByClassName('filter')[i+1].style.backgroundColor = '#00CC66';
        
    } else document.getElementsByClassName('filter')[0].style.backgroundColor = '#00CC66'
    if(i){
      renderOrderBill(data?.filter((item) => (item?.status === i)))  
    }else{
        return renderOrderBill(data)
    }
   
}

function renderOrderBill (e){
    const id_user = JSON.parse(localStorage.getItem('user_Info'))
    let data = document.getElementById('list-order-bill');

    document.getElementById('user-name').innerText = 'Họ tên: ' + id_user?.full_name;
    document.getElementById('user-phone').innerText = 'Số điện thoại: ' + id_user?.phone_number;
    document.getElementById('user-address').innerText = 'Địa chỉ: ' + id_user?.address;
    document.getElementById('user-email').innerText = 'Email: ' + id_user?.email;
    data.innerHTML = '';
    e.map((item) => {
        data.innerHTML +=
            `
                  <div style="padding: 16px;background-color: azure;border-radius: 10px;margin-top: 16px;">
                            <div
                                style="display: flex;justify-content: space-between;padding-bottom: 8px;border-bottom: 1px solid rgb(158, 139, 139);">
                                <span style="font-weight: 600;">
                                    Đơn hàng
                                </span>
                                <span style="font-weight: 500;">
                                    ${item?.status ? 'Đã nhận' : 'Chưa nhận'}
                                </span>
                            </div>
                            <div style="padding-top: 16px;">
                                <div style="display: flex;">
                                    <div style="display: block;width: 78%;">
                                            ${item?.order_detail.map((items) =>
                `
                                                <div style="width: 100%;">
                                            <div>
                                                <div style="display: flex;">
                                                    <div style="width: 30%;">
                                                        <img src=${items?.product_detail?.image} />
                                                    </div>

                                                    <div style="width: 100%;padding: 0 32px;">
                                                        <h3>
                                                           ${items?.product_detail?.name}
                                                        </h3>
                                                        <p style="padding: 16px 0 ;">
                                                            Giá : ${items?.product_detail?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                        </p>
                                                        <div
                                                            style="display: flex;align-items: center;gap:8px;justify-content:space-between;">
                                                            <div style="display: flex; align-items: center;gap: 6px;">
                                                                <h4 style="padding: 8px 0;">
                                                                    Số lượng:
                                                                </h4>
                                                                <span class="total">
                                                                    ${items?.quantity}
                                                                </span>

                                                            </div>
                                                   
                                                        </div>
                                                    </div>
                                                    <div style="text-align: end;padding-right: unset;width: 35%;">
                                                        <span
                                                            style=" font-size: 1.4rem;font-weight: 600;color: orange;">
                                                            <span>
                                                                ${items?.into_money?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                            </span>
                                                    </div>
                                                </div>
                                                <div style="margin: 20px 0;height: 1px;width: 100%;border: 1px; border-style: dashed;"
                                                    class="col">
                                                </div>
                                            </div>
                                        </div>
                                                `
            )}
                                    </div>


                                    <div style=" width: 30%;align-items: center;text-align: center;">
                                        <h4>Tổng tiền</h4>
                                        <h4 style="margin-top: 32px;color: orange;">${item?.total_money?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>

                                    </div>
                                </div>

                            </div>
                        </div>
                  `
    })
}


function submitForm() {
    let userInput = document.getElementById("textInput").value;
    console.log("Bạn vừa nhập: " + userInput);
    // Thực hiện xử lý thông tin người dùng ở đây
    closeForm();
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}


function activeFormLogin(a){
    const user = JSON.parse(localStorage.getItem('user_info'));
  if(a){
        document.getElementById('login').style.display = 'none'
  }else{
      if (!user) {
          window.location.href = './Singlemenu.html'
      } else {
          document.getElementById('login').style.display = 'block'
      }
  }
}


function logOut (){
    localStorage.removeItem('user_Info');
    localStorage.removeItem('savedListProduct');
    window.location.href = './index.html'
}
// 
/*<div style="position: absolute;bottom: -70px; padding: 6px 12px;border-radius: 4px;background-color: white;">
    <p style="padding: 4px 0;cursor: pointer;">Đen</p>
    <p style="padding: 4px 0;cursor: pointer;">Vàng</p>
</div>*/