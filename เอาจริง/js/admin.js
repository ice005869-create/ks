let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;
let imageBase64 = "";

/* DOM */
const nameEl = document.getElementById("name");
const priceEl = document.getElementById("price");
const stockEl = document.getElementById("stock");
const categoryEl = document.getElementById("category");
const previewEl = document.getElementById("preview");
const imageFile = document.getElementById("imageFile");
const listEl = document.getElementById("list");
const saveBtn = document.getElementById("saveBtn");

/* 📸 upload */
imageFile.addEventListener("change", (e)=>{
  const file = e.target.files[0];
  if(!file) return;

  if(!file.type.startsWith("image/")){
    alert("ต้องเป็นรูปเท่านั้น");
    return;
  }

  const reader = new FileReader();

  reader.onload = ()=>{
    imageBase64 = reader.result;
    previewEl.src = imageBase64;
  };

  reader.readAsDataURL(file);
});

/* 💾 save */
saveBtn.onclick = ()=>{
  const data = {
    name: nameEl.value.trim(),
    price: priceEl.value,
    stock: Number(stockEl.value),
    category: categoryEl.value,
    image: imageBase64 || "https://via.placeholder.com/300"
  };

  if(!data.name){
    alert("กรุณาใส่ชื่อสินค้า");
    return;
  }

  if(editIndex === null){
    products.push(data);
  }else{
    products[editIndex] = data;
    editIndex = null;
  }

  localStorage.setItem("products", JSON.stringify(products));

  clearForm();
  render();
};

/* ✏️ edit */
function editProduct(i){
  const p = products[i];

  nameEl.value = p.name;
  priceEl.value = p.price;
  stockEl.value = p.stock;
  categoryEl.value = p.category;

  previewEl.src = p.image;
  imageBase64 = p.image;

  editIndex = i;
}

/* 🗑 delete */
function deleteProduct(i){
  if(confirm("ลบสินค้านี้?")){
    products.splice(i,1);
    localStorage.setItem("products", JSON.stringify(products));
    render();
  }
}

/* 🧹 clear */
function clearForm(){
  nameEl.value="";
  priceEl.value="";
  stockEl.value="";
  previewEl.src="";
  imageBase64="";
}

/* 📦 render */
function render(){
  listEl.innerHTML="";

  products.forEach((p,i)=>{
    listEl.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <div>${p.price} ฿</div>
        <div>เหลือ ${p.stock}</div>

        <button class="edit" onclick="editProduct(${i})">แก้ไข</button>
        <button class="delete" onclick="deleteProduct(${i})">ลบ</button>
      </div>
    `;
  });
}

render();