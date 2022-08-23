<p align="center" id="top"><img src="https://github.com/oslabs-beta/radiQL/blob/dev/public/images/rad2.png"></img></p>

<div align="center">
    
![StarShield](https://img.shields.io/github/stars/oslabs-beta/radiql?color=210d41&label=Stars&style=flat-square)
![ForksShield](https://img.shields.io/github/forks/oslabs-beta/radiql?color=6b81cb&label=Forks&style=flat-square)
    
</div>

---

Welcome to [**radiQL**](https://radiql.herokuapp.com/), the one-stop solution for setting up GraphQL on a PostgreSQL database. 


### At a glance:
Give us your PostgreSQL URI, and we'll generate an appropriate schema and resolver. But that's not all: we'll also visualize your ER diagram **AND** we can generate boilerplate server code with your schema and resolver (GraphQL-Express and ApolloServer) so you can get started ASAP. 

### Getting Started:
1. Head on over to [radiQL](https://radiql.herokuapp.com/)
2. Grab your PostgreSQL database URI (we don't hold onto this unless you want us to… keep reading below to find out more about that) and drop it into the input box and click convert.
3. Go through the tabs, copying what you need with the useful little copy button.
4. If you'd like, you can select one of the boilerplates from the boilerplate dropdown and head on over to the boilerplate tab. It may take a little while for the boilerplate to generate, so hold tight. Once it does, you can copy that with our little copy button too. Currently, we support GraphQL-Express and ApolloServer. More to come!
5. And, if you'd like to check out your ER diagram visualization, head over to the diagram tab.

You might've noticed at some point that there's a grayed-out button beneath the convert button that says "log in to save database." Maybe we should do that. 
1. Click the login button in the top right corner and register if you haven't already. Then we log in.
2. Like before, we grab our PostgreSQL database URI and drop it into the input box. Here, you can click "save database" and name this saved database for quick access during future visits. 
3. Now every time you visit, you can log in, select this database from the drop-down, and convert. Any updates in that database will be reflected. All other functionality of radiQL remains the same. 
4. For those who may be a tad worried about security with saving your database, worry not. It's tucked away safely in a DynamoDB NoSQL database, not some random JSON document on someone's laptop.

### Stack:
TypeScript, React (Hooks, Router, Flow, CodeBlock), SCSS, TailwindCSS, Framer-motion, Express.js, Node.js, Bcrypt, Axios, DynamoDB, Dynamoose, Jest, SuperTest, Cypress, Travis CI, Webpack, Heroku

### Contributing:
We recognize that radiQL is a work in progress, and so we welcome your contributions to this open-source project! Any and all contributions are greatly appreciated!
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`) and create your amazing new feature
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 
6. We'll review your pull request ASAP!

### Creators:
Alex Cusick | [Github](https://github.com/Alex-cusick) | [LinkedIn](https://www.linkedin.com/in/alex-q6/) \
Thomas Ho | [Github](https://github.com/t1ho) | [LinkedIn](https://www.linkedin.com/in/t1ho/) \
Roy Jiang | [Github](https://github.com/rjiang12) | [LinkedIn](https://www.linkedin.com/in/royjiang2025/) \
Zach Robertson | [Github](https://github.com/Zachrobdev) | [LinkedIn](https://www.linkedin.com/in/zach-robertson-profile/) \
Jordan Williams | [Github](https://github.com/JordanOBL)
