// Load the phone elements from another website using API fetch
const loadPhone = async(searchText= '13', isShowAll) => {
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

// Display the phone elements to the UI
const displayPhones = (phones, isShowAll) => {
    // To show elements on display follow the 4 steps below
    // step-1: get the element where you want to set the new elements
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // Show the "Show All" button using condition
    const showMoreBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showMoreBtn.classList.remove('hidden');
    }
    else{
        showMoreBtn.classList.add('hidden');
    }
    // show first 12 phone item if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        console.log(phone);
        // step-2: create a div where all the elements will inserted
        const phoneCard =document.createElement('div');
        phoneCard.classList = 'card bg-gray-200 shadow-xl';
        // step-3: set the elements as inner.HTML to the div
        phoneCard.innerHTML = `
        <figure><img class="mt-5" src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center mt-5">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
            </div>
        </div>
        `
        // step-4: append child to the parent div
        phoneContainer.appendChild(phoneCard);   
    });
    
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// handle show details and show modal
const handleShowDetail = async(id) => {
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

// Function for show the modal
const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img class="ml-36 mb-2" src="${phone.image}" alt="">
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory: </span>${phone?.slug}</p>
    <p><span class="font-bold">Release Date: </span>${phone?.mainFeatures?.releaseDate}</p>
    <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>


    
    `

    // Show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
   const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner =(isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// Handle show all button
    const handleShowAll = () => {
        handleSearch(true);
    }


loadPhone();