const gallery = document.getElementById('gallery');

// Create function fetchData which returns a response from url in json format
function fetchData(url){
    return fetch(url)            
            .then(response => response.json())
            .catch(error => console.log('Looks like there was a problem', error));
}
// call function fetchData
fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
        generateCard(data.results);
        overlay(data.results);
    });

// display 12 randomly generated users
function generateCard(data) {        
    let studentHtml = ``;    
    data.forEach(student => {
        studentHtml += `<div class="card"><div class="card-img-container">`;
        studentHtml += `<img class="card-img" src="${student.picture.large}"
        alt="profile picture"></div>`;
        studentHtml += `<div class="card-info-container">`;
        studentHtml += `<h3 id="name" class="card-name cap">${student.name.first} ${student.name.last}</h3>`;
        studentHtml +=`<p class="card-text">${student.email}</p>`;
        studentHtml +=`<p class="card-text cap">${student.location.city}</p>`;
        studentHtml +=`</div></div>`;    
    });    
    gallery.innerHTML = studentHtml;        
}
// function titleCase is used to format street adres in Title Case
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }    
    return splitStr.join(' '); 
 }
// create function overlay() which display a div class='modal-container' when a card is clicked
function overlay(studentsData) {
    let modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container';
     let overlayHtml = ``;
    const cards = Array.from(document.querySelectorAll('.card'));    
    cards.forEach(function(element) {
        element.addEventListener('click', (ev) => {
            ev.preventDefault();    
            const actualCard = ev.currentTarget;            
            const studentClicked = studentsData[cards.indexOf(element)];            
            overlayHtml += `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container"></div>`;
            overlayHtml += `<img class="modal-img" src="${studentClicked.picture.large}" alt="profile picture">`;
            overlayHtml += `<h3 id="name" class="modal-name cap">${studentClicked.name.first} ${studentClicked.name.last}</h3>`;
            overlayHtml += `<p class="modal-text">${studentClicked.email}</p>
                            <p class="modal-text cap">${studentClicked.location.city}</p>
                            <hr>
                            <p class="modal-text">${studentClicked.phone.replace(/\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g,'($1) $2-$3')}</p>
                            <p class="modal-text">${titleCase(studentClicked.location.street)}, ${titleCase(studentClicked.location.city)}</p>
                            <p class="modal-text">Birthday: ${studentClicked.dob.date.substr(0,10).replace(/(\d{4})-(\d{2})-(\d{2})/,'$3-$2-$1')}</p></div></div>
                            `;
                modalDiv.innerHTML = overlayHtml;
                gallery.insertAdjacentElement('afterend',modalDiv);
                const closeModal = document.getElementById('modal-close-btn');
                closeModal.addEventListener('click', function(){
                    document.body.removeChild(modalDiv);
                    overlayHtml='';
                })
        });
      });

}
