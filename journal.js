// ██ ███    ███ ██████   ██████  ██████  ████████ ███████
// ██ ████  ████ ██   ██ ██    ██ ██   ██    ██    ██
// ██ ██ ████ ██ ██████  ██    ██ ██████     ██    ███████
// ██ ██  ██  ██ ██      ██    ██ ██   ██    ██         ██
// ██ ██      ██ ██       ██████  ██   ██    ██    ███████


import {appSettings} from './database.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

let postArr = []

const currentTimeAndDate = new Date()

let formatStyle = {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric'
}

const userLocation = navigator.language

const formattedTimeAndDate = Intl.DateTimeFormat(userLocation, formatStyle).format(currentTimeAndDate);



const yearFormatter = new Intl.DateTimeFormat('en', { year: 'numeric' });
const year = yearFormatter.format(currentTimeAndDate);


const getGlobalLocallyStoredArr = localStorage.getItem('postArr')

const app = initializeApp(appSettings)
const database = getDatabase(app)
const thingsLearnedInDB = ref(database, "LearnedLessons")



onValue(thingsLearnedInDB, (snapshot)=> {

    let arrayOfThingsLearned = Object.values(snapshot.val())

    let eachJournalEntry = arrayOfThingsLearned.map((entry)=> {


          return JSON.parse(entry)

    })

    postArr = eachJournalEntry
    saveLocalData()

})


// ███████ ████████  █████  ████████ ███████
// ██         ██    ██   ██    ██    ██
// ███████    ██    ███████    ██    █████
//      ██    ██    ██   ██    ██    ██
// ███████    ██    ██   ██    ██    ███████

// ██    ██  █████  ██████  ██  █████  ██████  ██      ███████ ███████
// ██    ██ ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██      ██
// ██    ██ ███████ ██████  ██ ███████ ██████  ██      █████   ███████
//  ██  ██  ██   ██ ██   ██ ██ ██   ██ ██   ██ ██      ██           ██
//   ████   ██   ██ ██   ██ ██ ██   ██ ██████  ███████ ███████ ███████




const globalParsedStorage = JSON.parse(getGlobalLocallyStoredArr)

// ██████   ██████  ███    ███ ███████
// ██   ██ ██    ██ ████  ████ ██
// ██   ██ ██    ██ ██ ████ ██ ███████
// ██   ██ ██    ██ ██  ██  ██      ██
// ██████   ██████  ██      ██ ███████



// const pathListEl = document.querySelector('.pathList')
// const contactListEl = document.querySelector('.contactList')
// const projectListEl = document.querySelector('.projectList')
// const journalListEl = document.querySelector('.journalList')
// const dropDownItemsEl = document.querySelector('.dropdownItems')
// const barEl = document.querySelector('.bar')


const postContainer = document.querySelector('.postContainer')
const postContainerAboutMe = document.querySelector('.postContainerAM')
const renderEl = document.querySelector('.renderedEls')
const formsEl = document.querySelector('.forms')
const fileInputEl = document.querySelector('.fileInput')
const copyrightDateEl = document.querySelector('.copyrightDate')


// NEED to get the compressed dataUrlInput base64 file and put it into the pages that render.. and server


// ███████ ██    ██ ███████ ███    ██ ████████
// ██      ██    ██ ██      ████   ██    ██
// █████   ██    ██ █████   ██ ██  ██    ██
// ██       ██  ██  ██      ██  ██ ██    ██
// ███████   ████   ███████ ██   ████    ██


// ██      ██ ███████ ████████ ███████ ███    ██ ███████ ██████  ███████
// ██      ██ ██         ██    ██      ████   ██ ██      ██   ██ ██
// ██      ██ ███████    ██    █████   ██ ██  ██ █████   ██████  ███████
// ██      ██      ██    ██    ██      ██  ██ ██ ██      ██   ██      ██
// ███████ ██ ███████    ██    ███████ ██   ████ ███████ ██   ██ ███████

