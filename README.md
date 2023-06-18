
# News Aggregator

A news
aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format


## Installation

1. Clone the project/repo (download the zip from green button above) or install GIT in your system then:

```bash
  git clone https://github.com/OkkashaAlly/news-aggregator-frontend.git
```

2. Navigate to the project directory

```bash
  cd news-aggregator-frontend
``` 
3. Copy the Enviroment variables from env.example and create a new .env file paste
```
 cp .env.example .env or copy .env.example .env
```
4. Build docker image (make sure you have docker installed in your system)
```bash
  docker build -t news-aggregator-frontend .
```

5. Run docker container
```bash
  docker run -dp 3000:3000 news-aggregator-frontend
```

6. Open url ``` http://localhost:3000/ ``` on your browser
