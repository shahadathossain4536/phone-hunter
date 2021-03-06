const error = document.getElementById('error');
let errorMessage = error.innerText;
const spinner = document.getElementById('spinner')
const phonePreDetails = document.getElementById('phone-pre-details')
const phoneFullDetailsCard = document.getElementById('phone-full-details-card')

/* search box and button start */
const searchPhone = () => {
    // console.log('jjjjj')

    const inputValue = document.getElementById('input-value');
    const inputValueText = inputValue.value;
    // console.log(inputValueText)
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.value}`
    console.log(url)
    if (isNaN(inputValue.value) == false) {
        error.innerText = "Please enter text"
        phoneFullDetailsCard.textContent = '';
        inputValue.value = '';

    } else {
        phonePreDetails.textContent = '';
        error.innerText = '';
        phoneFullDetailsCard.textContent = '';
        inputValue.value = '';
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
        document.getElementById('spinner').style.display = 'block'
    }
}
/* search box and button end */





/* display all phone show with card start */
const displayPhone = (phones) => {
    console.log('ggg', phones)


    if (phones.length == 0) {
        document.getElementById('spinner').style.display = 'none'
        error.innerText = "No Phone Found"
        phonePreDetails.textContent = '';

        // alert('55555555555555')
    } else {
        document.getElementById('spinner').style.display = 'none'
        for (const phone of phones) {
            // console.log(phone)
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top mx-auto w-75 py-5" alt="...">
                    <div class="card-body">
                        <h3 class="card-title"> ${phone.phone_name}</h3>
                        <p>Brand: ${phone.brand}</p>
                    </div> 
                    <button onclick="phoneFullDetails('${phone.slug}')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Details
                    </button>
            </div>`
            phonePreDetails.appendChild(div);
        };
    }

};
/* display all phone show with card end */





/* phone full Details button start */
const phoneFullDetails = (id) => {
    // console.log(id)

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneFullDetails(data.data))
}
/* phone full Details button end */




/* Display Phone Full Details Card Start */


const displayPhoneFullDetails = (info) => {
    phoneFullDetailsCard.textContent = '';
    console.log(info)
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <div class="row g-0">
            <div class="col-md-4 mx-auto">
                <img src="${info.image}" class="img-fluid rounded-start " alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-title">${info.name}</h3>
                    <p class="card-text"><small class="text-muted">${info.releaseDate ? info.releaseDate : `NO Release Date Found `}</small></p>
                    <p class="card-text"><span class="fw-bold">Main Features </span></p>
                    <p class="card-text"><span class="fw-bold">ChipSet: </span> ${info.mainFeatures.chipSet}</p>
                    <p class="card-text"> <span class="fw-bold">Display Size:</span> ${info.mainFeatures.displaySize}</p>
                    <p class="card-text"> <span class="fw-bold">Memory: </span> ${info.mainFeatures.memory}</p>
                    <p class="card-text"><span class="fw-bold">Storage: </span> ${info.mainFeatures.storage}</p>
                    <p class="card-text"><span class="fw-bold">Sensors: </span> ${info.mainFeatures.sensors}</p>
                    <p class="card-text"><span class="fw-bold">Other Feature</span></p>
                    <p class="card-text"><span class="fw-bolder">Bluetooth: </span> ${info?.others?.Bluetooth ? info.others.Bluetooth : `No Bluetooth Data Found`}</p>
                    <p class="card-text"> <span class="fw-bolder">GPS: </span> ${info?.others?.GPS ? info.others.GPS : `No GPS Data Found`}</p>
                    <p class="card-text"><span class="fw-bolder">NFC: </span> ${info?.others?.NFC ? info.others.NFC : `No NFC Data Found`}</p>
                    <p class="card-text"><span class="fw-bolder">Radio: </span> ${info?.others?.Radio ? info.others.Radio : `No Radio Data Found`}</p>
                    <p class="card-text"><span class="fw-bolder">USB: </span> ${info?.others?.USB ? info.others.USB : `No USB Data Found`}</p>
                    <p class="card-text"><span class="fw-bolder">WLAN: </span> ${info?.others?.WLAN ? info.others.WLAN : `No WLAN Data Found`}</p>
                </div>
            </div>
        </div>`

    phoneFullDetailsCard.appendChild(div)
}


/* Display Phone Full Details Card End */


