import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCategoryNews } from "actions";

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.categoryId = parseInt(props.match.params.categoryId);
    }

    componentWillMount() {
        const { dispatch } = this.props;

        dispatch(getCategoryNews(this.categoryId));
    }

    isNoNews() {
        return !this.props.newsList
            || !Object.keys(this.props.newsList).length
            || !this.props.newsList[this.categoryId]
            || !this.props.newsList[this.categoryId].length
    }

    renderNewsList() {
        const { newsList, currentPage } = this.props;

        return newsList[this.categoryId].map((newsItem) => {
            const { id, title, date, shortDescription } = newsItem;

            const newsDate = new Intl.DateTimeFormat("ru-ru").format(Date.parse(date));

            return (
                <li key={ newsItem.id }>
                    <Link to={`/category/${ id }`} >{ title }</Link>
                    <div className="news-item__date">{ newsDate }</div>
                    <div className="news-item__desc">{ shortDescription }</div>
                </li>
            );
        });
    }

    render() {
        return (
             this.isNoNews() ? <div>Нет новостей</div> : <ul className="news-list">{ this.renderNewsList() }</ul>
        );
    }
}

const mapStateToProps = ({ newsReducer: { news } }) => {
    const { newsList, currentPage } = news;
    return { newsList, currentPage };
};

export default connect(mapStateToProps)(NewsList);