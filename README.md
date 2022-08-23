<p align="center"><img src="https://github.com/oslabs-beta/radiQL/blob/dev/public/images/rad2.png"></img></p>

---

Welcome to **radiQL**, the one-stop solution for setting up GraphQL on a PostgreSQL database. 


### At a glance:
Give us your PostgreSQL URI, and we'll generate an appropriate schema and resolver. But that's not all: we'll also visualize your ER diagram **AND** we can generate boilerplate server code with your schema and resolver (GraphQL-Express and ApolloServer) so you can get started ASAP. 

### Getting Started:
1. Head on over to 
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
