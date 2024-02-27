// Load the phone elements from another website using API fetch
const loadPhone = async(searchText) => {
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

// Display the phone elements to the UI
const displayPhones = phones => {
    // To show elements on display follow the 4 steps below
    // step-1: get the element where you want to set the new elements
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone container cards before adding new cards
    phoneContainer.textContent = '';

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
            <div class="card-actions justify-end">
            <button class="btn btn-primary text-white">Buy Now</button>
            </div>
        </div>
        `
        // step-4: append child to the parent div
        phoneContainer.appendChild(phoneCard);
        
    });
    
}

// handle search button
const handleSearch = () => {
   const searchField = document.getElementById('search-field');
    searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

loadPhone();