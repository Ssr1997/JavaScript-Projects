// Select the hamburger menu element using the class 'hamburger'
const hamburger =  document.querySelector('.hamburger');

// Select the unordered list (ul) that contains the navigation links, using the class 'ul'
const ul = document.querySelector('.ul');

// Add a click event listener to the hamburger element
hamburger.addEventListener('click', ()=>{
    
    // Toggle the 'ham_active' class on the ul element when the hamburger is clicked
    ul.classList.toggle('ham_active');
    
    // Get the first child element of the hamburger (the icon inside the hamburger button)
    let ham_child = hamburger.firstElementChild;
    
    // Check if the ul now has the 'ham_active' class after toggling
    if(ul.classList.contains('ham_active')){
        
        // If 'ham_active' is present, replace the icon from 'fa-bars' (hamburger icon) to 'fa-xmark' (close icon)
        ham_child.classList.replace('fa-bars','fa-xmark');
    }
    else{
        
        // If 'ham_active' is not present (menu closed), replace the icon from 'fa-xmark' (close icon) back to 'fa-bars' (hamburger icon)
        ham_child.classList.replace('fa-xmark','fa-bars');
    }
});
