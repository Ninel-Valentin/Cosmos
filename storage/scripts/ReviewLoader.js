var reviewsCookie = ReadCookie("reviews");
reviewsCookie = decodeURIComponent(reviewsCookie);
reviewsCookie = JSON.parse(reviewsCookie);

for (reviewJson of reviewsCookie)
    CreateAndAppendReview(reviewJson);

function CreateAndAppendReview(reviewJson) {
    console.log(reviewJson);

    const reviewRow = document.createElement('section');
    reviewRow.className = 'reviewRow';

    const reviewerName = document.createElement('h2');
    reviewerName.className = 'reviewerName';
    reviewerName.innerText = `${reviewJson.dName || `${reviewJson.fName} ${reviewJson.lName}`} says:`;
    reviewRow.appendChild(reviewerName);

    const ratingSection = document.createElement('div');
    ratingSection.className = 'ratingSection';
    let ratingStars = `Rating:`;
    for (let i = 0; i < 5; i++)
        if (i < reviewJson.rating)
            ratingStars +=
                `
        <svg viewBox="0 0 512.001 512.001" class="ratingStar">
            <g>
                <path
                    d="M511.267 197.258a14.995 14.995 0 0 0-12.107-10.209l-158.723-23.065-70.985-143.827a14.998 14.998 0 0 0-26.901 0l-70.988 143.827-158.72 23.065a14.998 14.998 0 0 0-8.312 25.585l114.848 111.954-27.108 158.083a14.999 14.999 0 0 0 21.763 15.812l141.967-74.638 141.961 74.637a15 15 0 0 0 21.766-15.813l-27.117-158.081 114.861-111.955a14.994 14.994 0 0 0 3.795-15.375z">
                </path>
            </g>
        </svg>`;
        else
            ratingStars +=
                `
        <svg viewBox="0 0 512.001 512.001" class="ratingStar">
            <g>
                <path
                    d="M511.266 197.256a14.998 14.998 0 0 0-12.108-10.209l-158.722-23.065-70.984-143.827a15 15 0 0 0-26.902 0l-70.988 143.828-158.719 23.064a15 15 0 0 0-8.313 25.585l114.848 111.955L92.27 482.67a15 15 0 0 0 21.765 15.812L256 423.846l141.961 74.637a14.982 14.982 0 0 0 6.979 1.723 15 15 0 0 0 14.786-17.536L392.61 324.587l114.86-111.954a15 15 0 0 0 3.796-15.377zM366.023 308.608a14.996 14.996 0 0 0-4.314 13.278l23.311 135.898-122.038-64.162a15.004 15.004 0 0 0-13.961 0l-122.045 64.163 23.304-135.9a15.003 15.003 0 0 0-4.313-13.276l-98.731-96.244 136.445-19.829a15 15 0 0 0 11.294-8.205L256 60.685l61.023 123.645a15.002 15.002 0 0 0 11.294 8.206l136.447 19.828-98.741 96.244z">
                </path>
            </g>
        </svg>`;
    ratingSection.innerHTML = ratingStars;
    reviewRow.appendChild(ratingSection);

    const reviewText = document.createElement('p');
    reviewText.className = "reviewText";
    reviewText.innerText = reviewJson.review;
    reviewRow.appendChild(reviewText);

    document.querySelector('main').appendChild(reviewRow);

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