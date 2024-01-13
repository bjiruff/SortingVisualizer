// getMergeSortAnimations and associated functions written by Clement Mihailescu
export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

export function getQuickSortAnimations(array) {
  let animations = [];
  if (array.length <= 1) return array;
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}
  function quickSort(array, lowIndex, highIndex, animations) {

      if (lowIndex >= highIndex) {
        return;
      }

      let pivot = array[highIndex];

      let leftPointer = partition(array, lowIndex, highIndex, pivot, animations);

      quickSort(array, lowIndex, leftPointer - 1, animations);
      quickSort(array, leftPointer + 1, highIndex, animations);

      return array, animations;
    }

    function partition(array, lowIndex, highIndex, pivot, animations) {
      let leftPointer = lowIndex;
      let rightPointer = highIndex - 1;

      while (leftPointer < rightPointer) {

        // Walk from the left until we find a number greater than the pivot, or hit the right pointer.
        animations.push([leftPointer, highIndex]);
        animations.push([leftPointer, highIndex]);
        while (array[leftPointer] <= pivot && leftPointer < rightPointer) {
          leftPointer++;
          animations.push([leftPointer, highIndex]);
          animations.push([leftPointer, highIndex]);
          //for animations, push highlights of the pivot bar and the bar that leftpointer points to
        }

        // Walk from the right until we find a number less than the pivot, or hit the left pointer.
        animations.push([rightPointer, highIndex]);
        animations.push([rightPointer, highIndex]);
        while (array[rightPointer] >= pivot && leftPointer < rightPointer) {
          rightPointer--;
          animations.push([rightPointer, highIndex]);
          animations.push([rightPointer, highIndex]);
          //for animatinos, push highlights of the pivot bar and the bar that right pointer points to
        }

        animations.push([leftPointer, rightPointer, array[leftPointer], array[rightPointer]]);
        swap(array, leftPointer, rightPointer);
        //highlight the bars about to be swapped, unhighlight them and swap their heights simultaneously
      }
      
      // Do not perform swap if pivot happens to be highest number
      if(array[leftPointer] > array[highIndex]) {
        animations.push([leftPointer, highIndex, array[leftPointer], array[highIndex]]);
        swap(array, leftPointer, highIndex);
      }
      else {
        leftPointer = highIndex;
      }
      
      return leftPointer;
    }


export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSort(array, animations);
  return animations;
}
  export function heapSort(array, animations) {

      class Heap {
          constructor(array) {
              this.array = array;
              this.size = array.length;
              this.buildHeap(animations);
          }

          buildHeap(animations) {
              // Start heapifying at last non-leaf node
              for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) {
                  this.heapify(i, animations);
              }
          }

          heapify(rootIndex, animations) {
              let maxIndex = rootIndex;
              let child = rootIndex * 2 + 1;

              if (child < this.size && this.array[child] > this.array[maxIndex]) {
                  animations.push([child, maxIndex]);
                  animations.push([child, maxIndex]);
                  maxIndex = child;
                  // comapre root to left child
              }

              if (child + 1 < this.size && this.array[child + 1] > this.array[maxIndex]) {
                  animations.push([child + 1, maxIndex]);
                  animations.push([child + 1, maxIndex]);
                  maxIndex = child + 1;
                  // compare root to right child
              }

              if (rootIndex !== maxIndex) {
                  animations.push([rootIndex, maxIndex, this.array[rootIndex], this.array[maxIndex]]);
                  swap(this.array, rootIndex, maxIndex);
                  // swap root and child
                  this.heapify(maxIndex, animations);
              }
          }

          extractRoot(animations) {
              let max = this.array[0];
              this.size--;
              animations.push([0, this.size, this.array[0], this.array[this.size]]);
              this.array[0] = this.array[this.size];
              this.heapify(0, animations);
              return max;
          }

          getSize() {
              return this.size;
          }
      }

      let h = new Heap(array, animations);
      let sortedArray = [];
      while (h.getSize() > 0) {
          sortedArray.push(h.extractRoot(animations));
      }

      return sortedArray.reverse();
  }

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}
  export function bubbleSort(array, animations) {
      const length = array.length;
      for (let i = 0; i < length - 1; i++) {
          for (let j = 0; j < length - i - 1; j++) {
              animations.push([j, j + 1]);
              animations.push([j, j + 1]);
              if (array[j] > array[j + 1]) {
                  animations.push([j, j + 1, array[j], array[j + 1]]);
                  swap(array, j, j + 1);
              }
          }
      }
      return array;
  }


function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}