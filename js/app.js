function changeAlgorithm() {
    return;
}

function setupEvents() {
    document.querySelector('.algorithm-selector').addEventListener('change', changeAlgorithm);
}

document.addEventListener('DOMContentLoaded', setupEvents);