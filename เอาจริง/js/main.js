let products = JSON.parse(localStorage.getItem("products")) || [];
let currentFilter = "all";
let searchText = "";

/* =======================
   RENDER (หน้าหลัก)
======================= */
function renderProducts(){
  const list = document.getElementById("product-list");
  if(!list) return;

  list.innerHTML = "";

  let data = currentFilter === "all"
    ? products
    : products.filter(p => p.category === currentFilter);

  // search
  if(searchText){
    data = data.filter(p =>
      p.name.toLowerCase().includes(searchText)
    );
  }

  data.forEach((p)=>{
  list.innerHTML += `
    <div class="product-card">
      <img src="${p.image || p.img || 'https://via.placeholder.com/300'}">

      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="price">${p.price} บาท</div>
        <div class="stock">เหลือ ${p.stock || 0}</div>
      </div>
    `;
  });
}

/* =======================
   FILTER
======================= */
function setFilter(type){
  currentFilter = type;
  renderProducts();
}

/* =======================
   SEARCH
======================= */
function handleSearch(text){
  searchText = text.toLowerCase();
  renderProducts();
  renderSuggestions(text);
}

function selectSuggestion(name){
  document.getElementById("search").value = name;
  searchText = name.toLowerCase();

  document.getElementById("suggestions").style.display = "none";

  renderProducts();
}

function renderSuggestions(text){
  const box = document.getElementById("suggestions");
  if(!box) return;

  if(!text){
    box.style.display = "none";
    return;
  }

  let result = products.filter(p =>
    p.name.toLowerCase().includes(text.toLowerCase())
  );

  box.innerHTML = "";

  result.slice(0,5).forEach(p=>{
    box.innerHTML += `
      <div class="suggestion-item" onclick="selectSuggestion('${p.name}')">
        ${p.name}
      </div>
    `;
  });

  box.style.display = "block";
}

/* =======================
   INIT
======================= */
renderProducts();