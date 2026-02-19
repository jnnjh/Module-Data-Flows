const comicContainer = document.getElementById('comicContainer');

async function fetchLatestComic() {
  try {
    const response = await fetch('https://xkcd.now.sh/?comic=latest');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received XKCD data:', data);

    comicContainer.innerHTML = '';

    const img = document.createElement('img');
    img.src = data.img;
    img.alt = data.title;

    comicContainer.appendChild(img);

  } catch (error) {
    console.error('Error fetching comic:', error);
    comicContainer.innerHTML =
      '<p style="color: red;">Failed to load comic. Please try again later.</p>';
  }
}

fetchLatestComic();