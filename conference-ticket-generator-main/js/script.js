const dropArea = document.querySelector('.upload-label')
const inputs = document.querySelectorAll('.focus')
const nameInpt = document.querySelector('#name')
const fullNameError = document.querySelector('.full-name-error')
const emailInpt = document.querySelector('#email')
const emailError = document.querySelector('.email-error')
const gitHubInpt = document.querySelector('#GitHub')
const githubError = document.querySelector('.github-error')
const uploadWrapper = document.querySelector('.upload-wrapper')
const inputFile = document.getElementById('upload')
const loadAvatar = document.querySelector('.load-avatar')
const avatarImg = document.querySelector('.load-avatar img')
const dragAndDropDesc = document.querySelector('.drag-and-drop-desc')
const uploadPhotoBtns = document.querySelector('.upload-photo-btns')
const removeBtn = document.querySelector('.remove-btn')
const changeBtn = document.querySelector('.input-change-btn')
const uploadDescription = document.querySelector('.upload-des')
const errorUpload = document.querySelector('.error-upload')
const form = document.querySelector('form')
const generatedTicket = document.querySelector('.Generated-ticket')
const headerDesc = document.querySelector('.header-desc')
const headerText = document.querySelector('.header-text')
const personImg = document.querySelector('.person-img')
const personName = document.querySelector('.person-name')
const githubUserName = document.querySelector('.gitHub-userName a')
const gradientText = document.querySelector('.gradient-text')
const email = document.querySelector('.email')

const dataTransfer = new DataTransfer()

// change inputs
let indexInput = 0
inputs.forEach(inp => {
    inp.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            e.preventDefault()
            indexInput === inputs.length - 1 ? indexInput = 0 : indexInput++
            inputs[indexInput].focus()
        }
    })
})

// upload image
const handleClickUpload = e => {
    handleImageUploaded(e.target.files[0], 'select')
}

dropArea.addEventListener('dragover', e => e.preventDefault())

dropArea.addEventListener('drop', e => {
    e.preventDefault()
    e.dataTransfer.files.length > 0 && handleImageUploaded(e.dataTransfer.files[0], 'drop')
})

const handleImageUploaded = (imageInformation, type) => {

    const file = imageInformation
    const maxSize = file.size <= 500 * 1024

    if (maxSize && (file.type.includes('jpeg') || file.type.includes('png'))) {

        uploadDescription.style.display = 'inline'
        uploadDescription.style.color = 'hsl(0, 0%, 100%)'
        errorUpload.style.display = 'none'

        if (type === 'drop') {
            dataTransfer.items.clear()
            dataTransfer.items.add(imageInformation)
        } else {
            dataTransfer.items.clear()
        }
        handleUpload(file)

    } else {
        uploadDescription.style.display = 'none'
        errorUpload.style.display = 'flex'
    }
}


const handleUpload = file => {

    if (file) {

        avatarImg.src = URL.createObjectURL(file)
        uploadWrapper.classList.add('hidden')
        dragAndDropDesc.classList.add('hidden')
        loadAvatar.style.display = 'block'
        uploadPhotoBtns.style.display = 'block'
    }
}


// delete avatar
const handleDelete = e => {

    e.preventDefault()

    if (avatarImg.src) {
        URL.revokeObjectURL(avatarImg.src)
    }

    avatarImg.src = ''
    uploadWrapper.classList.remove('hidden')
    dragAndDropDesc.style.display = 'block'
    loadAvatar.style.display = 'none'
    uploadPhotoBtns.style.display = 'none'
}

form.addEventListener('submit', e => {

    e.preventDefault()

    const emailValue = emailInpt.value.trim()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!inputFile.files.length && !dataTransfer.files.length) {
        uploadDescription.style.color = 'hsl(7, 71%, 60%)'

    } else if (!nameInpt.value) {
        handleShowError(nameInpt, fullNameError)

    } else if (!emailPattern.test(emailValue)) {
        handleShowError(emailInpt, emailError)

    } else if (!gitHubInpt.value) {
        handleShowError(gitHubInpt, githubError)

    } else {
        handleGenerateTicket()
    }
})

const handleShowError = (nameInput, errorName) => {

    nameInput.style.borderColor = 'hsl(7, 71%, 60%)'
    errorName.style.display = 'flex'
}

// on change inputs
nameInpt.addEventListener('change', e => {
    if (e.target.value) {
        handleShowOnChangeInputs(nameInpt, fullNameError)
    }
})

emailInpt.addEventListener('change', e => {
    if (e.target.value) {
        handleShowOnChangeInputs(emailInpt, emailError)
    }
})

gitHubInpt.addEventListener('change', e => {
    if (e.target.value) {
        handleShowOnChangeInputs(gitHubInpt, githubError)
    }
})

const handleShowOnChangeInputs = (nameInput, errorName) => {
    nameInput.style.borderColor = 'hsl(0, 0%, 100%)'
    errorName.style.display = 'none'
}


// generate ticket
const handleGenerateTicket = () => {

    form.classList.add('hidden')
    headerDesc.classList.add('hidden')
    headerText.classList.add('hidden')
    generatedTicket.style.display = 'block'
    handleAddDataToTicket()
}

const handleAddDataToTicket = () => {

    personImg.src = avatarImg.src
    personName.textContent = nameInpt.value
    githubUserName.textContent = gitHubInpt.value
    githubUserName.href = `https://github.com/${gitHubInpt.value}`
    gradientText.textContent = nameInpt.value
    email.textContent = emailInpt.value
}

inputFile.addEventListener('change', handleClickUpload)
changeBtn.addEventListener('change', handleClickUpload)

removeBtn.addEventListener('click', handleDelete)
removeBtn.addEventListener('touchend', handleDelete)



