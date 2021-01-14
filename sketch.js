//Create variables here
var dog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed, currentTime;
var foodObj;

function preload()
{
  //load images here
  dog1 = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  /*fedTime= databse.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();  
  })*/

  dog = createSprite(650,250,10,20);
  dog.addImage(dog1);
  dog.scale=0.3;

  feed = createButton("Feed the Dog")
  feed.position(800,65);
  feed.mousePressed(feedDog);

  addFeed = createButton("Add Food")
  addFeed.position(900,65);
  addFeed.mousePressed(addFood);
 
}


function draw() {  
   //currentTime=hour();

   foodObj.display();

   if(foodS === 0){
     dog.addImage(dog1);
   } else {
     dog.addImage(dogHappy);
   }
  drawSprites();
  //add styles here
   textSize(20);
   fill ("pink");
   stroke =("black");
   text("Food:" + foodS, 650, 60);
  
}

function feedDog(){
  dog.addImage(dogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock()
  })
}

function addFood(){
   foodS++; 
   database.ref('/').update({
     Food:foodS
   })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
