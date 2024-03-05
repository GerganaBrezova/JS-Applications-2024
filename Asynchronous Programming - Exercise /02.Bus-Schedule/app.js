function solve() {

    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    const stop = {
        current: '',
        next: 'depot'
    };

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;
        const res = await fetch(url);
        const data = await res.json();

        stop.current = data.name;
        stop.next = data.next;

        label.textContent = `Next stop ${stop.current}`;

        arriveBtn.disabled = false;
        departBtn.disabled = true;
    }

    function arrive() {
        label.textContent = `Arriving at ${stop.current}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();