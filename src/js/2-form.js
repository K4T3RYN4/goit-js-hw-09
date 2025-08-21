const formEl = document.querySelector('.feedback-form');

const formData = {
    email: "",
    message: "",
};

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function getFromLS(key, defValue) {
    const jsonData = localStorage.getItem(key);

    try {
        const data = JSON.parse(jsonData);
        return data;
    } catch (error) {
        return defValue || jsonData;
    }
}

formEl.addEventListener('input', e => {
    const { name, value } = e.target;
    formData[name] = value;

    saveToLS('feedback-form', formData);
})

document.addEventListener('DOMContentLoaded', (e) => {
    const savedData = getFromLS('feedback-form', formData);

    if (savedData) {
        formData.email = savedData.email || "";
        formData.message = savedData.message || "";

        formEl.elements.email.value = formData.email;
        formEl.elements.message.value = formData.message;
    }
});

formEl.addEventListener('submit', e => {
    e.preventDefault();

    if (formEl.elements.email.value.trim() === '' || formEl.elements.message.value.trim() === '') {
        alert('Fill please all fields');
    } else {
        console.log(formData);
        formEl.reset();
        localStorage.clear();
    }
});