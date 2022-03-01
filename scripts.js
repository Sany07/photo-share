


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
        console.log('e');
    }
}

// Function for show data 
const showData = data =>{
    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML=''
    data.forEach((mobile,i) =>{
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
        <button onclick="mobileDetail('${mobile.slug}')" type="button" class="w-100 btn btn-danger text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Explore</button>
        </div>
        </div>`;
    
    resultContainer.appendChild(resultdiv);
    }
})
    
}

// Function for handle phone data

const showMobileDetail = (mobile) =>{

    const mobileDetailSection = document.getElementById('modal-d');
    mobileDetailSection.innerHTML = '';
    const divSection = document.createElement('div');
    divSection.classList.add('modal-content')
    // <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>

    divSection.innerHTML =` 
      <div class="modal-header d-flex justify-content-sc align-items-right">
        <h5 class="modal-title" id="exampleModalLabel"><img class="img-fluid" src="${mobile.image}"></h5>  
        <div class="text-right">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>

        </div>
      <div class="modal-body mt-3">
        <table class="table">
            <tbody>
                <tr>
                    <th scope="row">Brand:</th>
                        <td>${mobile.brand}</td>
                    </tr>
                    <tr>
                    <th scope="row">Name:</th>
                    <td>${mobile.name}</td>
                    </tr>
                    <tr>
                    <th scope="row">Release Date:</th>
                    <td colspan="2">${mobile.releaseDate?mobile.releaseDate:'No Release Date Found'}</td>
                </tr>
            </tbody>
        </table>
        <h4 class="p-2">Features:</h4>
        <table class="table">
            <tbody>
                <tr>
                    <th scope="row">Storage:</th>
                        <td>${mobile.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                    <th scope="row">Display:</th>
                    <td>${mobile.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                    <tr>
                    <th scope="row">Chip Set:</th>
                    <td>${mobile.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                        <th scope="row">Memory:</th>
                        <td>${mobile.mainFeatures.memory}</td>
                    </tr>
                    </tr>  
                    <tr>
                        <th scope="row">Sensors:</th>
                        <td id="sensorID">
                        </td>

                    </tr>
            </tbody>
        </div>
      `
    mobileDetailSection.appendChild(divSection)

    const sID = document.getElementById('sensorID')
    showSensor(mobile.mainFeatures.sensors,sID)

}

const showSensor=(sensors,sID)=>{

    sensors.forEach(sensor =>{
        const sensorSpan = document.createElement('span')

        sensorSpan.innerHTML = `${sensor}, `
        sID.appendChild(sensorSpan)
    })
}