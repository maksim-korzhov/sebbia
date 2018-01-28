import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCategoryNews, changePage } from "actions";

import Pagination from "components/Pagination";

class NewsList extends Component {
    constructor(props) {
        super(props);

        this.categoryId = parseInt(props.match.params.categoryId);
        this.pageNumber = props.match.params.pageNumber ? parseInt(props.match.params.pageNumber) : 0;
    }

    componentWillMount() {
        const { dispatch } = this.props;

        dispatch(getCategoryNews(this.categoryId, this.pageNumber));
    }

    /*componentWillUpdate() {
        this.pageNumber = props.match.params.pageNumber ? parseInt(props.match.params.pageNumber) : 0;
    }*/

    isNoNews() {
        return !this.props.newsList
            || !Object.keys(this.props.newsList).length
    }

    renderNewsList() {
        const { newsList } = this.props;

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

    onPageClickHandler(pageNumber) {
        this.props.dispatch(changePage(pageNumber, this.categoryId));
    }

    render() {
        this.pageNumber = this.props.match.params.pageNumber ? parseInt(this.props.match.params.pageNumber) : 0;

        return (
            <div>
                <Link to="/" className="btn btn-primary button-back">← К списку разделов</Link>

                {
                    this.isNoNews() ?
                        <div>
                            <ul>
                                <li>Нет новостей</li>
                            </ul>
                            <Pagination
                                currentPage={this.pageNumber}
                                isNextPage={false}
                                baseLink={`/category/${ this.categoryId }`}
                                onPageClick={this.onPageClickHandler.bind(this)}
                            />
                        </div> :
                        <div>
                            <ul className="news-list">{this.renderNewsList()}</ul>
                            <Pagination
                                currentPage={this.pageNumber}
                                isNextPage={true}
                                baseLink={`/category/${ this.categoryId }`}
                                onPageClick={this.onPageClickHandler.bind(this)}
                            />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ newsReducer: { news } }) => {
    const { newsList, currentPage } = news;
    return { newsList, currentPage };
};

export default connect(mapStateToProps)(NewsList);