const kanbanCards = document.getElementsByClassName('kanban-card');
const kanbanSections = document.getElementsByClassName('kanban-section');
let draggedCard;

function dragStartHandler(e) {
    draggedCard = e.target;
    e.dataTransfer.effectAllowed = "move";
}

function dragOverHandler(e) {
    e.preventDefault();
}



function dropHandler(e) {
    e.preventDefault();
    const dropZone = e.currentTarget;
    
    if(draggedCard) {
        dropZone.appendChild(draggedCard);
        draggedCard = null;
    }
}

for(const card of kanbanCards) {
    card.addEventListener('dragstart', dragStartHandler);
}

for(const section of kanbanSections) {
    section.addEventListener('dragover', dragOverHandler);
    section.addEventListener('drop', dropHandler);
}