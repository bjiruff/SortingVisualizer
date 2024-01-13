import React from 'react';
import {
    getMergeSortAnimations,
    getQuickSortAnimations,
    getHeapSortAnimations,
    getBubbleSortAnimations
} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 8;

// Starting number of array bars
const DEFAULT_NUMBER_OF_ARRAY_BARS = 40;

// This is the main color of the array bars.
const RESTING_COLOR = '#0587A1';

// This is the color of array bars that are being compared throughout the animations.
const COMPARISON_COLOR = '#CF8ABF';


export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            array: [],
            numberOfArrayBars: DEFAULT_NUMBER_OF_ARRAY_BARS,
        };
        this.timeouts = [];
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        this.clearAllAnimations();
        const array = [];
        for (let i = 0; i < this.state.numberOfArrayBars; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({ array });
    }

    clearAllAnimations() {
        this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
        this.timeouts = [];
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = RESTING_COLOR;
        }
      }

    handleArrayBarCountChange = (event) => {
        this.clearAllAnimations();
        const newArrayBarCount = parseInt(event.target.value);
        const newArray = Array.from({ length: newArrayBarCount }, () =>
          randomIntFromInterval(5, 500)
        );
        this.setState({ numberOfArrayBars: newArrayBarCount, array: newArray });
      };

    // mergeSort written by Clement Mihailescu
    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? COMPARISON_COLOR : RESTING_COLOR;
            this.timeouts.push(
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS)
            );
          } else {
            this.timeouts.push(
                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS)
            );
          }
        }
      }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        console.log(animations);
        this.performAnimations(arrayBars, animations);
    }

    heapSort() {
        const animations = getHeapSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        console.log(animations);
        this.performAnimations(arrayBars, animations);
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        console.log(animations);
        this.performAnimations(arrayBars, animations);
    }

    testSortingAlgorithms() {
        // for (let i = 0; i < 100; i++) {
        //     const array = [];
        //     const animations = [];
        //     const length = randomIntFromInterval(1, 10);
        //     for (let i = 0; i < length; i++) {
        //         array.push(randomIntFromInterval(0, 1000));
        //     }
        // const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
        // let array2 = array.slice();
        // const mergeSortedArray = bubbleSort(array2, animations);
        // if (arraysAreEqual(javaScriptSortedArray, mergeSortedArray)){
        //     console.log(true);
        // }
    }

    performAnimations(arrayBars, animations) {
        let barsAreBeingCompared = false;
        for (let i = 0; i < animations.length; i++) {
            // Indices with length === 2 instruct color changes,
            // indices with length === 4 instruct bar height swaps
            if (animations[i].length === 2) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                // If current anim index is equal to next anim index, we know 
                // that bars are at rest but about to be compared
                if (!barsAreBeingCompared) {
                    // animations[i][0] === animations[i+1][0] && animations[i][1] === animations[i+1][1]
                    barsAreBeingCompared = true;
                    this.timeouts.push(
                        setTimeout(() => {
                            barOneStyle.backgroundColor = COMPARISON_COLOR;
                            barTwoStyle.backgroundColor = COMPARISON_COLOR;
                        }, i * ANIMATION_SPEED_MS)
                    );
                // Bars have just been compared, set color back to
                // resting color
                } else {
                    barsAreBeingCompared = false;
                    this.timeouts.push(
                        setTimeout(() => {
                            barOneStyle.backgroundColor = RESTING_COLOR;
                            barTwoStyle.backgroundColor = RESTING_COLOR;
                        }, i * ANIMATION_SPEED_MS)
                    );
                }
            } else {
                // Swap bar heights
                this.timeouts.push(
                    setTimeout(() => {
                        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const temp = barOneHeight;
                        barOneStyle.height = `${barTwoHeight}px`;
                        barTwoStyle.height = `${temp}px`;
                    }, i * ANIMATION_SPEED_MS)
                );
            }
        }
    }

    render() {
        const {array, numberOfArrayBars} = this.state;
        const totalWidth = 1200; // Total width for all bars combined
        const individualWidth = totalWidth / numberOfArrayBars;
    
        return (
            <div>
                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Reset Array</button>
                    <div className="slider-container">
                        <div className="bar-count-slider">
                            <input
                                type="range"
                                min="5"
                                max="75"
                                value={numberOfArrayBars}
                                onChange={this.handleArrayBarCountChange}
                                className="slider"
                            />
                        </div>
                        <div className="slider-label">
                            <label>Number of Bars: {numberOfArrayBars}</label>
                        </div>
                    </div>
                    {/*<button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button>*/}
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                        className="array-bar"
                        key={idx}
                        style={{ height: `${value}px`, width: `${individualWidth}px` }}
                        ></div>
                    ))}
                </div>
            </div>
        );
    }
}



function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}


