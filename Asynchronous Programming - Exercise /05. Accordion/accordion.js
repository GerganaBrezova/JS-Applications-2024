async function solution() {
    const firstUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const firstResponse = await fetch(firstUrl);
    const firstData = await firstResponse.json();

    const main = document.getElementById('main');

    firstData.forEach(el => {
        let divAccordion = createElement('div', '', ['class', 'accordion']);
        main.appendChild(divAccordion);

        let divHead = createElement('div', '', ['class', 'head']);
        divAccordion.appendChild(divHead);

        let span = createElement('span', el.title);
        let button = createElement('button', 'More', ['class', 'button', 'id', el._id]);
        divHead.appendChild(span);
        divHead.appendChild(button);

        let divExtra = createElement('div', '', ['class', 'extra']);
        divAccordion.appendChild(divExtra);

        let p = createElement('p');
        divExtra.appendChild(p);

        button.addEventListener('click', toggle);

    });

    async function toggle(event) {
        const button = event.target;

        const secondUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`;
        const secondResponse = await fetch(secondUrl);
        const secondData = await secondResponse.json();

        const divExtra = button.parentNode.parentNode.children[1];
        const p = divExtra.children[0];
        p.textContent = secondData.content;

        if (button.textContent == 'More') {
            button.textContent = 'Less';
            divExtra.style.display = 'block';

        } else if (button.textContent == 'Less') {
            button.textContent = 'More';
            divExtra.style.display = 'none';
        }
    }

    function createElement(type, content, attributes = []) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                const name = attributes[i];
                const value = attributes[i + 1];
                element.setAttribute(name, value);
            }
        }
        return element;
    }
}

solution();