copyrightDateEl.textContent = year


 if (formsEl) {
    formsEl.addEventListener('submit', async (e)=> {
        e.preventDefault()

        const submittedPostData = new FormData(formsEl)

        const postTitle = submittedPostData.get('Title')
        const postContent = submittedPostData.get('Content')
        const postedFiles = submittedPostData.get('Files')

            const file = postedFiles
            const base64url = await compressAndConvertToBase64(file);

        let newPost = {
            title: `${postTitle}`,
            content: `${postContent}`,
            date: `${formattedTimeAndDate}`,
            files: `${base64url}`
        }

        postArr.push(newPost)
        push(thingsLearnedInDB, JSON.stringify(newPost))
        formsEl.reset()

        renderPosts(postTitle, postContent, formattedTimeAndDate, base64url)
        saveLocalData()

    })

 }

// ███████ ██    ██ ███    ██  ██████ ████████ ██  ██████  ███    ██ ███████
// ██      ██    ██ ████   ██ ██         ██    ██ ██    ██ ████   ██ ██
// █████   ██    ██ ██ ██  ██ ██         ██    ██ ██    ██ ██ ██  ██ ███████
// ██      ██    ██ ██  ██ ██ ██         ██    ██ ██    ██ ██  ██ ██      ██
// ██       ██████  ██   ████  ██████    ██    ██  ██████  ██   ████ ███████


//  _ _   ___   _ _    __| |  ___   _ _
// | '_| / -_) | ' \  / _` | / -_) | '_|
// |_|   \___| |_||_| \__,_| \___| |_|

// titleP .. P for parameter...



let compressAndConvertToBase64 = (fileP) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function() {
        const img = new Image();

        img.onload = function() {
            const canvas = document.createElement('canvas');
            const maxDimension = 300; // Maximum desired dimension (either width or height)

            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height *= maxDimension / width;
                    width = maxDimension;
            } else {
              width *= maxDimension / height;
            height = maxDimension;
            }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const base64url = canvas.toDataURL(fileP.type, 0.8);
            resolve(base64url);
        };

        img.src = reader.result;
        };

        reader.onerror = function() {
        reject(new Error('Error occurred while reading the file.'));
        };

        reader.readAsDataURL(fileP);
    })
}



export let renderPosts =
(titleP, contentP, dateP, filesP)=>
            {
    const div = document.createElement('div')
    div.classList.add("renderedEls")
    postContainer.appendChild(div)

    const h1 = document.createElement('h1')
    h1.classList.add('title')
    h1.textContent = titleP
    div.appendChild(h1)

    const p1 = document.createElement('p')
    p1.classList.add('content')
    p1.textContent = contentP
    div.appendChild(p1)

    const p4 = document.createElement('p')
    p4.classList.add('year')
    p4.textContent = dateP
    div.appendChild(p4)

    const img = document.createElement('img')
    img.classList.add('file')
    img.src = filesP
    div.appendChild(img)
}

let saveLocalData = (postDataP)=> {


        let postArrString = JSON.stringify(postArr)

        localStorage.setItem("postArr", postArrString)

}



if (globalParsedStorage) {

    postArr = globalParsedStorage

        globalParsedStorage.map(storedItem => {

        const {title, content, date, files} = storedItem

        renderPosts(title, content, date, files)

        });
}

export let clearLocalData = () => {

localStorage.clear()

}


const featuredPostEl = document.querySelector('.featuredPost')
const featuredPostImageEl = document.querySelector('.featuredPostImage')

renderFeaturePost()

function renderFeaturePost() {

    let featuredPostObj = getRandomPost();

            const {content, date, files, title} = featuredPostObj

            const div = document.createElement('div')
            div.classList.add("FeaturedPostContainer")
            featuredPostEl.append(div)

            const h1 = document.createElement('h1')
            h1.classList.add('featuredPostTitle')
            h1.textContent = title
            div.appendChild(h1)

            const p1 = document.createElement('p')
            p1.classList.add('featuredPostContent')
            p1.textContent = content
            div.appendChild(p1)

            const p4 = document.createElement('p')
            p4.classList.add('featuredPostYear')
            p4.textContent = date
            div.appendChild(p4)

            featuredPostImageEl.src = files

}




function getRandomPost() {
        return postArr[getRandomIndex()]
}
function getRandomIndex() {
    return Math.floor(Math.random() * postArr.length)
}

let getFeaturedPost = () => {
    console.log("randomize a featured post in here")
}



export default postArr

// clearLocalData()
