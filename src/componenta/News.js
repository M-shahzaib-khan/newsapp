import React, { Component } from 'react'
import Newsitems from './Newsitems'
export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,

        }
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2feb0cbf60c44210a7b155c746b5f328&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState(
                {
                    articles: parsedData.articles,
                    page: this.state.page + 1
                }
            )
        }

    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2feb0cbf60c44210a7b155c746b5f328&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(
            { articles: parsedData.articles },
            this.setState({ page: this.state.page - 1 })
        )

    }

    async componentDidMount() {
        let url =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=2feb0cbf60c44210a7b155c746b5f328&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
        console.log(data);

    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center"></h1>
                <h2>NewsMonkey - Top Headlines</h2>
                <spinner/>
                

                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col md-4" key={element.url}>
                                <Newsitems newsUrl={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} />
                            </div>
                        );
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} class="btn btn-primary mx-2">&larr;Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick} align='right' type="button" class="btn btn-primary">Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
