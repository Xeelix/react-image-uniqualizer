# React Image Uniqualizer

## Overview
React Image Uniqualizer is a web application that allows users to upload images and apply various transformations to make each image unique. The application is built using React, TypeScript, and Vite

## Key Features
- **Image Upload**: Upload multiple images at once.
- **Image Processing**: Apply transformations such as rotation, cropping, saturation, brightness, contrast, reflection, and noise.
- **Custom Naming**: Generate unique filenames based on different naming conventions.
- **Download**: Download processed images as a ZIP archive.

## Key Libraries
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A build tool that provides a fast development environment.
- **Zustand**: A small, fast, and scalable state-management solution.
- **JSZip**: A library for creating, reading, and editing .zip files.
- **React Hook Form**: A library for managing form state and validation.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation
1. Clone the repository:
2. Navigate to the project directory:
   ```sh
   cd react-image-uniqualizer
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
- **src/**: Contains the source code.
  - **components/**: Reusable UI components.
  - **pages/**: Page components.
  - **store/**: State management using Zustand.
  - **utils/**: Utility functions for image processing.
  - **types/**: TypeScript type definitions.

## Usage
1. Upload images using the upload button.
2. Configure the desired transformations in the settings panel.
3. Click the "Uniqualize and Download" button to process and download the images.
