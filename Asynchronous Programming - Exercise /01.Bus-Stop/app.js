async function getInfo() {

    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    const stopId = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        buses.replaceChildren();

        const response = await fetch(url);

        if (response.status !== 200) {
            throw new Error('ID not found!');
        }

        const data = await response.json();
        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;

            buses.appendChild(li);
        });

    } catch (error) {
        stopName.textContent = 'Error';
    }
}