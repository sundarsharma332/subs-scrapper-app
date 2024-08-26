let lastCount = null;

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateCounterUI(newCount) {
    const countElement = document.getElementById('count');
    countElement.innerHTML = ''; // Clear previous digits

    const formattedCount = formatNumberWithCommas(newCount);
    const digits = formattedCount.split('');

    digits.forEach((digit, index) => {
        const span = document.createElement('span');

        if (digit === ',') {
            span.classList.add('comma');
            span.innerText = digit;
        } else {
            span.classList.add('digit');
            span.innerText = digit;

            if (lastCount !== null) {
                const lastDigit = lastCount.toString().split('')[index] || '0';
                if (digit > lastDigit) {
                    span.classList.add('increment');
                } else if (digit < lastDigit) {
                    span.classList.add('decrement');
                }
            }
        }

        countElement.appendChild(span);
    });

    // Remove animation classes after animation ends smoothly
    setTimeout(() => {
        document.querySelectorAll('.digit').forEach(span => {
            span.classList.remove('increment', 'decrement');
        });
    }, 400);
}

async function fetchSubscriberCount() {
    const loadingElement = document.getElementById('loading');
    loadingElement.innerText = 'Loading...'; // Show loading message

    try {
        const response = await fetch('http://localhost:3000/api/subscriber-count');
        const data = await response.json();
        const currentCount = parseInt(data.subscriber_count, 10);

        updateCounterUI(currentCount);
        lastCount = currentCount;

        loadingElement.innerText = ''; // Clear loading message after data is loaded
    } catch (error) {
        console.error('Error fetching subscriber count:', error);
        document.getElementById('count').innerText = 'Error';
        loadingElement.innerText = ''; // Clear loading message even on error
    }
}

// Initial load
fetchSubscriberCount();

// Update every 5 seconds
setInterval(fetchSubscriberCount, 5000);