const ratingInput = document.getElementById('ratingInput');
const stars = document.querySelectorAll('svg.ratingStar');
stars.forEach(function (element, index) {
    // Add to all stars an event on hover
    element.addEventListener('mouseover', function (e) {
        // Enable all stars before it on hover
        stars.forEach(function (el, i) {
            stars.item(i).querySelector('g:last-child').setAttribute('display', 'none');
        });
        for (var i = 0; i <= index; i++)
            stars.item(i).querySelector('g:last-child').removeAttribute('display');
    });

    // Add to all stars an event on click
    element.addEventListener('click', function (e) {
        // the target is the svg > g > path and we need the parent of the svg
        const clickedIndex = [...e.target.parentElement.parentElement.parentElement.children].indexOf(e.target.parentElement.parentElement);
        ratingInput.value = clickedIndex + 1;
    });
});

document.querySelector('div#ratingStars').addEventListener('mouseout', function (e) {
    // Reset the stars to display the current selected rating
    for (var i = 0; i < stars.length; i++)
        if (i < +ratingInput.value)
            stars.item(i).querySelector('g:last-child').removeAttribute('display');
        else
            stars.item(i).querySelector('g:last-child').setAttribute('display', 'none');
});

function ResetRatingStars() {
    stars.forEach(function (el, i) {
        stars.item(i).querySelector('g:last-child').setAttribute('display', 'none');
    });
}

function SubmitReview(form) {
    if (form.checkValidity()) {
        alert('Thank you for submitting your Review!');
        const saveReview = form.querySelector('#preview').checked;
        if (saveReview)
            WriteReviewToCookie(form);
    }
}

function WriteReviewToCookie(form) {
    const fName = form.querySelector('#firstName').value;
    const lName = form.querySelector('#lastName').value;
    const eMail = form.querySelector('#email').value;
    const dName = form.querySelector('#displayName').value;
    const rating = form.querySelector('#ratingInput').value;
    const review = form.querySelector('#reviewBox').value;

    const data = { fName, lName, eMail, dName, rating, review };

    let reviewCookie = ReadCookie('reviews');
    reviewCookie = decodeURIComponent(reviewCookie);
    reviewCookie = JSON.parse(reviewCookie);
    reviewCookie.push(data);
    reviewCookie = JSON.stringify(reviewCookie);
    reviewCookie = encodeURIComponent(reviewCookie);

    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); // Expires in 1 day
    let expirationDate = d.toUTCString();

    let parsedData = `reviews=${reviewCookie};expires=${expirationDate};path=/`;

    document.cookie = parsedData;
}

function ReadCookie(cookieName) {
    for (let cookie of document.cookie.split(';')) {
        cookie = cookie.trim();
        let [name, value] = cookie.split('=');
        if (name == cookieName)
            return value;
    }
    return "[]";
}