import React, { Component } from 'react'
import Newsitems from './Newsitems'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page:1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=2feb0cbf60c44210a7b155c746b5f328&page=1";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles})
        console.log(data);
        
    }

    render() {
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col md-4" key={element.url}>
                                <Newsitems newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} />
                            </div>
                        );
                    })}

                </div>
                <div className="container">
                    <button type="button" class="btn btn-primary">Primary</button>
                    <button type="button" class="btn btn-primary">Primary</button>

                </div>
            </div>
        )
    }
}

export default News
