import React, { Component } from "react";
import { connect } from "react-redux";

import { getNewsInfo } from "actions";

class NewsDetail extends Component {
    constructor(props) {
        super(props);

        this.newsId = parseInt(props.match.params.newsId);
    }


    componentWillMount() {
        const { dispatch } = this.props;

        dispatch(getNewsInfo(this.newsId));
    }

    isNoDetailInfo() {
        return !this.props.newsList
            || !this.props.newsList[this.newsId];
    }

    renderNewsDetail() {
        const detailInfo = this.props.newsList[this.newsId];
        const { title, shortDescription }  = detailInfo;
        const fullDescription = {
            __html: detailInfo.fullDescription ? detailInfo.fullDescription : ""
        };

        return (
            <div className="news-detail">
                <h1 className="news-detail__title">{ title }</h1>
                <div className="news-detail__description">{ shortDescription }</div>
                <div className="news-detail__full-description" dangerouslySetInnerHTML={ fullDescription } />
            </div>
        );
    }

    render() {
        return (
            this.isNoDetailInfo() ? <div>Нет информации</div> : this.renderNewsDetail()
        );
    }
}

const mapStateToProps = ({ newsReducer: { news } }) => {
    const { newsList } = news;
    return { newsList };
};

export default connect(mapStateToProps)(NewsDetail);