


// function for search phone

const fetchMobileData = async () => {
    const searchData = document.getElementById('search').value
    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML=''
    if(searchData){
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchData}`
        
        try{
            const res = await fetch(url)
            displaySpinner(true);
            const data = await res.json()  
            setTimeout(()=>{
                if(data.status ===true){
                    showData(data.data,searchData);
                }else{
                    displaySpinner(false);
                    displayError('No Result Found')

                }
            },500)          
        }
        catch(e){
            displaySpinner(false);

            displayError('Something went Wrong, Please try again')

        }
    }else{
        displayError('Please Enter Search Text')
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
const showData = (data,searchText) =>{
    displaySpinner(false);

    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML=`<div class="text-center mt-3 fw-bold fs-2">Search Result For: ${searchText.charAt(0).toUpperCase()+searchText.slice(1)}</div>`
    data.forEach((mobile,i) =>{
        if(i<20){
        const resultdiv = document.createElement('div')
        resultdiv.classList.add('col-md-4')
        resultdiv.innerHTML =`<div class="card shadow mt-3">
        <div class="text-center"><img src="${mobile.image}" class="card-img-top p-3 img-fluid  " 
        style="width: 18rem; border-radius: 10px 10px 0 0"
        alt="..."></div>
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
 
    divSection.innerHTML =` 
    <div class="modal-header"> 
        <span class="text-left fs-4"><td class="py-3">${mobile.name}</td></span>
        <span class="text-right">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </span>
    </div>
    <div class="modal-header d-flex justify-content-center align-items-center">
        <h5 class="modal-title" id="exampleModalLabel">
            <img class="img-fluid" src="${mobile.image}">
        </h5>  
    </div>
      <div class="modal-body mt-3">
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th class="py-3" scope="row">Brand:</th>
                    <td class="py-3">${mobile.brand}</td>
                </tr>
                <tr>
                    <th class="py-3" scope="row">Name:</th>
                    <td class="py-3">${mobile.name}</td>
                </tr>
                <tr>
                    <th class="py-3" scope="row">Release Date:</th>
                    <td class="py-3" colspan="2">${mobile.releaseDate?mobile.releaseDate:'No Release Date Found'}</td>
                </tr>
            </tbody>
        </table>
        <h4 class="p-2">Features:</h4>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th class="py-3" scope="row">Storage:</th>
                    <td class="py-3">${mobile.mainFeatures.storage}</td>
                </tr>
                <tr>
                    <th class="py-3" scope="row">Display:</th>
                    <td class="py-3">${mobile.mainFeatures.displaySize}</td>
                </tr>
                <tr>
                    <th class="py-3" scope="row">Chip Set:</th>
                    <td class="py-3">${mobile.mainFeatures.chipSet}</td>
                </tr>
                <tr>
                    <th class="py-3" scope="row">Memory:</th>
                    <td class="py-3">${mobile.mainFeatures.memory}</td>
                </tr>  
                <tr>
                    <th class="py-3" scope="row">Sensors:</th>
                    <td class="py-3" id="sensorID">
                    </td>
                </tr>
            </tbody>
            </table>
            ${ mobile?.others?`
            <table class="table table-striped">
            <h4 class="p-2">Others:</h4>
                <tbody>
                    <tr>
                       <th class="py-3" scope="row">WLAN:</th>
                       <td class="py-3">${mobile.others?.WLAN?mobile.others.WLAN:'N/D'}</td>
                    </tr>
                    <tr>
                        <th class="py-3" scope="row">Bluetooth:</th>
                        <td class="py-3">${mobile.others?.Bluetooth?mobile.others.Bluetooth:'N/D'}</td>
                    </tr>
                    <tr>
                        <th class="py-3" scope="row">GPS:</th>
                        <td class="py-3">${mobile.others?.GPS?mobile.others.GPS:'N/D'}</td>
                    </tr>
                    <tr>
                        <th class="py-3" scope="row">NFC:</th>
                        <td class="py-3">${mobile.others?.NFC?mobile.others.NFC:'N/D'}</td>
                    </tr>
                    <tr>
                        <th class="py-3" scope="row">Bluetooth:</th>
                        <td class="py-3">${mobile.others?.Radio?mobile.others.Radio:'N/D'}</td>
                    </tr>
                    <tr>
                        <th class="py-3" scope="row">Bluetooth:</th>
                        <td class="py-3">${mobile.others?.USB?mobile.others.USB:'N/D'}</td>
                    </tr>
            </tbody>
            </table>
        `:''}
        </div>
      `
    mobileDetailSection.appendChild(divSection)
    const sID = document.getElementById('sensorID')
    showSensor(mobile.mainFeatures?.sensors,sID)
}

// Functionality for handle Sensors Data
const showSensor=(sensors,sID)=>{
    sensors?.forEach(sensor =>{
        const sensorSpan = document.createElement('span')

        sensorSpan.innerHTML = `${sensor}, `
        sID.appendChild(sensorSpan)
    })
}


// Functionality For Error Message

const displayError = (error) =>{
    const messageContainer = document.getElementById('result');

    messageContainer.innerHTML='';
    messageContainer.innerHTML= `<div class="alert alert-danger" role="alert">${error}.
</div>`
}

// Spinner

const displaySpinner = (msg)=>{
    const spinner = document.getElementById('spinner');
    if(msg){
    spinner.classList.remove('d-none')    
    spinner.classList.add('d-block')
}else{
    spinner.classList.remove('d-block')
    spinner.classList.add('d-none')

    }
}