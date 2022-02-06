const list = document.getElementById('list-scores');

const createScores = async () => {
    const results = await fetch('http://localhost:3000/');
    const scores = await results.json();
    list.innerHTML = "";
    scores.forEach(score => {
        const li = document.createElement('li');
        li.innerText = `${score.name}: ${score.time} secondes`
        list.appendChild(li);
    });
    document.querySelector('.leaderboard-modal').style.display = "flex";
};

const closeModal = function() {
    document.querySelector('.leaderboard-modal').style.display = "none";
}