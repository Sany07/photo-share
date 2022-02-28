


// function for search phone

const fetchMobileData = async () => {
    const searchData = document.getElementById('search').value

    if(searchData){

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchData}`

        try{
            const res = await fetch(url)
            const data = await res.json()
            if(data.status ===true){
                showData(data.data);
            }else{
                alert(data.status)
            }
        }
        catch(e){
            console.log(e);
        }
    }else{
        alert('Please Enter Search Text')
    }
}

document.getElementById('btn-search').addEventListener('click',fetchMobileData)

// Handle Functionality for mobile Detail
const mobileDetail = async (slug) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`

    try{
        const res = await fetch(url)
        const data = await res.json()
        if(data.status === true){
            showMobileDetail(data.data)
        }

    }catch(e){
        console.log(e);
    }
}

// Function for show data 
const showData = data =>{
    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML=''
    data.forEach((mobile,i) =>{
        console.log(i);
        if(i<20){
        const resultdiv = document.createElement('div')
        resultdiv.classList.add('col-md-4')
        resultdiv.innerHTML =`  <div class="card mt-3">
        <img src="${mobile.image}" class="card-img-top p-3 img-fluid  " 
        style="width: 18rem; border-radius: 10px 10px 0 0"
          alt="...">
        <div class="card-body">
        <p class="card-text">
          <span class="badge bg-info text-white">${mobile.brand}</span>
        </p>
        <h5 class="card-title mb-3">${mobile.phone_name}</h5>
        <button onclick="mobileDetail('${mobile.slug}')" type="button" class="w-100 btn btn-danger text-white">Explore</button>
        </div>
        </div>`;
    
    resultContainer.appendChild(resultdiv);
    }
})
    
}

// Function for handle phone data

const showMobileDetail = (mobile) =>{
    console.log(mobile);
    const mobileDetailSection = document.getElementById('mobile-detail')
    const divSection = document.createElement('div')
    divSection.classList.add('card')
    divSection.innerHTML =`  <div class="card mt-3">
    <img src="${mobile.image}" class="card-img-top p-3 img-fluid  " 
    style="width: 18rem; border-radius: 10px 10px 0 0"
      alt="...">
    <div class="card-body">
    <p class="card-text">
      <span class="badge bg-info text-white">${mobile.brand}</span>
    </p>
    <h5 class="card-title mb-3">${mobile.phone_name}</h5>
    <button onclick="mobileDetail('${mobile.slug}')" type="button" class="w-100 btn btn-danger text-white">Explore</button>
    </div>
    </div>`

    mobileDetailSection.appendChild(divSection)
}