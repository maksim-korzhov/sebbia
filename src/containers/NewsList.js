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
    }

    renderNewsList() {
        const { newsList, currentPage } = this.props;

        return Object.keys(newsList).map(index => {
            const { id, title, date, shortDescription, categoryId } = newsList[index];

            if( categoryId === this.categoryId ) {
                const newsDate = new Intl.DateTimeFormat("ru-ru").format(Date.parse(date));

                return (
                    <li key={id}>
                        <Link to={`/news/${ id }`}>{title}</Link>
                        <div className="news-item__date">{newsDate}</div>
                        <div className="news-item__desc">{shortDescription}</div>
                    </li>
                );
            }
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