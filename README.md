# MarkET
This is an marketplace application I built that lets users post ads to sell their used goods as well as browse other users posts. 

# Live demo [here](https://fierce-peak-34730.herokuapp.com/)
![Main page](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/Screenshot+2021-10-25+224350.png)

# Instructions to run the application
#### 1. Install dependencies
```
npm install
npm run install-client
```
#### 2. Insert .env file
Please refer to .env.example and provide the respective AWS and MongoDB config

#### 3. Run development mode
```
npm run dev
```

# Features of the application
## 1. Home Page
- lazy loading
![lazy loading gif](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording.gif)
- search bar
![search bar gif](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording+(1).gif)
- clickable items
![clickable items](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording+(2).gif)

## 2. Results page
- filter results with price and condition
![filter results](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording+(4).gif)

## 3. Details page
It gives the user more information about the item for sale. This includes a set of pictures, the full item description, contact details of the seller, ….
It also allows the user to go back to his previous search.
![details page](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording+(5).gif)

## 4. Post add page
This page allows users to post new ads to the application. The user should be able to upload a list of pictures, item name, item description, contact info, …
The posted items should be able to be viewed in the home page and results page.
![post add](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording+(6).gif)

## 5. Mobile responsive
![mobile responsive](https://nvidia-assignment-images.s3.us-east-2.amazonaws.com/recording+(7).gif)

# Tech stack used
I used the MERN stack to build this application.
- MongoDB
- Express
- React
- Node

# Implementation checklist of the project requirement
- [x] Use both Class and Functional components
- [x] Use Hooks with functional components
- [x] Use webpack with a dev and prod configurations.
- [x] Write a small express server that can feed sample data to the front end.
- [x] Set up Babel.
- [x] Use Context to manage global state.
- [x] Use any presets or packages that can make your task easier.
- [x] Use/customize material-ui components.
