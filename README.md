##Introduction
The intent of this project is to show how various sorting algorithms work. The algorithms showcased include merge sort, quick sort, heap sort, and bubble sort. This project is a continuation of [Clement Link](https://youtu.be/pFXYym4Wbkc). The look of the project was inspired by [Sorting Visualizer Inspiration](https://youtu.be/OOBBI-kSChM).

Demo: [Sorting Visualizer Demo](https://bjiruff.github.io/SortingVisualizer/)

##Overview
Here is a high level overview of how the animations work.
  1. User chooses which sorting algorithm to use.
  2. Array represented by what is rendered on screen is sent to the chosen sorting algorithm.
  3. For every comparison and swap done while sorting, an instruction for how to animate the operation is sent to an 'animations' array.
  4. 'animations' array instructs how to visualize comparisons and swappages on the array on-screen.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
