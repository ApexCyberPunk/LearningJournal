// ██ ███    ███ ██████   ██████  ██████  ████████ ███████
// ██ ████  ████ ██   ██ ██    ██ ██   ██    ██    ██
// ██ ██ ████ ██ ██████  ██    ██ ██████     ██    ███████
// ██ ██  ██  ██ ██      ██    ██ ██   ██    ██         ██
// ██ ██      ██ ██       ██████  ██   ██    ██    ███████

import postObj from './classes.js'



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



let postArr = []

const isPastListCleared = false




const getGlobalLocallyStoredArr = localStorage.getItem('postArr')
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

 if (formsEl) {
    formsEl.addEventListener('submit', (e)=> {
        e.preventDefault()

        const submittedPostData = new FormData(formsEl)

        const postTitle = submittedPostData.get('Title')
        const postContent = submittedPostData.get('Content')
        const postDate = submittedPostData.get('DateOfPost')
        const postedWebsite = submittedPostData.get('Website')
        const postedFiles = submittedPostData.get('Files')
        const postedEmail = submittedPostData.get('Email')



        let newPost = {
            title: `${postTitle}`,
            content: `${postContent}`,
            date: `${postDate}`,
            website: `${postedWebsite}`,
            files: `${postedFiles}`,
            email: `${postedEmail}`
        }

        postArr.push(newPost)

        // formsEl.reset()

        renderPosts(postTitle, postContent, postDate, postedWebsite, postedFiles, postedEmail)
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


export let renderPosts =
(titleP, contentP, dateP, websiteP, filesP, emailP)=>
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

    const p3 = document.createElement('p')
    p3.classList.add('userEmail')
    p3.textContent = emailP
    div.appendChild(p3)

    const p4 = document.createElement('p')
    p4.classList.add('year')
    p4.textContent = dateP
    div.appendChild(p4)

    const p5 = document.createElement('p')
    p5.classList.add('website')
    p5.textContent = websiteP
    div.appendChild(p5)

    const p6 = document.createElement('p')
    p6.classList.add('file')
    p6.textContent = filesP
    div.appendChild(p6)
}

let saveLocalData = ()=> {


        console.log("SLDfunction", postArr)
        let postArrString = JSON.stringify(postArr)
        let setlocallyStoredArr = localStorage.setItem("postArr", postArrString)
        let getlocallyStoredArr = localStorage.getItem('postArr')

        console.log("localStorage", localStorage)
        console.log("get local", getlocallyStoredArr)
        let parsedStorage = JSON.parse(getlocallyStoredArr)

        console.log("parsedStorage", parsedStorage)
}


if (globalParsedStorage) {
    postArr = globalParsedStorage
        globalParsedStorage.map(storedItem => {
     const {title, content, date, website, files, email} = storedItem

        renderPosts(title, content, date, website, files, email)
            console.log(globalParsedStorage)
        });
}

export let clearLocalData = () => {

localStorage.clear()

}


export default postArr

// clearLocalData()
