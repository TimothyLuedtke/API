/*!
* Start Bootstrap - New Age v6.0.6 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// ALLOW NESTED FORM FOR ADDING COMPANY

document.addEventListener('DOMContentLoaded', function () {
    // Get the nested form and listen for the submit event
    const addCompanyForm = document.getElementById('addCompanyForm');
    addCompanyForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission
        event.preventDefault();

        // Extract form data and create FormData object
        const formData = new FormData(addCompanyForm);

        // Make an AJAX request to submit the Company form
        try {
            const response = await fetch('/companies/addCompany', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Handle successful submission (e.g., display a success message or close the modal)
                console.log('Company form submitted successfully');
            } else {
                // Handle submission error (e.g., display an error message)
                console.error('Error submitting Company form');
            }
        } catch (error) {
            // Handle network error (e.g., display an error message)
            console.error('Network error submitting Company form', error);
        }

        // Clear the form or close the modal as needed

    });
});

