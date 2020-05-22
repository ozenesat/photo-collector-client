# Photo Collector
Photo Collector is a website application where you can view many beautiful photos and
create your own photo collection with them. You can rate and comment on the photos in your collection while you
can always edit or delete the items anytime you want. Come discover this website if you want to see
some spectacular photos and meet the talented people who took them!

* * *

## Setup Steps
<ul>
 <li> Fork and <a target="_blank" rel="noopener noreferrer" href="https://github.com/ozenesat/photo-collector-client.git">clone this repository</a>.</li>
 <li> Run npm install to install all dependencies to install all dependencies.</li>
 <li> Use npm run start to spin up the server.</li>
</ul>

* * *

## Related Links
<ul>
  <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/ozenesat/photocollector-api">API Repo</a></li>
  <li><a target="_blank" rel="noopener noreferrer" href="https://mysterious-escarpment-32571.herokuapp.com">Deployed API</a></li>
  <li><a target="_blank" rel="noopener noreferrer" href="https://ozenesat.github.io/photo-collector-client/">Deployed Client</a></li>
</ul>

* * *

## Developing Process

I started to work on this project with field research. In my capstone project I wanted to develop a website that has a real user experience where the user can spend couple of hours easily. So I needed some third party API's to achive this goal. And I searched for free APIs. After 2 days of field research I decided to go with Unsplash. As a former journo, I always find photos intriguing and I can spend a few hours easily when I am discovering new photos. Then I started to read <a target="_blank" rel="noopener noreferrer" href="https://unsplash.com/documentation"> the documention of Unsplash.</a>

After this long searches and reading I jumped into developing proccess. For smooth and uninterrupted user experince I decided to use React for Front-end and since I am not fully sure about the data part of my project I preferred Node.Js with Express for back-end by the side of MangoDB.

Firstly, I created my developer account on Unsplash and got sh key. Since it's my first time using third party api with sh key, getting data successfully and implementing it into my application took a little time to figure out. Then I developed all back-end routes, models and schema. I tested Unsplash related ones with Postman and the others with curl scripts.

As the second step I started to work on the front end. I implemented basic buttons and forms for user actions with Bootstrap. Then I added 'photo search and collect' related functionalities using React components. To have all components working fully functional took couple of days.

Lastly, I tested all functionalities and fixed the errors and bugs. Then I designed all components and the main page with navbar. As a final touch, I developed welcome and home pages for unregistered users.

* * *

## User Stories
<ul>
  <li> As an unregistered user, I can see random photos.</li>
  <li> As a user, I want to sign in and sign up.</li>
  <li> As a user, I want to change the password and sign out.</li>
  <li> As a user, I want to search for photos with a keyword.</li>
  <li> As a user, I want to collect the photos that I liked with a comment and rating.</li>
  <li> As a user, I want to see my all collected photos with my review.</li>
  <li> As a user, I want to update my review for a photo that I collected.</li>
  <li> As a user, I want to delete any photo that I collected before from my photo collection list.</li>
  <li> As a user, I want to search for collections and see the photos of the collections.</li>
  <li> As a user, I want to find related collections of the collections which I searched with a keyword.</li>
  <li> As a user, I want to spend time so I want to too many photos at the same page.</li>
</ul>

* * *

## Technologies Used
<ul>
  <li>React.js</li>
  <li>Javascript</li>
  <li>Bootstrap</li>
  <li>HTML/CSS</li>
  <li>Unsplash API</li>
</ul>

* * *

## Unsolved Problems ~ Designed Updates
<ul>
  <li> Better search experience, more random, mixed results.</li>
  <li> Design for home pages should be imporoved.</li>
  <li> More functionalty should be added.</li>
  <li> Photo upload functionalty.</li>
  <li> Collection share functionalty.</li>
  <li> Social media interactions functionalty.</li>
</ul>

* * *

## Wireframe
![autodraw 5_11_2020 (2)](https://media.git.generalassemb.ly/user/26372/files/d407a300-9392-11ea-8279-12ac037ce2fd)

* * *

## Screen Shots from Photo Collector
![Screenshot from 2020-05-21 14-24-49](https://media.git.generalassemb.ly/user/26372/files/de822380-9b6e-11ea-995c-ebc6e6c54271)
![Screenshot from 2020-05-21 14-28-11](https://media.git.generalassemb.ly/user/26372/files/5b150200-9b6f-11ea-9bcb-4291b4aa36a4)
