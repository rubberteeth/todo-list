import './styles.css';
import Icon from './menu.svg';
import * as index from './index.js';
import icon from './sleepy.png';


const createClassedElement = (element, className) => {
    let component = document.createElement(element);
    if (className) component.classList.add(className);
    return component;
}

const mainDiv = createClassedElement('div', 'main');

document.body.appendChild(mainDiv);

const header = () => {
    const element = createClassedElement('header');
        const menuButton = new Image();
            menuButton.src = Icon;
            menuButton.id = 'menu-button';
        const h1 = createClassedElement('h1')
        // h1.textContent = 'Todo list'
            // add text content for selected project/inbox

    element.append(menuButton, h1)
    return element;
}



const page = () => {
    const element = createClassedElement('div', 'page');



    const sideBar = () => {
        const element = createClassedElement('div', 'sidebar');
            const home = () => {
                const element = createClassedElement('div', 'home');
                    const h2 = createClassedElement('h2');
                        h2.textContent = "HOME";
                    const inbox = createClassedElement('p');
                        inbox.textContent = "INBOX";
                    const today = createClassedElement('p');
                        today.textContent = "TODAY";
                    const thisWeek = createClassedElement('p');
                        thisWeek.textContent = "THIS WEEK";
                    const important = createClassedElement('p');
                        important.textContent = "IMPORTANT";

                    element.append(h2, inbox, today, thisWeek, important)

                return element;
            }

            const projects = () => {
                const element = createClassedElement('div', 'projects');
                    const h2 = createClassedElement('h2');
                        h2.textContent = "PROJECTS";
                    const form = createClassedElement('form', 'project-form');
                        form.classList.add('hidden')
                        const nameLabel = createClassedElement('label');
                            nameLabel.HTMLfor = 'new-project-name';
                            nameLabel.innerHTML = 'Project Name:'
                        const nameInput = createClassedElement('input');
                            nameInput.id = 'new-project-name';
                            nameInput.type = 'text';
                            nameInput.max = 20;
                            nameInput.required = true;
                        const buttonsDiv = createClassedElement('div', 'form-buttons');
                            const addButton = createClassedElement('button', 'add-button');
                                addButton.textContent = 'Add Project';
                                addButton.type = 'button'
                            const cancelButton = createClassedElement('button', 'new-project-cancel');
                                cancelButton.textContent = 'Cancel';
                                cancelButton.type = 'button'
                            buttonsDiv.append(addButton, cancelButton)
                        form.append(nameLabel, nameInput, buttonsDiv)
                    const p = createClassedElement('p', 'new-project');
                        p.textContent = 'ADD NEW PROJECT '
                // "PROJECTS" title

                    // add new project + 
                    element.append(h2, p, form)
                return element;
            }

            

            element.append(home(), projects());
        return element;
    }

    const content = () => {
        const element = createClassedElement('div', 'content');
            const currentInbox = createClassedElement('div', 'inbox-title');
                const currentH2 = createClassedElement('h2', 'inbox-h2');
                currentH2.textContent = `Current Inbox`
                currentInbox.appendChild(currentH2);
            
            
            
            
            
            
            
            const footer = () => {
                const element = createClassedElement('footer', 'footer');
                    const para = createClassedElement('a');
                        para.innerHTML = 'github.com/rubberteeth'
                        para.href = 'https://github.com/rubberteeth'
                        para.target = '_blank'
                    element.appendChild(para)
                return element
            }




            
            element.append(currentInbox, footer());
        return element;
    }

    element.append(sideBar(), content())
    
    return element;
}

try {
    document.querySelector('.main').append(header(), page());
} catch (e){
    console.log(e)
}



/////
/////-------------//////
/////


const displayController = (() => {

    const fullInbox = () => {
        // get array of todos
        let x = JSON.parse(localStorage.myTodoList);

    }
    
    const selectInbox = () => {
        document.querySelector('.inbox-h2').textContent = 'hello'
    }

    const updateInbox = (param) => {


        return inbox;
    }

    const displaySleepyCat = () => {
        const div = createClassedElement('div', 'sleepy-container');
            const p = createClassedElement('p', 'sleepy-text');
                p.textContent = 'You have no current tasks';
            const img = new Image();
                img.src = icon;
                img.classList.add('sleepy');
            div.append(img, p);
        let content = document.querySelector('.content');
        if (true) {
            content.insertBefore(div, content.lastChild);
        } 
    }

    return {
        fullInbox,
        selectInbox,
        displaySleepyCat
    }
})()

displayController.displaySleepyCat();


const menuHider = (x) => {
    let menu = document.querySelector('div.sidebar');
    if (x.matches) {
        menu.classList.add('closed');
    } else {
        menu.classList.remove('closed');
    }
};

const fullscreenMenu = (x) => {
    let menu = document.querySelector('div.sidebar');
    if(x.matches) {
        menu.classList.add('full-screen');
    } else {
        menu.classList.remove('full-screen');
    };
};

/////
///// SIDEBAR MEDIA QUERY LISTENERS;
/////
let hideMenu = window.matchMedia("(max-width: 400px)");
menuHider(hideMenu);
hideMenu.addEventListener('change', menuHider);

let sizeMenu = window.matchMedia("(max-width: 675px)");
sizeMenu.addEventListener('change', fullscreenMenu);
/////
/////-----------------------------
/////


const toggleSidebar = () => {
    document.querySelector('.sidebar').classList.toggle('closed');
}

const toggleNewProjectForm = () => {
    document.querySelector('.project-form').classList.toggle('hidden');
};

const clearNewProjectForm = () => {
    document.querySelector('#new-project-name').value = '';
};

const addProjectToMenu = () => {
    let exists;
    let projectName = document.querySelector('#new-project-name').value;
    if (projectName.length < 3) {
        console.log(`project name is ${projectName.length} chars long`)
        alert('Project name must be between 3 and 18 characters');
        return;
    }
    if (projectName.length > 18) {
        alert('Project name must be between 3 and 18 characters');
        return;
    }
    let projects = document.querySelector('.projects');
      // check if project already exists
    projects.childNodes.forEach(node => {
        if (node.textContent == projectName) {
            alert('Project already exists');
            exists = true;
        };
    })
    if (!exists) {
        let p = createClassedElement('p', 'project');
        p.textContent = projectName;
        document.querySelector('.projects').appendChild(p);
        index.storage.storeProject(projectName);
        toggleNewProjectForm();
        clearNewProjectForm();
    };
};

/////
/////
/////----------- EVENT LISTENERS
/////
/////

    // hide 
document.querySelector('#menu-button').addEventListener('click', () => {
    toggleSidebar();
});

document.querySelector('.new-project').addEventListener('click', () => {
    toggleNewProjectForm();
});

document.querySelector('.new-project-cancel').addEventListener('click', () => {
    toggleNewProjectForm();
    clearNewProjectForm();
});

document.querySelector('.add-button').addEventListener('click', addProjectToMenu)

document.querySelector('.project-form').addEventListener('submit', (event) => {
  event.preventDefault()
})

    // display projects on page load
document.addEventListener('DOMContentLoaded', () => {
    if (index.storage.getProjects() !== null) {
        JSON.parse(index.storage.getProjects()).forEach(element => {
            let p = createClassedElement('p', 'project');
            p.textContent = element;
            document.querySelector('.projects').appendChild(p)
        });
    }
})

