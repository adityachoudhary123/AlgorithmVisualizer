// const arrayContainer = document.getElementById('array-container');

// function generateRandomArray(size) {
//     const array = [];
//     for (let i = 0; i < size; i++) {
//         array.push(Math.floor(Math.random() * 100) + 1);
//     }
//     return array;
// }

// function renderArray(array, swappingIndices = []) {
//     arrayContainer.innerHTML = '';
//     array.forEach((value, index) => {
//         const bar = document.createElement('div');
//         const isSwapping = swappingIndices.includes(index);
//         bar.className = `array-bar ${isSwapping ? 'swapping' : ''}`;
//         bar.style.height = `${value * 4}px`;
//         bar.textContent = value;
//         arrayContainer.appendChild(bar);

//         if (isSwapping) {
//             // Add a delay to keep the swapping color for a short duration
//             setTimeout(() => {
//                 bar.classList.remove('swapping');
//             }, 500);
//         }
//     });
// }

// function swap(array, i, j) {
//     const temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
// }

// async function bubbleSort(array) {
//     const n = array.length;
//     let sorted = false;

//     while (!sorted) {
//         sorted = true;
//         for (let i = 0; i < n - 1; i++) {
//             if (array[i] > array[i + 1]) {
//                 swap(array, i, i + 1);
//                 renderArray(array, [i, i + 1]);
//                 await sleep(1000);
//                 sorted = false;
//             }
//         }
//     }
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function startSorting() {
//     const arraySize = 20; // Change this value to adjust the size of the array
//     const array = generateRandomArray(arraySize);
//     renderArray(array);
//     await bubbleSort(array);
// }


const arrayContainer = document.getElementById('array-container');

function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}

function renderArray(array, comparingIndices = [], swappingIndices = []) {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        const isComparing = comparingIndices.includes(index);
        const isSwapping = swappingIndices.includes(index);

        if (isSwapping) {
            bar.className = 'array-bar swapping';
        } else if (isComparing) {
            bar.className = 'array-bar comparing';
        } else {
            bar.className = 'array-bar';
        }

        bar.style.height = `${value * 4}px`;
        bar.textContent = value;
        bar.style.fontWeight='bold';
        arrayContainer.appendChild(bar);
    });
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

async function bubbleSort(array) {
    const n = array.length;
    let sorted = false;

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < n - 1; i++) {
            renderArray(array, [i, i + 1]);

            // Add delay for better visualization
            await sleep(100);

            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                sorted = false;
                renderArray(array, [i, i + 1], [i, i + 1]);

                // Add a separate delay after swapping to keep the swapping color
                await sleep(100);
            }
        }
    }
}


async function selectionSort(array) {
    const n = array.length;
    for(let i = 0; i < n; i++) {
        let minIndex = i;
        for(let j = i+1; j < n; j++) {
            renderArray(array, [i, j]);
            await sleep(500);
            if(array[minIndex] > array[j]) {
                minIndex = j;
                
            }
            
        }
        swap(array,i,minIndex);
        renderArray(array, [i, minIndex], [i, minIndex]);
        await sleep(500);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSorting() {
    const arraySize = 20; // Change this value to adjust the size of the array
    const array = generateRandomArray(arraySize);
    renderArray(array);
    await bubbleSort(array);
    //await selectionSort(array);
}
