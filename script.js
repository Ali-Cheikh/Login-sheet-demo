// Get the form and button elements
var formLogin = document.getElementById('loginForm');
var formSingUp = document.getElementById('signupForm');

// show log in form
toggleToLogin.addEventListener('click', function() {
    // Check if the form is currently hidden
    if (formLogin.style.display === 'none') {
        formLogin.style.display = 'block'; // Show the form
        formSingUp.style.display = 'none'; // hide the form
    } else {
        formSingUp.style.display = 'none'; // hide the form
    }
});

// show sign-up form
toggleSignIn.addEventListener('click', function() {
    if (formSingUp.style.display === 'none') {
        formSingUp.style.display = 'block'; // Show the form
        formLogin.style.display = 'none'; // Hide the form
    } else {
        formLogin.style.display = 'none'; // Hide the form
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Function to hide sign-up and login forms
    function hideForms() {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'none';
    }
    // Function to hide login form
    function ShowLogin() {
        document.getElementById('loginForm').style.display = 'block';
    }
    // Function to hide sign-up form
    function hideSignup() {
        document.getElementById('signupForm').style.display = 'none';
    }

    // Function to show dashboard
    function showDashboard() {
        document.getElementById('dashboard').style.display = 'block';
    }

    var google = 'https://script.google.com/macros/s/AKfycbwVHmvvLlfpVXbGHDxTNGKCJbcha7XvITiBKE32jEqtCTx4Y71n-V227hRcfJxUL9oz0Q/exec';

    // Sign up button click event
    document.getElementById('signupButton').addEventListener('click', function (event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Regular expression for email validation
        var emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title:'Wrong email format',
                showConfirmButton: false,
                allowOutsideClick: true,
            });
            return;
        }

        // Regular expression for password validation
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                title:'Wrong Password format',
                showConfirmButton: false,
                allowOutsideClick: true,
            });
            return;
        }

        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            text: 'Signing you up',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
        // Send data to Google Sheets
        fetch(google, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=storeData&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (data) {
                hideSignup();
                ShowLogin();
                Swal.fire(
                    'Success!',
                    'You have successfully signed up.',
                    'success'
                );
            })
            .catch(function (error) {
                console.error(error);
                Swal.fire(
                    'Error!',
                    'An error occurred while signing up. Please try again later.',
                    'error'
                );
            });
    });

    // Login button click event
    document.getElementById('loginButton').addEventListener('click', function (event) {
        event.preventDefault();
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;

        // Regular expression for email validation
        var emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                title:'Wrong email format',
                showConfirmButton: false,
                allowOutsideClick: true,
            });
            return;
        }

        // Regular expression for password validation
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                title:'Wrong Password format',
                showConfirmButton: false,
                allowOutsideClick: true,
            });
            return;
        }

        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            text: 'Logging you in',
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        fetch(google, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=checkCredentials&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)
        })
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function (data) {
                if (data.trim() === "Success") {
                    hideForms();
                    showDashboard();
                    Swal.fire({
                        icon:'Success!',
                        title: 'You have successfully logged in.',
                        text: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: true,
                    });
                    showDashboard(); // Show dashboard upon successful login
                } else {
                    Swal.fire(
                        'Error!',
                        'Incorrect email or password. Please try again.',
                        'error'
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
                Swal.fire(
                    'Error!',
                    'An error occurred while logging in. Please try again later.',
                    'error'
                );
            });
    });
});