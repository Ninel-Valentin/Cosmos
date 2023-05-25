function ClosePopUp() {
    document.querySelector('div.popUpBackground').setAttribute('style', 'display: none;');
}

function OpenPopUp() {
    document.querySelector('div.popUpBackground').removeAttribute('style');
}